import Vue from "vue";
import VueRouter from "vue-router";

// import Map from "../components/Map.vue";
// import BlueprintList from "../components/BlueprintList.vue"
import Index from "../views/Index.vue";
import Furniture from "../views/Furniture.vue";
import Flower from "../views/Flower.vue";
import Blueprint from "../views/Blueprint.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Index },
    { path: '/furniture', component: Furniture },
    { path: '/flower', component: Flower },
    { path: '/blueprint/:subtype', component: Blueprint }
]

const router = new VueRouter({
    routes
});

export default router;
