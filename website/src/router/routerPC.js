import Home from "@/views/PC/Home.vue";

import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

export default routes;
