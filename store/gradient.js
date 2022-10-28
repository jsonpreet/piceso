import create from "zustand";

export const useGradientStore = create((set) => ({
  selectedGradient: { id: 1, from: "#a1c4fd", to: "#c2e9fb" },
  gradients: [
    {
      id: 1,
      from: "#a1c4fd",
      to: "#c2e9fb",
    },
    {
      id: 2,
      from: "#a18cd1",
      to: "#fbc2eb",
    },
    {
      id: 3,
      from: "#ffecd2",
      to: "#fcb69f",
    },
    {
      id: 4,
      from: "#09203f",
      to: "#537895",
    },
    {
      id: 5,
      from: "#84fab0",
      to: "#8fd3f4",
    },
    {
      id: 6,
      from: "#fccb90",
      to: "#d57eeb",
    },
    {
      id: 7,
      from: "#f093fb",
      to: "#f5576c",
    },
    {
      id: 8,
      from: "#4facfe",
      to: "#00f2fe",
    },
    {
      id: 9,
      from: "#fa709a",
      to: "#fee140",
    },
    {
      id: 10,
      from: "#a8edea",
      to: "#fed6e3",
    },
    {
      id: 11,
      from: "#667eea",
      to: "#764ba2",
    },
    {
      id: 12,
      from: "#fc6076",
      to: "#ff9a44",
    },
    {
      id: 13,
      from: "#96fbc4",
      to: "#f9f586",
    },
    {
      id: 14,
      from: "#6a11cb",
      to: "#2575fc",
    },
    {
      id: 15,
      from: "#c471f5",
      to: "#fa71cd",
    },
    {
      id: 16,
      from: "#ff0844",
      to: "#ffb199",
    },
  ],
  setSelectedGradient(callback) {
    set(({ selectedGradient }) => ({
      selectedGradient: callback(selectedGradient),
    }));
  },
  setGradients(callback) {
    set(({ gradients }) => ({ gradients: callback(gradients) }));
  },
}));
