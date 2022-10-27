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
    <div className="relative ml-auto flex w-1/2">
      <input
        className="w-full rounded-full bg-slate-200 px-6 py-2.5 pr-16 text-sm ring-blue-400 focus:outline-none focus:ring-2 dark:bg-[#3c3c3c] dark:text-white dark:placeholder-white"
        type="text"
        placeholder="Paste tweet link here"
        value={query ? query : ''}
        onChange={(e) => handleSearch(e)}
      />
      <button
        type="submit"
        className="group absolute inset-y-0 right-0 flex w-14 items-center justify-center rounded-r-full bg-slate-300 dark:bg-[#5c5c5c] dark:hover:bg-[#6c6c6c]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 stroke-slate-700 group-hover:stroke-slate-900 dark:stroke-gray-300 dark:group-hover:stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
}
