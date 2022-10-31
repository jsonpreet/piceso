import { useCardStore } from "../../store/card";
import { useDesoStore } from "../../store/deso";
import axios from "axios";
import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import { useEffect, useState } from "react";
import { calculateDurationUntilNow, dateFormat, nFormatter } from "../../store/utils";
import { BiComment, BiRefresh, BiHeart } from "react-icons/bi";
import { SlDiamond } from "react-icons/sl";
import { BsLink } from "react-icons/bs";
import { Loader } from "../Loader";

export default function CardInner() {
  const postInfo = useDesoStore((state) => state.postInfo);
  const size = useDesoStore((state) => state.size);
  const isMetricsVisible = useDesoStore((state) => state.isMetricsVisible);
  const isMediaVisible = useDesoStore((state) => state.isMediaVisible);
  const loading = useDesoStore((state) => state.loading);
  const { profile_image_url, name, username, text, post, profile } = postInfo;
  const opacity = useCardStore((state) => state.opacity);
  const scale = useCardStore((state) => state.scale);
  const radius = useCardStore((state) => state.radius);
  const font = useCardStore((state) => state.font);
  const exportImage = useCardStore((state) => state.exportImage);
  const [nodes, setNodes] = useState({ '1': { 'Name': 'DeSo', 'URL': 'https://node.deso.org', 'Owner': 'diamondhands' } });
  const [exchange, setExchange] = useState();
  const [profileImage, setProfileImage] = useState("");
  const [postImage, setPostImage] = useState("");

  useEffect(() => {
    getExchangeRate()
    getAppState()
    // if (navigator.userAgent.indexOf("Firefox") > -1) {
    //   fetch("/api/get-image", {
    //     method: "post",
    //     body: JSON.stringify({ imageUrl: profile_image_url }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setImageData(data.imageData);
    //     });
    // }
    fetch("/api/get-image", {
      method: "post",
      body: JSON.stringify({ imageUrl: profile_image_url }),
    })
    .then((res) => res.json())
    .then((data) => {
      setProfileImage(data.imageData);
    });

    if (isMediaVisible && post.ImageURLs && post.ImageURLs.length > 0) {
      fetch("/api/get-image", {
        method: "post",
        body: JSON.stringify({ imageUrl: post.ImageURLs[0]}),
      })
      .then((res) => res.json())
      .then((data) => {
        setPostImage(data.imageData);
      });
    }
  }, [postInfo]);

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
        <Loader/>
      </div>
    ); 
  }
  return (
    <div className="w-full flex items-center text-left overflow-hidden"
      style={{
        backgroundColor: `rgba(255,255,255, ${opacity / 100})`,
        borderRadius: radius,
        boxShadow: 'rgba(0, 0, 0, 0.3) 5px 20px 30px',
        transform: `scale(${scale / 100})`,
      }}
    >
      <div className="p-10 md:px-10 md:pt-8 md:pb-3  w-full">
        <div className='flex items-center'>
          <div className="object-cover w-10 h-10 md:w-[56px] md:h-[56px] rounded-full">
            <img
              className="border-0 rounded-full"
              src={profileImage || profile_image_url}
              alt={`${name}'s pic`}
            />
          </div>
          <div className="flex flex-col pl-3">
            <div className="font-semibold leading-none whitespace-nowrap text-gray-800">{name}</div>
            <div className="mt-1 leading-none text-gray-500 whitespace-nowrap">@{username}</div>
          </div>
          <div className="flex flex-col ml-auto">
            <img src={`/logo-deso-d.svg`} alt="DeSo" className="w-6 h-6" />
          </div>
        </div>
        <div className='mt-2 text-zinc-900 block'>
          <Linkify options={LinkifyOptions}>
            {isMediaVisible && post.ImageURLs && post.ImageURLs.length > 0 ? `${text.substring(0, 120)}...` : `${text.substring(0, 700)}`}
          </Linkify>
        </div>
        
        {isMediaVisible && post.ImageURLs && post.ImageURLs.length > 0 &&
          <div className='grid gap-[2px] my-3 rounded-xl overflow-hidden shadow'>
            <div className='w-auto overflow-hidden shadow flex items-center justify-center max-h-[300px]'>
              <img className='h-full object-cover w-full' alt={post.PostHashHex} src={postImage || post.ImageURLs[0]}  />
            </div>
          </div>
        }
        <div>
          <div className='flex flex-row justify-between items-center mt-4'>
            <div className="flex flex-row items-center">
              {post.IsNFT && <span className='text-white bg-blue-600 rounded py-1 px-2 mr-2 hover:underline text-[13px]'>NFT</span>}
              <span className="text-gray-400 text-[13px]">{dateFormat(post.TimestampNanos)}</span>
            </div>
            
            {exportImage && <span className="text-gray-400 text-[13px] ml-2">Made with shot.withdeso.com</span>}
          </div>
        </div>
        {isMetricsVisible &&
          <div className='flex flex-row border-t border-gray-100 mt-2 justify-between items-center'>
            <div className='flex items-center mr-5 h-[40px]'>
              <BiComment size={22} className='text-[#0059f7] h-[24px] mr-1' />
              <span className='mr-1 relative font-normal text-[18px]'>{nFormatter(post.CommentCount)}</span>
            </div>
            
            <div className='flex items-center mr-5 h-[40px]'>
              <BiRefresh size={30} className='text-green-600 h-[32px] mr-1'/>
              <span className='mr-1 relative font-normal text-[18px]'>{nFormatter((post.RepostCount + post.QuoteRepostCount))}</span>
            </div>
            
            <div className='flex items-center mr-5 h-[40px]'>
              <BiHeart size={24} className='text-[#fe3537] h-[26px] mr-1'/>
              <span className='mr-1 relative font-normal text-[18px]'>{nFormatter(post.LikeCount)}</span>
            </div>
            
            <div className='flex items-center mr-5 h-[40px]'>
              <SlDiamond size={18} className='text-[#0056b3] h-[18px] mr-1'/>
              <span className='mr-1 relative font-normal text-[18px]'>{nFormatter(post.DiamondCount)}</span>
            </div>
            
            <div className='flex items-center mr-5'>
              <BsLink size={28} className=' text-[#0056b3] h-[28px] mr-1'/>
              <span className='mr-1 relative font-normal text-[18px]'>{calculateDurationUntilNow(post.TimestampNanos)}</span>
            </div>
        </div>
        }
      </div>
    </div>
  );
}
