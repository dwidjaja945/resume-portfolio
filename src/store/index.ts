import { createStore } from 'vuex';

export interface RootStore {
  uid: number | null;
};

type SetUidPayload = {
  uid: number;
}

export default createStore<RootStore>({
  state: {
    uid: null,
  },
  mutations: {
    setUid(state, payload: SetUidPayload): void {
      state.uid = payload.uid;
    },
  },
  actions: {
    setUid({ commit }, { uid }: SetUidPayload) {
      commit('setUid', { uid });
    },
  },
  modules: {
  },
});
