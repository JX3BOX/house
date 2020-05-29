<template>
    <div class="m-furniture">
        <!-- 父大类 -->
        <el-tabs class="m-furniture-type" v-model="activeName" type="card" @tab-click="changeTab">
            <el-tab-pane label="建筑" name="building"></el-tab-pane>
            <el-tab-pane label="家具" name="suite"></el-tab-pane>
            <el-tab-pane label="景观" name="scenery"></el-tab-pane>
            <el-tab-pane label="收藏" name="collect"></el-tab-pane>
        </el-tabs>

        <!-- 子类型，若干个ul组 -->
        <div class="m-furniture-subtype">
            <ul>
                <li>
                    <img src="" alt="">
                    <span>水池</span>
                </li>
            </ul>
        </div>

        <!-- 筛选功能 -->

        <!-- 内容列表区 -->

        <!-- 收藏列表 -->
        <RightSidebar>
            接口：/user/meta   key='fav_furniture'，没登录的用localstorage
        </RightSidebar>

    </div>
</template>

<script>
export default {
    name: "Furniture",
    props: [],
    data: function() {
        return {
            activeName: "building",
        };
    },
    computed: {},
    methods: {
        changeTab: function() {},
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/furniture.less";
</style>
