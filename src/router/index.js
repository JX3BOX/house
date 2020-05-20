import Vue from "vue";
import VueRouter from "vue-router";

import Map from "../components/Map.vue";
import BlueprintList from "../components/BlueprintList.vue"

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Map },
    { path: '/fullhouse', component: BlueprintList },
    { path: '/partial', component: BlueprintList }
]

const router = new VueRouter({
    routes
});

export default router;
