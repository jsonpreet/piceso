import { useCardStore } from "../../store/card";
import { MIN_ALLOWED_HEIGHT, MIN_ALLOWED_WIDTH } from "../../store/constants";
import CardOuter from "./CardOuter";

export default function DeSoCard({ rootRef }) {
  const cardWidth = useCardStore((state) => state.width);
  const cardHeight = useCardStore((state) => state.height);
  return (
    <CardOuter rootRef={rootRef} />
  );
}
