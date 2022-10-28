import { useCardStore } from "../../store/card";
 import ReactSlider from "react-slider";
import { MAX_ALLOWED_OPACITY, MAX_ALLOWED_RADIUS, MIN_ALLOWED_OPACITY, MIN_ALLOWED_RADIUS } from "../../store/constants";

export default function Text() {
  const cardWidth = useCardStore((state) => state.width);
  const setWidth = useCardStore((state) => state.setWidth);

  const cardHeight = useCardStore((state) => state.height);
  const setHeight = useCardStore((state) => state.setHeight);

  const radius = useCardStore((state) => state.radius);
  const setRadius = useCardStore((state) => state.setRadius);

  const opacity = useCardStore((state) => state.opacity);
  const setOpacity = useCardStore((state) => state.setOpacity);
  return (
    <>
      <div className="flex items-center justify-between w-full px-4 py-2">
        <div class="text-sm font-semibold dark:text-gray-200 flex items-center whitespace-nowrap">Roundness<div variant="side" as="div" class="px-[5px] text-[0.7rem] bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-400 text-gray-600 font-normal border border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500 font-mono leading-normal flex items-center justify-center duration-100 cursor-default ml-2"><span class="font-mono">{radius }</span></div></div>

        <div className='w-full max-w-[50%] custom-slider'>
          <ReactSlider
            progress
            step={1}
            defaultValue={radius}
            min={MIN_ALLOWED_RADIUS}
            max={MAX_ALLOWED_RADIUS}
            vertical={false}
            value={radius}
            onChange={(value) => setRadius(() => value)}/>
          </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 py-2">
        <div class="text-sm font-semibold dark:text-gray-200 flex items-center whitespace-nowrap">Opacity<div variant="side" as="div" class="px-[5px] text-[0.7rem] bg-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-400 text-gray-600 font-normal border border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500 font-mono leading-normal flex items-center justify-center duration-100 cursor-default ml-2"><span class="font-mono">{opacity }</span></div></div>
        <div className='w-full max-w-[50%] custom-slider'>
          <ReactSlider
            progress
            step={1}
            defaultValue={opacity}
            min={MIN_ALLOWED_OPACITY}
            max={MAX_ALLOWED_OPACITY}
            vertical={false}
            value={opacity}
            onChange={(value) => setOpacity(() => value)}/>
          </div>
      </div>
    </>
  );
}
