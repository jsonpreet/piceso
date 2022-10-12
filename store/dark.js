import create from "zustand";

export const useDarkStore = create((set) => ({
  isDark: false,
  setIsDark(callback) {
    set(({ isDark }) => ({ isDark: callback(isDark) }));
  },
}));
