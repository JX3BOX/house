<template>
    <div class="m-list-nav m-house-nav">
        <h5 class="u-title">
            家园分享
            <!-- <a href="/house" class="u-more">查看全部 &raquo;</a> -->
        </h5>
        <div class="m-nav-group">
            <el-select class="u-map-select" v-model="map" placeholder="广陵邑" @change="switchMap">
                <el-option
                    v-for="item in maps"
                    :key="item"
                    :label="item"
                    :value="item"
                >
                </el-option>
            </el-select>

            <div class="u-map-thumb" @click="openMap">
                <img :src="map_thumb" :alt="map">
                <span class="u-desc">点击展开地图选房</span>
            </div>
            
        </div>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <router-link to="/furniture"
                ><img svg-inline src="../assets/img/app/f2.svg" /><span
                    >家具图鉴</span
                ><i class="u-mark isnew">全新上线</i></router-link
            >
            <router-link to="/flower"
                ><img svg-inline src="../assets/img/app/flower.svg" /><span
                    >实时花价</span
                ><i class="u-mark ishot">精准数据</i></router-link
            >
        </div>
    </div>
</template>

<script>
import {__ossMirror} from '@jx3box/jx3box-common/js/jx3box.json'

export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
            map: "广陵邑",
            maps: ["广陵邑"],
        };
    },
    computed: {
        map_thumb : function (){
            return __ossMirror + 'image/house/minimap/' + this.map + '.png'
        },
        subtype: function() {
            return this.$store.state.subtype;
        },
    },
    methods: {
        switchMap : function (){
            this.$store.commit('switchMap',this.map)
        },
        openMap : function (){
            this.$store.commit('openMap')
        }
    },
    mounted: function() {},
    components : {
        
    }
};
</script>

<style lang="less">
@import "../assets/css/list_nav.less";
</style>
