import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import CreatePlaylist from "@/views/playlist/CreatePlaylist.vue";
import PlaylistDetails from "@/views/playlist/PlaylistDetail.vue";
import Myplaylist from "@/views/playlist/Myplaylist.vue";
import { projectAuth } from "@/firebase/config";

const authRequired = (to, from, next) => {
  const user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: authRequired,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/playlist/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: authRequired,
  },
  {
    path: "/playlist/:id",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    beforeEnter: authRequired,
    props: true,
  },
  {
    path: "/playlist/user/",
    name: "Myplaylist",
    component: Myplaylist,
    beforeEnter: authRequired,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
