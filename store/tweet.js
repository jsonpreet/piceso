import create from "zustand";

export const useTweetStore = create((set) => ({
  tweetInfo: {
    profile_image_url: "",
    name: "",
    username: "",
    text: "",
    retweet_count: 800,
    reply_count: 4672,
    like_count: 1729,
    post: {},
    profile: {},
  },
  loading: true,
  isMetricsVisible: false,
  setTweetInfo(callback) {
    set(({ tweetInfo }) => ({ tweetInfo: callback(tweetInfo) }));
  },
  setIsMetricsVisible(callback) {
    set(({ isMetricsVisible }) => ({
      isMetricsVisible: callback(isMetricsVisible),
    }));
  },
  setLoading: (params) => {
    set((state) => ({
      loading: params,
    }));
  },

}));
