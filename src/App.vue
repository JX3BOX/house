<template>
    <div id="app">
        <Header />
        <Breadcrumb name="结庐江湖" slug="slug" root="/" publishEnable="true">
            <img slot="logo" svg-inline src="./assets/img/house.svg" />
            <div class="u-stat">街南绿树春饶絮，雪满游春路。树头花艳杂娇云，树底人家朱户。</div>
            <!-- <Info /> -->
        </Breadcrumb>
        <LeftSidebar><Nav /></LeftSidebar>
        <Main>
            <div class="m-house-index"><router-view></router-view></div>
            <RightSidebar><Extend /></RightSidebar>
            <Footer />
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
