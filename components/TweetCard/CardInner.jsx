import { useCardStore } from "../../store/card";
import { useTemplateStore } from "../../store/template";
import { useTweetStore } from "../../store/tweet";
import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import { useEffect, useState } from "react";
import { removeQueryParam } from "../../store/utils";
import axios from "axios";
import { CommentIcon, DiamondIcon, LikeIcon, LinkIcon, RePostIcon } from '../../store/icons';
import { calculateDurationUntilNow, dateFormat, nFormatter } from "../../store/utils";

export default function CardInner() {
  const { loading, tweetInfo, isMetricsVisible } = useTweetStore((state) => state);
  const { profile_image_url, name, username, text, post, profile } = tweetInfo;
  const selectedTemplate = useTemplateStore((state) => state.selectedTemplate);
  const opacity = useCardStore((state) => state.opacity);
  const font = useCardStore((state) => state.font);
  const [nodes, setNodes] = useState({ '1': { 'Name': 'DeSo', 'URL': 'https://node.deso.org', 'Owner': 'diamondhands' } });
  const [exchange, setExchange] = useState();
  // Firefox fix
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    getExchangeRate()
    getAppState()
    if (navigator.userAgent.indexOf("Firefox") > -1) {
      fetch("/api/get-image", {
        method: "post",
        body: JSON.stringify({ imageUrl: profile_image_url }),
      })
        .then((res) => res.json())
        .then((data) => {
          setImageData(data.imageData);
        });
    }
  }, [tweetInfo]);

  const getExchangeRate = async () => {
    const { data } =  await axios.get(`https://node.deso.org/api/v0/get-exchange-rate`)
    setExchange(data)
  }

  const getAppState = async () => {
    const request = {
        "PublicKeyBase58Check": '',
    }
    const { data } =  await axios.post(`https://node.deso.org/api/v0/get-app-state`,request)
    if (data) {
        setNodes(data.Nodes)
    } else {
        setNodes({'1' : {'Name': 'DeSo', 'URL': 'https://node.deso.org', 'Owner': 'diamondhands'}})
    }
  }

  const node = nodes[post?.PostExtraData?.Node] || nodes[1]

  const nodeURL = (node.URL !== '') ? node.URL : `https://node.deso.org`;

  const LinkifyRenderLink = ({ attributes, content }) => {
    const { href, ...props } = attributes;
    return <a href={href} target='_blank' className='text-[#007bff] hover:text-[#0056b3] hover:underline' rel="noopener noreferrer nofollow" {...props}>{content}</a>;
  };
  

  const LinkifyOptions = {
    formatHref: {
        hashtag: (href) => `${nodeURL}/hashtag/` + href.substr(1).toLowerCase(),
        mention: (href) => `${nodeURL}/` + href.substr(1).toLowerCase(),
    },
    render: {
        mention: LinkifyRenderLink,
        hashtag: LinkifyRenderLink,
        url: ({ attributes, content }) => {
            return <a {...attributes} className='text-[#007bff] hover:text-[#0056b3] hover:underline' rel="noopener noreferrer nofollow" target="_blank">{content}</a>
        },
    },
    nl2br: true
  };
  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className='w-12 h-12 border-2 border-[#007bff] rounded-full animate-spin'></div>
      </div>
    ); 
  }
  return (
    <div className="rounded-xl p-10 md:px-10 md:py-8 backdrop-blur-xl bg-gradient-to-br dark:from-dark/60 dark:via-dark/80 dark:to-dark/80 w-full"
      style={{
        backgroundColor: `rgba(255,255,255, ${opacity / 100})`,
      }}
    >
      <div className={`flex gap-x-2 items-center`}>
        <img
          className="h-14 w-14 rounded-full"
          src={imageData || profile_image_url}
          alt={`${name}'s pic`}
        />
        <div>
          <div>
            <h2 className="font-bold text-xl leading-none text-zinc-900">{name}</h2>
            <p className="text-zinc-500">@{username}</p>
          </div>
        </div>
      </div>
      <div className='mt-2 text-zinc-900 block'>
        <Linkify options={LinkifyOptions}>
          {text}
        </Linkify>
      </div>
      {isMetricsVisible &&
        <div className='flex flex-row justify-between items-center mt-6'>
          <div rel="noopener noreferrer nofollow" href={`${nodeURL}/posts/${post.PostHashHex}`} target='_blank' className='flex flex-row items-center group'>
            <span className='text-[#0059f7] flex flex-col items-center justify-center z-10 meta_icon w-[30px] h-[30px] rounded-full'>
                <span className='w-[20px] h-[20px] z-20 inline-block fill-transparent rounded-full stroke-current stroke-2' style={{strokeLinecap: 'round', strokeLinejoin: 'round'}}>
                    <CommentIcon/>
                </span>
            </span>
            <span className='text-gray-600 font-semibold group-hover:text-[#0059f7] text-[17px] ml-[4px]'>{nFormatter(post.CommentCount)}</span>
          </div>
          <div className='flex flex-row items-center group'>
            <span className='text-green-600 flex flex-col items-center justify-center z-10 meta_icon w-[30px] h-[30px] rounded-full'>
                <span className='w-[20px] h-[20px] z-20 inline-block fill-transparent rounded-full stroke-current stroke-2' style={{strokeLinecap: 'round', strokeLinejoin: 'round'}}>
                  <RePostIcon />
                </span>
            </span>
            <span className='text-gray-600 font-semibold group-hover:text-green-600 text-[17px] ml-[4px]'>{nFormatter((post.RepostCount + post.QuoteRepostCount))}</span>
          </div>
          <div className='flex flex-row items-center group'>
            <span className='text-[#fe3537] flex flex-col items-center justify-center z-10 meta_icon w-[30px] h-[30px] rounded-full'>
                <span className='w-[20px] h-[20px] z-20 inline-block fill-transparent rounded-full stroke-current stroke-2' style={{strokeLinecap: 'round', strokeLinejoin: 'round'}}>
                  <LikeIcon />
                </span>
            </span>
            <span className='text-gray-600 font-semibold group-hover:text-[#fe3537] text-[17px] ml-[4px]'>{nFormatter(post.LikeCount)}</span>
          </div>
          <div className='flex flex-row items-center group'>
            <span className='text-[#0056b3] flex flex-col items-center justify-center z-10 meta_icon w-[30px] h-[30px] rounded-full'>
                <span className='w-[20px] h-[20px] z-20 inline-block fill-transparent rounded-full stroke-current stroke-2' style={{strokeLinecap: 'round', strokeLinejoin: 'round'}}>
                  <DiamondIcon />
                </span>
            </span>
            <span className='text-gray-600 font-semibold group-hover:text-[#0056b3] text-[17px] ml-[4px]'>{nFormatter(post.DiamondCount)}</span>
          </div>
          <div className='flex flex-row items-center'>
            <span className='text-gray-500 flex flex-col items-center justify-center z-10 meta_icon w-[30px] h-[30px] rounded-full'>
                <span className='w-[20px] h-[20px] z-20 inline-block fill-transparent rounded-full stroke-current stroke-2' style={{strokeLinecap: 'round', strokeLinejoin: 'round'}}>
                  <LinkIcon />
                </span>
            </span>
            <span className='text-gray-600 font-semibold group-hover:text-[#0059f7] text-[17px] ml-[4px]'>{calculateDurationUntilNow(post.TimestampNanos)}</span>
          </div>
      </div>
      }
    </div>
  );
}
