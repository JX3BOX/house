<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="结庐江湖" slug="house" root="/house" publishEnable="true">
            <img slot="logo" svg-inline src="./assets/img/house.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
            <div class="m-house-index">
                <Map/>
            </div>
            <RightSidebar>
                <Extend/>
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
import Extend from "@/components/Extend.vue";
import Map from "@/components/Map.vue";

export default {
    name: "App",
    props: [],
    data: function () {
        return {
            
        };
    },
    computed: {},
    methods: {},
    mounted: function () {},
    components: {
        Info,
        Nav,
        Extend,
        Map
    },
};
</script>

<style lang="less">
@import "./assets/css/index.less";
</style>
