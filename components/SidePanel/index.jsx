import Text from "./Text";
import Colors from "./Colors";
import Size from "./Card";
import Templates from "./Templates";
import Options from "./Options";


export default function SidePanel({ isPanelOpen }) {
  return (
    <div className='flex items-center w-full pb-5 lg:pb-5'>
      <div className='relative flex flex-row flex-wrap items-start justify-start w-full border bg-gray-100 border-gray-200 shadow-lg rounded-xl lg:items-start lg:flex-col dark:border-gray-800 dark:shadow-black/80 dark:bg-[#1d1d1d]'>
        <div className='w-full'>
          <div className="text-center text-gray-500 bg-gray-200 px-4 py-1 dark:bg-gray-900 w-full text-sm rounded-tr-xl rounded-tl-xl">Canvas options</div>
          <div className='divide-y divide-gray-200 dark:divide-gray-800 w-full'>
            <Size />
            <Colors />
          </div>
          <div className="text-center text-gray-500 bg-gray-200 px-4 py-1 dark:bg-gray-900 w-full text-sm">Post options</div>
          <div className='divide-y divide-gray-200 dark:divide-gray-800 w-full'>  
            <Options/>
            <Text />
          </div>
        </div>
      </div>
    </div>
  );
}
