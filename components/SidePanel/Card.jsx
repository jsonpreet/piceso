import { useCardStore } from "../../store/card";
import Input from "./Input";
import { Popover, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { BsTwitter, BsTextareaResize, BsInstagram } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa";

export default function Size() {
  const cardWidth = useCardStore((state) => state.width);
  const setWidth = useCardStore((state) => state.setWidth);

  const cardHeight = useCardStore((state) => state.height);
  const setHeight = useCardStore((state) => state.setHeight);

  const radius = useCardStore((state) => state.radius);
  const setRadius = useCardStore((state) => state.setRadius);

  const opacity = useCardStore((state) => state.opacity);
  const setOpacity = useCardStore((state) => state.setOpacity);

  return (
    <div className="relative w-full">
      {/* <form className="-mx-3 mt-4 grid grid-cols-2 gap-y-1 gap-x-2">
        <Input label="W" data={cardWidth} action={setWidth} />
        <Input label="H" data={cardHeight} action={setHeight} />
        <Input label="R" data={radius} action={setRadius} />
        <Input label="O" data={opacity} action={setOpacity} />
      </form> */}
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                group inline-flex items-center text-sm font-semibold duration-200 justify-between hover:bg-blue-100 dark:hover:bg-blue-500/40 w-full p-4 `}
            >
              <span>Canvas Size</span>
              <ChevronRightIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 opacity-60 dark:text-gray-300 group-hover:opacity-100`}
                aria-hidden="true"
              />
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
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-[95vw] md:max-w-[500px] -translate-x-1/2 transform px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="shadow-[0_2px_20px_rgba(0,0,0,0.3)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.5)] ring-1 ring-gray-400/20 dark:ring-gray-700 bg-white/80 backdrop-blur-xl dark:bg-gray-900/80 rounded-xl w-full relative z-[10]">
                    <div class="bg-white/70 z-20 px-2 flex py-2 text-xs dark:bg-gray-800/40 backdrop-blur-md text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                      <h3 class="flex items-center"><BsTextareaResize size={16} className='mr-2'/>Select Canvas size</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3 max-h-[300px] overscroll-none h-full w-full px-3 py-4">
                      
                      <button className="duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:border-pink-500 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 bg-white border-gray-300 dark:hover:border-pink-500/80">
                        <div>
                          Auto
                        </div>
                      </button>

                      <button className="duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:border-pink-500 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 bg-white border-gray-300 dark:hover:border-pink-500/80">
                        <div className="mr-2">
                          <BsTwitter className="text-[#1da1f2]" size={16} aria-hidden="true" />
                        </div>
                        <div>
                          Tweet
                        </div>
                      </button>
                      <button className="duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:border-pink-500 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 bg-white border-gray-300 dark:hover:border-pink-500/80">
                        <div className="mr-2">
                          <BsInstagram className="text-[#e1306c]" size={16} aria-hidden="true" />
                        </div>
                        <div>
                          Insta Post
                        </div>
                      </button>
                      <button className="duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:border-pink-500 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 bg-white border-gray-300 dark:hover:border-pink-500/80">
                        <div className="mr-2">
                          <BsInstagram className="text-[#e1306c]" size={16} aria-hidden="true" />
                        </div>
                        <div>
                          Insta Story
                        </div>
                      </button>
                      
                      <button className="duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:border-pink-500 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 bg-white border-gray-300 dark:hover:border-pink-500/80">
                        <div className="mr-2">
                          <FaProductHunt className="text-[#da552f]" size={16} aria-hidden="true" />
                        </div>
                        <div>
                          Product Hunt
                        </div>
                      </button>
                      
                      <button className="duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:border-pink-500 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 bg-white border-gray-300 dark:hover:border-pink-500/80">
                        <div>
                          Open Graph
                        </div>
                      </button>
                      
                      <button className="duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:border-pink-500 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 bg-white border-gray-300 dark:hover:border-pink-500/80">
                        <div>
                          Square (1:1)
                        </div>
                      </button>
                      
                      <button className="duration-200 snap-center whitespace-nowrap cursor-pointer flex-none px-2 py-2 text-sm text-center border rounded-xl flex items-center justify-center relative hover:border-pink-500 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 bg-white border-gray-300 dark:hover:border-pink-500/80">
                        <div>
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
