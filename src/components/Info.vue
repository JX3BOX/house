<template>
    <div class="m-info">
        <div class="m-info-notice">
            <a class="u-item" href="/house/#/furniture">🎹 家具应用优化</a>
            <a class="u-item" href="/house/#/flower">🌺 花价应用增加一键复制分线</a>
        </div>

        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-collection"></i></router-link>
            <router-link to="/furniture"><i class="el-icon-table-lamp"></i></router-link>
            <router-link to="/flower"><i class="el-icon-sell"></i></router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
    @import '../assets/css/info.less';
</style>
