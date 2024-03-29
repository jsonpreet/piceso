import { useCardStore } from "../../store/card";
 import ReactSlider from "react-slider";
import { MAX_ALLOWED_OPACITY, MAX_ALLOWED_RADIUS, MIN_ALLOWED_OPACITY, MIN_ALLOWED_RADIUS, MIN_ALLOWED_SCALE, MAX_ALLOWED_SCALE, MIN_ALLOWED_WIDTH, MAX_ALLOWED_WIDTH, MIN_ALLOWED_FONT_SIZE, MAX_ALLOWED_FONT_SIZE } from "../../store/constants";

export default function PostOptions() {
  const scale = useCardStore((state) => state.scale);
  const setScale = useCardStore((state) => state.setScale);

  const width = useCardStore((state) => state.width);
  const setWidth = useCardStore((state) => state.setWidth);

  const fontSize = useCardStore((state) => state.fontSize);
  const setFontSize = useCardStore((state) => state.setFontSize);

  const radius = useCardStore((state) => state.radius);
  const setRadius = useCardStore((state) => state.setRadius);

  const opacity = useCardStore((state) => state.opacity);
  const setOpacity = useCardStore((state) => state.setOpacity);
  return (
    <>
      <div className="flex items-center justify-between w-full px-4 py-2">
        <div className="text-sm font-semibold text-white flex items-center whitespace-nowrap">
          Font Size
          <div variant="side" as="div" className="px-[5px] text-[0.7rem] bg-gray-200 text-gray-600 rounded-md font-normal border border-gray-300 hover:border-gray-400 font-mono leading-normal flex items-center justify-center duration-100 cursor-default ml-2">
            <span className="font-mono">{fontSize}</span>
          </div>
        </div>
        <div className='w-full py-4 max-w-[50%] custom-slider'>
          <ReactSlider
            progress
            step={1}
            defaultValue={fontSize}
            min={MIN_ALLOWED_FONT_SIZE}
            max={MAX_ALLOWED_FONT_SIZE}
            vertical={false}
            value={fontSize}
            onChange={(value) => setFontSize(() => value)}/>
          </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 py-2">
        <div className="text-sm font-semibold text-white flex items-center whitespace-nowrap">
          Size
          <div variant="side" as="div" className="px-[5px] text-[0.7rem] bg-gray-200 text-gray-600 rounded-md font-normal border border-gray-300 hover:border-gray-400 font-mono leading-normal flex items-center justify-center duration-100 cursor-default ml-2">
            <span className="font-mono">{scale}</span>
          </div>
        </div>
        <div className='w-full py-4 max-w-[50%] custom-slider'>
          <ReactSlider
            progress
            step={1}
            defaultValue={scale}
            min={MIN_ALLOWED_SCALE}
            max={MAX_ALLOWED_SCALE}
            vertical={false}
            value={scale}
            onChange={(value) => setScale(() => value)}/>
          </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 py-2">
        <div className="text-sm font-semibold text-white flex items-center whitespace-nowrap">
          Width
          <div variant="side" as="div" className="px-[5px] text-[0.7rem] text-gray-600 bg-gray-200 rounded-md font-normal border border-gray-300 hover:border-gray-400 font-mono leading-normal flex items-center justify-center duration-100 cursor-default ml-2">
            <span className="font-mono">{width}</span>
          </div>
        </div>
        <div className='w-full py-4 max-w-[50%] custom-slider'>
          <ReactSlider
            progress
            step={1}
            defaultValue={width}
            min={MIN_ALLOWED_WIDTH}
            max={MAX_ALLOWED_WIDTH}
            vertical={false}
            value={width}
            onChange={(value) => setWidth(() => value)}/>
          </div>
      </div>
      <div className="flex items-center justify-between w-full px-4 py-2">
        <div className="text-sm font-semibold text-white flex items-center whitespace-nowrap">
          Roundness
          <div variant="side" as="div" className="px-[5px] text-[0.7rem] text-gray-600 bg-gray-200 rounded-md font-normal border border-gray-300 hover:border-gray-400 font-mono leading-normal flex items-center justify-center duration-100 cursor-default ml-2">
            <span className="font-mono">{radius}</span>
          </div>
        </div>
        <div className='w-full py-4 max-w-[50%] custom-slider'>
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
        <div className="text-sm font-semibold text-white flex items-center whitespace-nowrap">
          Opacity
          <div variant="side" as="div" className="px-[5px] text-[0.7rem] text-gray-600 bg-gray-200 rounded-md font-normal border border-gray-300 hover:border-gray-400 font-mono leading-normal flex items-center justify-center duration-100 cursor-default ml-2">
            <span className="font-mono">{opacity}</span>
          </div>
        </div>
        <div className='w-full py-4 max-w-[50%] custom-slider'>
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
