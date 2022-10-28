import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTweetStore } from "../../store/tweet";
import { removeQueryParam } from "../../store/utils";
import axios from "axios";

export default function Input() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [postUrl, setPostUrl] = useState('')
  const [postID, setPostID] = useState('')
  const [post, setPost] = useState('')
  const [prefix, setPrefix] = useState('posts')

  const {setTweetInfo, setLoading } = useTweetStore((state) => state);

  useEffect(() => {
    if (router.query.url !== undefined && router.query.url !== '') {
      const url = removeQueryParam(router.query.url)
      setPostUrl(url)
      setQuery(url)
    } else {
      const url = removeQueryParam('https://diamondapp.com/posts/99cd89fc11d8432416d83ea73b72944a540dd27a996c8ac9c4a9c6379b136891?feedTab=Hot')
      setPostUrl(url)
      setQuery()
    }
  }, []);

  useEffect(() => {
    if (postUrl !== '') {
      //router.replace(`?url=${postUrl}`, undefined, { shallow: true })
      setPrefix(postUrl.split('/')[3])
      setPostID(postUrl.split('/')[4])
      fetchPost(removeQueryParam(postUrl.split('/')[4]));
    }
  }, [postUrl]);

  const fetchPost = async (id) => {
    const request = {
        "PostHashHex": `${id}`,
    }
    const { data } =  await axios.post(`https://node.deso.org/api/v0/get-single-post`,request)
    if (data && data.PostFound) {
      const post = data.PostFound
      setTweetInfo(() => ({
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
        setPost(data.PostFound)
        setLoading(false)
    }
  }


  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true)
    if (e.target.value.length > 0) {
      setPostUrl(e.target.value)
      setQuery(e.target.value);
    } else {
      setPostUrl('')
      setQuery('')
      setPostID('')
    }
  }

  return (
    <div className="flex items-center justify-center space-x-4 mx-auto md:max-w-[800px] w-full px-4 py-2 bg-gray-50 border border-gray-200 backdrop-blur-lg rounded-xl mb-3 dark:bg-gray-900 dark:border-gray-800">
      <div className="w-full relative">
        <input
        className="duration-200 shadow dark:bg-gray-900 dark:text-white dark:border-gray-600 border border-gray-200 px-3 py-[6px] rounded-lg my-1 outline-none w-full dark:placeholder-gray-500 dark:hover:border-pink-700 dark:focus:border-pink-700 hover:border-pink-400 focus:border-pink-400 font-code text-[16px] md:text-[0.9rem] dark:!bg-gray-800/50"
        type="text"
        placeholder="Paste DeSo URL here"
        value={query ? query : ''}
        onChange={(e) => handleSearch(e)}
        />
      </div>
      {/* <div class="ml-2">
        <button type="submit" class="px-4 py-2 md:py-[8px] text-white rounded-lg bg-gradient-to-br from-red-400 to-pink-600 hover:scale-[0.98] active:scale-[0.95] border border-transparent dark:border-transparent shadow-lg flex items-center justify-center duration-100 cursor-pointer text-sm min-h-[36px] w-[140px] font-semibold" variant="primary">Get Tweet →</button>
      </div> */}
    </div>
  );
}
