<template>
    <div
        id="app"
        :class="{ 'p-list': mode == 'list', 'p-single': mode == 'single' }"
    >
        <Header></Header>
        <Breadcrumb
            name="家园分享"
            slug="house"
            root="/house"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/house.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar :open="mode != 'single'">
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true" :withoutLeft="mode == 'single'">
            <template v-if="mode == 'single'">
                <single class="m-fullscreen-wrapper" />
            </template>
            <template v-else>
                <list />
            </template>
            <Footer></Footer>
        </Main>
        <Map />
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
// import Extend from "@/components/Extend.vue";
import list from "@/components/list.vue";
import single from "@/components/single.vue";
import Map from "@/components/Map.vue";
import {getPID,getAppID,getQuery,getAppType} from '@jx3box/jx3box-common/js/utils'
import {__Root} from '@jx3box/jx3box-common/js/jx3box.json'

export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        mode: function() {
            return this.$store.state.mode;
        },
        isNotSpecial: function() {
            return this.$route.name != "furniture";
        },
    },
    methods: {},
    watch: {
        $route: {
            handler: function(newdata) {
                this.$store.state.subtype = newdata.params.subtype;
            },
            deep: true,
        },
    },
    beforeCreate: function() {
        let id = getAppID();
        let pid = getPID();

        // 旧单页链接跳转
        if (!id && pid) {
            let type = getAppType();
            let test = __Root + type + "/" + pid;
            location.href = __Root + type + "/" + pid;
        }

        // 处理模式 & 文章ID
        this.$store.state.mode = id ? "single" : "list";
        this.$store.state.pid = id;

        // 捕获subtype
        if (this.$store.state.mode == "list") {
            this.$store.state.subtype = getQuery("subtype");
        }
    },
    components: {
        Info,
        Nav,
        // Extend,
        list,
        single,
        Map,
    },
};
</script>

<style lang="less">
@import "./assets/css/index.less";
</style>
