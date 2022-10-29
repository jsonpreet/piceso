import { useCardStore } from "../../store/card";
 import ReactSlider from "react-slider";
import { MIN_ALLOWED_CANVAS_RADIUS, MAX_ALLOWED_CANVAS_RADIUS } from "../../store/constants";
import { useCanvasStore } from "../../store/canvas";

export default function CanvasOptions() {
    const radius = useCanvasStore((state) => state.radius);
    const setRadius = useCanvasStore((state) => state.setRadius);
    return (
    <>
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
                min={MIN_ALLOWED_CANVAS_RADIUS}
                max={MAX_ALLOWED_CANVAS_RADIUS}
                vertical={false}
                value={radius}
                onChange={(value) => setRadius(() => value)}/>
            </div>
        </div>
    </>
    );
}
