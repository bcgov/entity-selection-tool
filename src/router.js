import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Home.vue")
    },
    {
      path: "/results/:structure",
      name: "results",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Results.vue"),
      props: true
    },
    {
      path: "/nonprofit",
      name: "nonprofit",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/NonProfit.vue"),
      props: true
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

export default router;
