import create from "zustand";
import { MAX_ALLOWED_OPACITY, MIN_ALLOWED_HEIGHT, MIN_ALLOWED_OPACITY, MIN_ALLOWED_RADIUS, MIN_ALLOWED_WIDTH, } from "./constants";
import { getValueInRange } from "./utils";


export const useCardStore = create((set) => ({
  height: 700,
  width: 800,
  radius: 16,
  opacity: 100,
  font: new Set(["-apple-system, system-ui, BlinkMacSystemFont, Public Sans, Helvetica Neue, Segoe UI, Roboto, Arial", "sans-serif"]),
  setHeight(callback) {
    set(({ height }) => ({ height: getValueInRange(callback(height), MIN_ALLOWED_HEIGHT) }))
  },
  setWidth(callback) {
    set(({ width }) => ({ width: getValueInRange(callback(width), MIN_ALLOWED_WIDTH) }));
  },
  setRadius(callback) {
    set(({ radius }) => ({ radius: getValueInRange(callback(radius), MIN_ALLOWED_RADIUS) }));
  },
  
  // setRadius: (params) => {
  //   set((state) => ({
  //     radius: params,
  //   }));
  // },
  setOpacity(callback) {
    set(({ opacity }) => ({ opacity: getValueInRange(callback(opacity), MIN_ALLOWED_OPACITY, MAX_ALLOWED_OPACITY) }));
  },
  setFont(callback) {
    set(({ font }) => ({ font: callback(font) }));
  },
}));
