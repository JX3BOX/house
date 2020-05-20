<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="结庐江湖" slug="house" root="/" publishEnable="true">
            <img slot="logo" svg-inline src="./assets/img/house.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
            <div class="m-house-index">
                <router-view></router-view>
            </div>
            <RightSidebar>
                <Extend/>
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Extend from '@/components/Extend.vue';

export default {
    name: 'App',
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {
        Nav,
        Extend
    }
};
</script>

<style lang="less">
@import './assets/css/index.less';
</style>
