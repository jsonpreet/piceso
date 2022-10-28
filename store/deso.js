import create from "zustand";

export const useDesoStore = create((set) => ({
  postInfo: {
    profile_image_url: "",
    name: "",
    username: "",
    text: "",
    retweet_count: 0,
    reply_count: 0,
    like_count: 0,
    post: {},
    profile: {},
  },
  loading: true,
  isMetricsVisible: true,
  isMediaVisible: true,
  setPostInfo(callback) {
    set(({ postInfo }) => ({ postInfo: callback(postInfo) }));
  },
  setIsMetricsVisible(callback) {
    set(({ isMetricsVisible }) => ({
      isMetricsVisible: callback(isMetricsVisible),
    }));
  },
  setIsMediaVisible(callback) {
    set(({ isMediaVisible }) => ({
      isMediaVisible: callback(isMediaVisible),
    }));
  },
  setLoading: (params) => {
    set((state) => ({
      loading: params,
    }));
  },

}));
