import create from "zustand";

export const useTemplateStore = create((set) => ({
  selectedTemplate: "first",
  setSelectedTemplate(callback) {
    set(({ selectedTemplate }) => ({
      selectedTemplate: callback(selectedTemplate),
    }));
  },
}));
