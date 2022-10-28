import { useGradientStore } from "../../store/gradient";
import { Popover, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { backgrounds } from "../../store/constants";

export default function Colors() {
  const gradients = useGradientStore((state) => state.gradients);
  const selectedGradient = useGradientStore((state) => state.selectedGradient);
  const setSelectedGradient = useGradientStore(
    (state) => state.setSelectedGradient,
  );

  return (
    <div className="relative w-full">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${open ? '' : 'text-opacity-90'} flex items-center text-sm font-semibold duration-200 justify-between hover:bg-white/10 w-full px-4 py-2 `}>
              <span className="text-white">Background</span>
              <div variant="side" as="div" className="px-[5px] text-[0.7rem] bg-gray-200 rounded-md text-gray-600 font-normal border border-gray-300 hover:border-gray-400 font-mono leading-normal flex items-center justify-center duration-100 cursor-default ml-2">
                <span className="font-mono capitalize">Gradient</span>
              </div>
              <div className="flex ml-auto items-center">
                <div className="p-[1px] bg-white border border-gray-300 rounded-[10px] cursor-pointer hover:border-gray-600 w-[36px] h-[36px] mr-3">
                  <div className="w-full h-full rounded-lg shadow-[0_0_2px_rgba(0,0,0,0.2)]" style={{ background: `linear-gradient(to bottom right, ${selectedGradient.from}, ${selectedGradient.to})`,}}></div>
                </div>
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
                  <div className="shadow-[0_2px_20px_rgba(0,0,0,0.3)] bg-[#0c0c44c2] backdrop-blur-xl rounded-xl w-full relative z-[10]">
                    <div className="bg-[#13518f] z-20 px-2 flex py-1 text-sm backdrop-blur-md text-white border-[#010812] font-semibold border-b">
                      <h3 className="flex items-center">Gradient</h3>
                    </div>
                    <div className="px-4 py-4">
                      <div className="grid flex-wrap grid-cols-8 gap-[1px] relative overflow-hidden rounded-lg shadow">
                        {gradients.map((gradient) => (
                          <div
                            key={gradient.id}
                            style={{
                              background: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`,
                            }}
                            className={`cursor-pointer group flex items-center justify-center shadow shadow-gray-500/20 w-full aspect-square`}
                              onClick={() => setSelectedGradient(() => gradient)}
                          >
                            <div class={`w-2 h-2 rounded-full shadow-black/50 bg-gradient-to-br from-white to-gray-600 duration-200 mix-blend-luminosity ${JSON.stringify(gradient) === JSON.stringify(selectedGradient) ? `opacity-100` : `opacity-0`} translate-y-0 scale-100`}></div>
                          </div>
                        ))}
                      </div>
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
