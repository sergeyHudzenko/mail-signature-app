export default {
  state: {
    userData: {},
    signatures: [],
    signature: {}
  },
  getters: {
    userData: (state) => state.userData,
    signatures: (state) => state.signatures,
    signature: (state) => state.signature
  },
  mutations: {
    REMOVE_USER_SIGNATURE(state, data) {
      state.signatures =  state.signatures.filter(signature => signature.id !== data.id);
    },
    ADD_USER_SIGNATURE(state, data) {
      state.signatures.unshift(data);
    },
    SET_USER_SIGNATURE(state, data) {
      state.signature = data;
    },
    SET_USER_SIGNATURE_LIST(state, data) {
      state.signatures = data.reverse();
    },
    SET_USER_DATA_LIST(state, user) {
      state.userData = user;
    },
    MODIFY_USER_DATA_LIST(state, data) {
      for (const key in data) {
        if ({}.hasOwnProperty.call(data, key)) {
          state.userData[key] = data[key];
        }
      }
    },
    CLEAR_USER_DATA_LIST(state) {
      state.userData = {};
    },
  },
  actions: {
    removeSingature(context, data) {
      context.commit('REMOVE_USER_SIGNATURE', data);
    },
    addToSignatureList(context, data) {
      context.commit('ADD_USER_SIGNATURE', data);
    },
    setUserSignature(context, data) {
      context.commit('SET_USER_SIGNATURE', data);
    },
    setUserSignatureList(context, data) {
      context.commit('SET_USER_SIGNATURE_LIST', data);
    },
    setUserDataList(context, user) {
      context.commit('SET_USER_DATA_LIST', user);
    },
    clearUserDataList(context, user) {
      context.commit('CLEAR_USER_DATA_LIST', user);
    },
    modifyUserDataList(context, data) {
      context.commit('MODIFY_USER_DATA_LIST', data);
    },
  },
};
