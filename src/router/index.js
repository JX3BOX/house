import Vue from "vue";
import VueRouter from "vue-router";

// import Map from "../components/Map.vue";
// import BlueprintList from "../components/BlueprintList.vue"
import Index from "../views/Index.vue";
import Furniture from "../views/Furniture.vue";
import Flower from "../views/Flower.vue";
// import Blueprint from "../views/Blueprint.vue";

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "furniture", path: "/furniture", component: Furniture },
    { name: "flower", path: "/flower", component: Flower },
    // { path: '/blueprint', component: Blueprint },
];

const router = new VueRouter({
    routes,
});

export default router;
