<template>
    <div id="app">
        <Header />
        <Breadcrumb>
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main>
            <div class="m-house-index">
                <Map/>
            </div>
            <RightSidebar>
                <Extend />
            </RightSidebar>
            <Footer />
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
