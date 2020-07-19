import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = {
    state: {
        mode : '',
        subtype : '',

        pid : 0,
        post : {},
        meta : {},
        stat : {},
        author : {},
        status : false,

        map : '广陵邑',
        map_visible : false,
    },
    mutations: {
        switchMap : function (state,payload){
            state.subtype = state.map = payload
        },
        openMap : function (state,payload){
            state.map_visible = true
        },
        closeMap : function (state,payload){
            state.map_visible = false
        },
    },
    getters: {
    },
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
