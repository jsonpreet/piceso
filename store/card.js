import create from "zustand";
import { MAX_ALLOWED_FONT_SIZE, MAX_ALLOWED_OPACITY, MAX_ALLOWED_RADIUS, MAX_ALLOWED_SCALE, MAX_ALLOWED_WIDTH, MIN_ALLOWED_FONT_SIZE, MIN_ALLOWED_OPACITY, MIN_ALLOWED_RADIUS, MIN_ALLOWED_SCALE, MIN_ALLOWED_WIDTH, } from "./constants";
import { getValueInRange } from "./utils";


export const useCardStore = create((set) => ({
  width: 82,
  radius: 16,
  opacity: 100,
  scale: 100,
  size: { name: 'Auto', ratio: 'auto' },
  shadow: '0',
  fontSize: 24,
  exportImage: false,
  font: new Set(["-apple-system, system-ui, BlinkMacSystemFont, Public Sans, Helvetica Neue, Segoe UI, Roboto, Arial", "sans-serif"]),
  setWidth(callback) {
    set(({ width }) => ({ width: getValueInRange(callback(width), MIN_ALLOWED_WIDTH, MAX_ALLOWED_WIDTH) }));
  },
  setRadius(callback) {
    set(({ radius }) => ({ radius: getValueInRange(callback(radius), MIN_ALLOWED_RADIUS, MAX_ALLOWED_RADIUS) }));
  },
  setOpacity(callback) {
    set(({ opacity }) => ({ opacity: getValueInRange(callback(opacity), MIN_ALLOWED_OPACITY, MAX_ALLOWED_OPACITY) }));
  },
  setScale(callback) {
    set(({ scale }) => ({ scale: getValueInRange(callback(scale), MIN_ALLOWED_SCALE, MAX_ALLOWED_SCALE) }));
  },
  setFontSize(callback) {
    set(({ fontSize }) => ({ fontSize: getValueInRange(callback(fontSize), MIN_ALLOWED_FONT_SIZE, MAX_ALLOWED_FONT_SIZE) }));
  },
  setFont(callback) {
    set(({ font }) => ({ font: callback(font) }));
  },
  setSize(callback) {
    set(({ size }) => ({ size: callback(size) }));
  },
  setExport(params) {
    set(( state ) => ({ exportImage: params }));
  },
}));
