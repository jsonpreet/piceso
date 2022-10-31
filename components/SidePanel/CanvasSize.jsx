import { Popover, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { BsTwitter, BsTextareaResize, BsInstagram } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa";
import { useCardStore } from '../../store/card';

export default function CanvasSize() {
  const size = useCardStore((state) => state.size);
  const setSize = useCardStore((state) => state.setSize);
  return (
    <div className="relative w-full">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${open ? '' : 'text-opacity-90'} flex items-center text-sm font-semibold duration-200 justify-between hover:bg-white/10 w-full px-4 py-4 `}>
              <span className='text-white'>Canvas Size</span>
              <div variant="side" as="div" className="px-[5px] text-[0.7rem] bg-gray-200 rounded-md text-gray-600 font-normal border border-gray-300 hover:border-gray-400 font-mono leading-normal flex items-center justify-center duration-100 cursor-default ml-2">
                <span className="font-mono capitalize">{size.name}</span>
              </div>
              <div className="flex ml-auto items-center">
                <ChevronRightIcon
                  className={`${open ? '' : 'text-opacity-70'} ml-2 h-5 w-5 opacity-60 text-white group-hover:opacity-100`}
                  aria-hidden="true"
                />
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 w-screen max-w-[95vw] md:max-w-[500px] -translate-x-1/2 transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-[#010812]">
                  <div className="shadow-[0_2px_20px_rgba(0,0,0,0.3)] bg-white rounded-xl w-full relative z-[10]">
                    <div className="bg-[#13518f] z-20 px-2 flex py-1 text-sm backdrop-blur-md text-white border-[#010812] font-semibold border-b">
                      <h3 className="flex items-center"><BsTextareaResize size={18} className='mt-[2px] mr-2'/>Select Canvas size</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3 max-h-[300px] overscroll-none h-full w-full px-3 py-4">
                      
                      <button className={`duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:text-[#6d4800] hover:border-[#6d4800] hover:bg-[#fff7d9] bg-white border-gray-400 ${size.name === 'Auto' ? `border-[#6d4800] bg-[#ffcf26] text-[#6d4800]` : ' text-gray-500'}`}
                        onClick={() => setSize(() => ({ name: 'Auto', ratio: 'auto'}))}
                      >
                        <div>
                          Auto
                        </div>
                      </button>

                      <button className={`duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:text-[#6d4800] hover:border-[#6d4800] hover:bg-[#fff7d9] bg-white border-gray-400 ${size.name === 'Tweet' ? `border-[#6d4800] bg-[#ffcf26] text-[#6d4800]` : ' text-gray-500'}`}
                        onClick={() => setSize(() => ({ name: 'Tweet', ratio: '1 / 0.875'}))}
                        >
                        <div className="mr-2 md:inline-flex hidden">
                          <BsTwitter className="text-[#1da1f2]" size={16} aria-hidden="true" />
                        </div>
                        <div className='md:text-normal text-xs'>
                          Tweet
                        </div>
                      </button>
                      <button className={`duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:text-[#6d4800] hover:border-[#6d4800] hover:bg-[#fff7d9] bg-white border-gray-400 ${size.name === 'Insta Post' ? `border-[#6d4800] bg-[#ffcf26] text-[#6d4800]` : ' text-gray-500'}`}
                        onClick={() => setSize(() => ({ name: 'Insta Post', ratio: '4 / 5'}))}
                      >
                        <div className="mr-2 md:inline-flex hidden">
                          <BsInstagram className="text-[#e1306c]" size={16} aria-hidden="true" />
                        </div>
                        <div className='md:text-normal text-xs'>
                          Insta Post
                        </div>
                      </button>
                      <button className={`duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:text-[#6d4800] hover:border-[#6d4800] hover:bg-[#fff7d9] bg-white border-gray-400 ${size.name === 'Insta Story' ? `border-[#6d4800] bg-[#ffcf26] text-[#6d4800]` : ' text-gray-500'}`}
                        onClick={() => setSize(() => ({ name: 'Insta Story', ratio: '9 / 16'}))}
                      >
                        <div className="mr-2 md:inline-flex hidden">
                          <BsInstagram className="text-[#e1306c]" size={16} aria-hidden="true" />
                        </div>
                        <div className='md:text-normal text-xs'>
                          Insta Story
                        </div>
                      </button>
                      
                      <button className={`duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:text-[#6d4800] hover:border-[#6d4800] hover:bg-[#fff7d9] bg-white border-gray-400 ${size.name === 'Product Hunt' ? `border-[#6d4800] bg-[#ffcf26] text-[#6d4800]` : ' text-gray-500'}`}
                        onClick={() => setSize(() => ({ name: 'Product Hunt', ratio: '1.67 / 1'}))}
                      >
                        <div className="mr-2 md:inline-flex hidden">
                          <FaProductHunt className="text-[#da552f]" size={16} aria-hidden="true" />
                        </div>
                        <div className='md:text-normal text-xs'>
                          Product Hunt
                        </div>
                      </button>
                      
                      <button className={`duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:text-[#6d4800] hover:border-[#6d4800] hover:bg-[#fff7d9] bg-white border-gray-400 ${size.name === 'Open Graph' ? `border-[#6d4800] bg-[#ffcf26] text-[#6d4800]` : ' text-gray-500'}`}
                        onClick={() => setSize(() => ({ name: 'Open Graph', ratio: '1.90476 / 1'}))}
                      >
                        <div className='md:text-normal text-xs'>
                          Open Graph
                        </div>
                      </button>
                      
                      <button className={`duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:text-[#6d4800] hover:border-[#6d4800] hover:bg-[#fff7d9] bg-white border-gray-400 ${size.name === 'Square (1:1)' ? `border-[#6d4800] bg-[#ffcf26] text-[#6d4800]` : ' text-gray-500'}`}
                        onClick={() => setSize(() => ({ name: 'Square (1:1)', ratio: '1 / 1'}))}
                      >
                        <div className='md:text-normal text-xs'>
                          Square (1:1)
                        </div>
                      </button>
                      
                      <button className={`duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:text-[#6d4800] hover:border-[#6d4800] hover:bg-[#fff7d9] bg-white border-gray-400 ${size.name === 'Wide (16:9)' ? `border-[#6d4800] bg-[#ffcf26] text-[#6d4800]` : ' text-gray-500'}`}
                        onClick={() => setSize(() => ({ name: 'Wide (16:9)', ratio: '16 / 9'}))}
                      >
                        <div className='md:text-normal text-xs'>
                          Wide (16:9)
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
