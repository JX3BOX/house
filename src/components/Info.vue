<template>
    <div class="m-info">
        <!-- TODO:修改链接地址 -->
        <a class="u-channel" href="/">
            <img class="u-channel-logo" svg-inline src="../assets/img/house.svg" />
            <span class="u-title">结庐江湖</span>
        </a>
        <!-- 统计数据 -->
        <div class="u-stat">
            街南绿树春饶絮，雪满游春路。树头花艳杂娇云，树底人家朱户。
        </div>
        <!-- 发布按钮 -->
        <el-button
            class="u-publish"
            type="primary"
            icon="el-icon-edit"
        >发布</el-button>
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
.m-info {
}
@media screen and (max-width:@ipad){
    .m-info{
        .u-stat{
            white-space:nowrap;
            overflow:auto;
        }
    }
}
</style>
