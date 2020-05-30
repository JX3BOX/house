<template>
    <div class="m-list-nav">
        <h5 class="u-title">家园分享</h5>
        <div class="m-nav-group">
            <a href="/house/?subtype=广陵邑" :class="{on : subtype == '广陵邑'}"><img svg-inline src="../assets/img/house.svg" /><span>广陵邑</span></a>
        </div>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <router-link to="/furniture"><img svg-inline src="../assets/img/logo.svg" /><span>家具图鉴</span><i class="u-mark isnew">全新上线</i></router-link>
            <router-link to="/flower"><img svg-inline src="../assets/img/logo.svg" /><span>实时花价</span><i class="u-mark ishot">精准数据</i></router-link>
        </div>

    </div>
</template>

<script>
export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
        subtype : function (){
            return this.$store.state.subtype
        }
    },
    methods: {
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/list_nav.less";
</style>
