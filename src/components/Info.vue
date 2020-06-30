<template>
    <div class="m-info">
        <div class="m-info-notice">
            <span class="u-item" >🎹 新增预览模式</span>
        </div>

        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-collection"></i></router-link>
            <a href="/app/furniture" target="_blank"><i class="el-icon-table-lamp"></i></a>
            <a href="/app/flower" target="_blank"><i class="el-icon-sell"></i></a>
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
