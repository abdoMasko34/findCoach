export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequest(state, payload) {
      state.requests = payload;
    },
  },
  actions: {
    async contactCoach(context, payload) {
      const newRequest = {
        coachId: payload.coachId,
        email: payload.email,
        message: payload.message,
      };
      const response = await fetch(
        `https://findcoach-vue-app-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(error.message || 'Faild To Fetch1');
        throw error;
      }
      newRequest.id = responseData.name;
      newRequest.coachId = payload.coachId;
      context.commit('addRequest', newRequest);
    },
    async fetchRequest(context) {
      const coachId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      const response = await fetch(
        `https://findcoach-vue-app-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
          token,
        {
          method: 'GET',
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(error.message || 'Faild to Fetch requests');
        throw error;
      }
      const requests = [];
      for (const key in responseData) {
        const req = {
          id: key,
          coachId: coachId,
          email: responseData[key].email,
          message: responseData[key].message,
        };
        requests.push(req);
      }
      context.commit('setRequest', requests);
    },
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      const coachId = rootGetters.userId;
      return state.requests.filter((req) => req.coachId === coachId);
    },
    hasRequest(_, getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
};
