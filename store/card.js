import create from "zustand";
import { MAX_ALLOWED_OPACITY, MIN_ALLOWED_HEIGHT, MIN_ALLOWED_OPACITY, MIN_ALLOWED_RADIUS, MIN_ALLOWED_WIDTH, } from "./constants";
import { getValueInRange } from "./utils";


export const useCardStore = create((set) => ({
  height: 700,
  width: 800,
  radius: 16,
  opacity: 100,
  scale: 100,
  size: { width: 800, height: 700, name: 'Auto', ratio: 'auto' },
  shadow: '0',
  exportImage: true,
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
  setOpacity(callback) {
    set(({ opacity }) => ({ opacity: getValueInRange(callback(opacity), MIN_ALLOWED_OPACITY, MAX_ALLOWED_OPACITY) }));
  },
  setFont(callback) {
    set(({ font }) => ({ font: callback(font) }));
  },
  setSize(callback) {
    set(({ size }) => ({ size: callback(size) }));
  },
  setScale(callback) {
    set(({ scale }) => ({ scale: callback(scale) }));
  },
  setExport(params) {
    set(( state ) => ({ exportImage: params }));
  },
}));
