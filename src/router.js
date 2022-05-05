import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// import CoachesList from './components/Coaches/CoachesList.vue';
// import RequestList from './components/Request/ReceivedRequests.vue';
// import ContactForm from './components/Request/ContactForm.vue';
// import RegisterCoach from './components/Coaches/RegisterCoach.vue';
// import CoachDetials from './components/Coaches/CoachDetails.vue';
// import LoginPage from './components/pages/LoginPage.vue';
import NotFound from './components/UI/NotFound.vue';
import store from './Store/store.js';

const CoachesList = defineAsyncComponent(() =>
  import('./components/Coaches/CoachesList.vue')
);
const RequestList = defineAsyncComponent(() =>
  import('./components/Request/ReceivedRequests.vue')
);
const ContactForm = defineAsyncComponent(() =>
  import('./components/Request/ContactForm.vue')
);
const LoginPage = defineAsyncComponent(() =>
  import('./components/pages/LoginPage.vue')
);
const RegisterCoach = defineAsyncComponent(() =>
  import('./components/Coaches/RegisterCoach.vue')
);
const CoachDetials = defineAsyncComponent(() =>
  import('./components/Coaches/CoachDetails.vue')
);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetials,
      props: true,
      children: [{ path: 'contact', component: ContactForm }],
    },
    {
      path: '/register',
      component: RegisterCoach,
      meta: { requireAuth: true },
    },
    { path: '/request', component: RequestList, meta: { requireAuth: true } },
    { path: '/auth', component: LoginPage, meta: { requireUnAuth: true } },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
});
router.beforeEach(function (to, _, next) {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requireUnAuth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});
export default router;
