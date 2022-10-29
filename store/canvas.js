import create from "zustand";
import { MIN_ALLOWED_CANVAS_RADIUS } from "./constants";
import { getValueInRange } from "./utils";


export const useCanvasStore = create((set) => ({
    radius: 0,
    setRadius(callback) {
        set(({ radius }) => ({ radius: getValueInRange(callback(radius), MIN_ALLOWED_CANVAS_RADIUS) }));
    },
}));
