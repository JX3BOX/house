import Vue from "vue";
import VueRouter from "vue-router";

import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    // { path: '/blueprint', component: Blueprint },
];

const router = new VueRouter({
    routes,
});

export default router;
