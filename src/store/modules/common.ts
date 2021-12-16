const common = {
  state: {
    locale: "en",
  },
  actions: {},
  mutations: {
    SET_LANG(state: any, data: string) {
      localStorage.setItem("lang", data);
      state.locale = data;
    },
  },
};

export default common;
