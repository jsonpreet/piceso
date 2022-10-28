import Text from "./Text";
import Colors from "./Colors";
import Size from "./Card";
import Options from "./Options";
import ExportButton from "../ExportButton";


export default function SidePanel({ rootRef }) {
  return (
    <div className='flex items-center w-full pb-5 lg:pb-5'>
      <div className='relative flex flex-row flex-wrap items-start justify-start w-full border bg-[#010812] backdrop-blur-xl border-[#08203f] shadow-lg rounded-xl lg:items-start lg:flex-col'>
        <div className='w-full'>
          <div className="text-center text-white bg-[#0C2F62] font-semibold px-4 py-1 w-full text-sm rounded-tr-xl rounded-tl-xl">Canvas options</div>
          <div className='divide-y divide-[#061830] w-full'>
            <Size />
            <Colors />
          </div>
          <div className="text-center text-white bg-[#0C2F62] font-semibold px-4 py-1 w-full text-sm">Post options</div>
          <div className='divide-y divide-[#061830] w-full'>  
            <Options/>
            <Text />
          </div>
          <div className=' w-full border-t border-[#061830]'> 
            <ExportButton className="z-20" rootRef={rootRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
