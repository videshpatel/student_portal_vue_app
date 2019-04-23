import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Edit from "./views/Edit.vue";
import EditCapstones from "./views/EditCapstones.vue";
import EditEducations from "./views/EditEducations.vue";
import EditExperiences from "./views/EditExperiences.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/edit",
      name: "edit",
      component: Edit
    },
    {
      path: "/editcapstones",
      name: "editcapstones",
      component: EditCapstones
    },
    {
      path: "/editeducations",
      name: "editeducations",
      component: EditEducations
    },
    {
      path: "/editexperiences",
      name: "editexperiences",
      component: EditExperiences
    },
    {
      path: "/Signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/about",
      name: "about",

      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
