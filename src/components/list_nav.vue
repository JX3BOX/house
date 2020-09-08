<template>
    <div class="m-list-nav m-house-nav">
        <RightSideMsg>
            <em>休闲玩法交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=InbtJGcw">658035079</a>
            </strong>
        </RightSideMsg>

        <h5 class="u-title">
            家园分享
            <!-- <a href="/house" class="u-more">查看全部 &raquo;</a> -->
        </h5>
        <div class="m-nav-group">
            <el-select
                class="u-map-select"
                v-model="map"
                placeholder="广陵邑"
                @change="switchMap"
            >
                <el-option
                    v-for="(mapname,mapid) in maps"
                    :key="mapid"
                    :label="mapname"
                    :value="mapid"
                ></el-option>
            </el-select>

            <div class="u-map-thumb" @click="openMap">
                <img :src="map_thumb" :alt="map" />
                <span class="u-desc">点击展开地图选房</span>
            </div>
        </div>

        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-group">
            <a href="/app/furniture" target="_blank">
                <img svg-inline src="../assets/img/app/f2.svg" />
                <span>家具图鉴</span>
                <em>Furniture</em>
                <!-- <i class="u-mark isnew">全新上线</i> -->
            </a>
            <a href="/app/flower" target="_blank">
                <img svg-inline src="../assets/img/app/flower.svg" />
                <span>实时花价</span>
                <em>Flower</em>
                <!-- <i class="u-mark ishot">精准数据</i> -->
            </a>
        </div>
    </div>
</template>

<script>
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import maps from '@/assets/data/mapindex.json'

export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
            map: "455",
            maps: maps,
        };
    },
    computed: {
        map_thumb: function() {
            return __ossMirror + "image/house/minimap/1.png";
        },
        subtype: function() {
            return this.$store.state.subtype;
        },
    },
    methods: {
        switchMap: function() {
            this.$store.commit("switchMap", this.map);
        },
        openMap: function() {
            this.$store.commit("openMap");
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/list_nav.less";
</style>
