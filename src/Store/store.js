import { createStore } from 'vuex';
import CoachModules from './Modules/coachModules.js';
import requestModules from './Modules/requestModules.js';
import authentication from './Modules/authentication.js';
const store = createStore({
  modules: {
    coach: CoachModules,
    request: requestModules,
    auth: authentication,
  },
});

export default store;
