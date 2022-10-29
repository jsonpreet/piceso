import BGColors from "./BGColors";
import CanvasSize from "./CanvasSize";
import ExportButton from "../ExportButton";
import PostOptions from "./PostOptions";
import MediaOptions from "./MediaOptions";
import CanvasOptions from "./CanvasOptions";


export default function SidePanel({ rootRef }) {
  return (
    <div className='flex items-center w-full pb-5 lg:pb-5'>
      <div className='relative flex flex-row flex-wrap items-start justify-start w-full border bg-[#010812] backdrop-blur-xl border-[#08203f] shadow-lg rounded-xl lg:items-start lg:flex-col'>
        <div className='w-full'>
          <div className="text-center text-white bg-[#0C2F62] font-semibold px-4 py-1 w-full text-sm rounded-tr-xl rounded-tl-xl">Canvas options</div>
          <div className='divide-y divide-[#061830] w-full'>
            <CanvasSize />
            <BGColors />
            <CanvasOptions />
          </div>
          <div className="text-center text-white bg-[#0C2F62] font-semibold px-4 py-1 w-full text-sm">Post options</div>
          <div className='divide-y divide-[#061830] w-full'>  
            <MediaOptions/>
            <PostOptions />
          </div>
          <div className=' w-full border-t border-[#061830]'> 
            <ExportButton className="z-20" rootRef={rootRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
