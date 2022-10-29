import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isValidURL, removeQueryParam } from "../../store/utils";
import axios from "axios";
import { useDesoStore } from "../../store/deso";
import { toast } from "react-toastify";
import { toastOptions } from "../../store/constants";
import * as ga from '../../lib/ga'

export default function Input() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [postUrl, setPostUrl] = useState('')
  const [postID, setPostID] = useState('')
  const [post, setPost] = useState('')
  const [prefix, setPrefix] = useState('posts')

  const { setPostInfo, setLoading } = useDesoStore((state) => state);

  const defaultPost = 'https://diamondapp.com/posts/99cd89fc11d8432416d83ea73b72944a540dd27a996c8ac9c4a9c6379b136891';

  useEffect(() => {
    if (router.query.url !== undefined && router.query.url !== '') {
      const url = removeQueryParam(router.query.url)
      setPostUrl(url)
      setQuery(url)
    } else {
      const url = removeQueryParam(defaultPost)
      setPostUrl(url)
      setQuery()
    }
    ga.event({
      action: 'User landed on home page',
    })
  }, []);

  useEffect(() => {
    if (postUrl !== '') {
      setPrefix(postUrl.split('/')[3])
      setPostID(postUrl.split('/')[4])
      fetchPost(removeQueryParam(postUrl.split('/')[4]));
      ga.event({
        action: 'Fetching post',
      })
    }
  }, [postUrl]);
  

  const fetchPost = async (id) => {
    const toastId = toast.loading("Loading...", toastOptions)
    const request = {
        "PostHashHex": `${id}`,
    }
    await axios.post(`https://node.deso.org/api/v0/get-single-post`, request).then((res) => {
      const data = res.data;
      const post = data.PostFound
      setPostInfo(() => ({
        profile_image_url: post?.ProfileEntryResponse?.ExtraData?.LargeProfilePicURL || `https://node.deso.org/api/v0/get-single-profile-picture/${post?.ProfileEntryResponse?.PublicKeyBase58Check}`,
        name: post?.ProfileEntryResponse.Username,
        username: post?.ProfileEntryResponse.Username,
        text: post?.Body,
        retweet_count: (post?.RepostCount + post?.QuoteRepostCount),
        reply_count: post?.CommentCount,
        like_count: post?.LikeCount,
        post: post,
        profile: post?.ProfileEntryResponse,
      }));
      
      ga.event({
        action: 'Post fetched',
        params : {
          post_id: post.PostHashHex,
        }
      })
      setPost(data.PostFound)
      setLoading(false)
      toast.update(toastId, { render: "All is good.", type: "success", isLoading: false, autoClose: 2000, hideProgressBar: true  });
    }).catch((error) => {
      console.log(error);
      setTimeout(() => loadDefault(), 2000);
      ga.event({
        action: 'Post Fetched Failed',
        params : {
          post_id: id,
        }
      })
      
      toast.update(toastId, { render: "Oops! Enter valid url.", type: "error", isLoading: false, autoClose: 3000, hideProgressBar: true  });
    });
  }

  async function loadDefault() {
    const url = defaultPost
    setPostUrl(url)
    setQuery()
  }


  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true)
    if (e.target.value.length > 0) {
      if (isValidURL(e.target.value)) {
        setPostUrl(e.target.value)
        setQuery(e.target.value);
      } else {
        toast.error("Please enter valid url...", toastOptions)
      }
      
    } else {
      setPostUrl('')
      setQuery('')
      setPostID('')
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    setLoading(true)
    const value = e.clipboardData.getData('text/plain')
    if (value.length > 0) {
      if (isValidURL(value)) {
        
        ga.event({
          action: 'URL pasted',
          params : {
            post_url: value,
          }
        })
        setPostUrl(value)
        setQuery(value);
      } else {
        
        ga.event({
          action: 'Invalid URL pasted',
          params : {
            post_url: value,
          }
        })
        toast.error("Please enter valid url...", toastOptions)
      }
    } else {
      setPostUrl('')
      setQuery('')
      setPostID('')
    }
  }

  return (
    <div className="flex items-center justify-center space-x-4 mx-auto md:max-w-[800px] w-full px-4 py-2 bg-[#0C2F62] border border-[#010812] backdrop-blur-lg rounded-xl mb-3 dark:bg-gray-900 dark:border-gray-800">
      <div className="w-full relative">
        <div className="absolute left-[12px] top-[6px] text-xl">
          <img src={`/logo-deso-d.svg`} alt="DeSo" className="text-gray-500 w-6 h-6" />
        </div>
        <input
          className="duration-200 shadow dark:bg-gray-900 dark:text-white dark:border-gray-600 border border-gray-200 px-3 py-[6px] rounded-lg my-1 outline-none w-full dark:placeholder-gray-500 dark:hover:border-[#010812] leading-6 dark:focus:border-[#010812] hover:border-blue-400 focus:border-blue-400 font-code text-[16px] md:text-[0.9rem] pl-10"
          type="text"
          placeholder="Paste DeSo URL here"
          readOnly={query !== '' ? true : false}
          defaultValue={query ? query : ''}
          //onChange={(e) => handleSearch(e)}
          onPaste={(e) => handlePaste(e)}
        />
      </div>
    </div>
  );
}
