import create from "zustand";

export const useArrowStore = create((set) => ({
  isArrowVisible: false,
  X: 0,
  Y: 0,
  setIsArrowVisible(callback) {
    set((state) => ({ isArrowVisible: callback(state.isArrowVisible) }));
  },
  setX(callback) {
    set(({ X }) => {
      if (X > window.innerWidth) {
        return { X: -20 };
      } else if (X < -20) {
        return { X: window.innerWidth };
      } else {
        return { X: callback(X) };
      }
    });
  },
  setY(callback) {
    set(({ Y }) => ({ Y: callback(Y) }));
  },
}));
