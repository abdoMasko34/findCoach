export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Manuel',
          lastName: 'Lorenz',
          areas: ['frontend', 'backend', 'career'],
          description:
            'fullStack devoloper has five years of experience with master degree in web application',
          rate: 30,
        },
        {
          id: 'c2',
          firstName: 'Maxmillian',
          lastName: 'Schwarziller',
          areas: ['frontend', 'career'],
          description:
            'frontend devolper has a four years of experience with ui & ux design and photoshop',
          rate: 40,
        },
      ],
    };
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoache(state, payload) {
      state.coaches = payload;
    },
    setFetchTimeStamp(state) {
      state.lastFetch = new Date().getTime();
    },
  },
  actions: {
    async registerCoach(context, data) {
      const userId = context.rootGetters.userId;
      const coachData = {
        firstName: data.fName,
        lastName: data.lName,
        description: data.desc,
        rate: data.rate,
        areas: data.areas,
      };
      const token = context.rootGetters.token;
      const response = await fetch(
        `https://findcoach-vue-app-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
          token,
        {
          method: 'PUT',
          body: JSON.stringify(coachData),
        }
      );
      if (!response.ok) {
        console.log('error');
      }
      context.commit('registerCoach', {
        ...coachData,
        id: userId,
      });
    },
    async loadCoaches(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return;
      }
      const response = await fetch(
        `https://findcoach-vue-app-default-rtdb.firebaseio.com/coaches.json`,
        {
          method: 'GET',
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(
          responseData.message || 'falid to Fetch  from Firebase'
        );
        throw error;
      }
      const coaches = [];
      for (const key in responseData) {
        const coach = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          rate: responseData[key].rate,
          areas: responseData[key].areas,
        };
        coaches.push(coach);
      }
      context.commit('setCoache', coaches);
      context.commit('setFetchTimeStamp');
    },
  },
  getters: {
    theCoaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.theCoaches;
      const userId = rootGetters.userId;
      return coaches.some((coach) => coach.id === userId);
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    },
  },
};
