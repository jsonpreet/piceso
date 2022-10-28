import CardInner from "./CardInner";
import { useCardStore } from "../../store/card";
import { useGradientStore } from "../../store/gradient";
import Size from "../SidePanel/Card";

export default function CardOuter({ rootRef }) {
  const size = useCardStore((state) => state.size);
  const gradient = useGradientStore((state) => state.selectedGradient);

  const radius = useCardStore((state) => state.radius);

  return (
    <div ref={rootRef} style={{ aspectRatio: size.ratio, background: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`,}} className="flex w-full py-8 px-[2px] h-full items-center justify-center overflow-hidden rounded-xl leading-normal shadow-md">
      <div className="relative w-full mx-auto" style={{ maxWidth: '84%', willChange: 'transform', transition: 'all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s', transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'}}>
        <CardInner />
      </div>
    </div>
  );
}
