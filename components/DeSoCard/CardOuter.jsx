import CardInner from "./CardInner";
import { useCardStore } from "../../store/card";
import { useGradientStore } from "../../store/gradient";
import { useCanvasStore } from "../../store/canvas";

export default function CardOuter({ rootRef }) {
  const size = useCardStore((state) => state.size);
  const width = useCardStore((state) => state.width);
  const fontSize = useCardStore((state) => state.fontSize);
  const gradient = useGradientStore((state) => state.selectedGradient);
  const radius = useCanvasStore((state) => state.radius);

  return (
    <div id="desoPost" ref={rootRef} style={{ aspectRatio: size.ratio, borderRadius: `${radius}px`, background: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`, }} className="flex w-full py-8 px-[2px] h-full items-center justify-center overflow-hidden leading-normal shadow-md">
      <div className='scale-90 translate-x-0 translate-y-0 w-full text-[17px]' style={{ fontSize: `${fontSize}px`, fontFamily: '-apple-system, system-ui,BlinkMacSystemFont, Public Sans, Helvetica Neue, "Segoe UI", Roboto,Arial,sans-serif'}}>
        <div className="relative w-full mx-auto" style={{  maxWidth: `${width}%`, willChange: 'transform', transition: 'all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s', transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'}}>
          <CardInner />
        </div>
      </div>
    </div>
  );
}
