<template>
    <div class="m-extend-list">
        <RightSideMsg>
            <em>家园玩法交流群</em> :
            <strong
                ><a href="https://jq.qq.com/?_wv=1027&k=InbtJGcw"
                    >658035079</a
                ></strong
            >
        </RightSideMsg>
        <div class="m-side-rank">
            <!-- <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/rank.svg"
                />好评榜
            </h3> -->
            <!-- <el-tabs v-model="focus" @tab-click="loadRank">
                <el-tab-pane
                    :label="name"
                    :name="i + ''"
                    v-for="(name, i) in subnav"
                    :key="i"
                ></el-tab-pane>
            </el-tabs> -->
        </div>
        <div class="m-side-links">
            <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/puzzle.svg"
                />相关链接
            </h3>
            <div class="c-sidebar-right-list">
                <a
                    class="u-item"
                    href="https://www.jx3box.com/tool/13948/"
                    target="_blank"
                    >如何导出家园蓝图？</a
                >
            </div>
        </div>

        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
export default {
    name: "list_side",
    props: [],
    data: function() {
        return {
            focus:0,
            subnav : ['趋势榜','7日下载榜','30日下载榜']
        };
    },
    computed: {},
    methods: {
        loadRank(){

        }
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
