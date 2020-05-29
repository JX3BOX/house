<template>
    <div class="m-house-map">
        <div class="m-house-map-nav">
            <el-radio-group v-model="map" class="u-radiogroup">
                <el-radio-button label="广陵邑"></el-radio-button>
                <el-radio-button label="望扬镇"></el-radio-button>
                <el-radio-button label="九寨沟"></el-radio-button>
                <el-radio-button label="七秀"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="m-house-map-box">
            <el-tabs v-model="map">
                <el-tab-pane name="广陵邑">
                    <div class="m-house-model">
                        <div class="u-map">
                            <i class="u-map-1-1"></i>
                            <i class="u-map-1-2"></i>
                            <i class="u-map-1-3"></i>
                            <i class="u-map-1-4"></i>
                            <i class="u-map-2-1"></i>
                            <i class="u-map-2-2"></i>
                            <i class="u-map-2-3"></i>
                            <i class="u-map-2-4"></i>
                            <i class="u-map-3-1"></i>
                            <i class="u-map-3-2"></i>
                            <i class="u-map-3-3"></i>
                            <i class="u-map-3-4"></i>
                        </div>
                        <div class="u-house">
                            <a
                                v-for="(house, i) in houses"
                                :key="'house-' + i"
                                class="u-house-item"
                                :class="'u-house-index-' + i"
                                :style="house.style"
                                :href="house.link"
                                :title="(i+1) + '号-' +  house.name"
                                ><i :class="'u-house-icon u-house-area-' + house.area"></i></a
                            >
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="望扬镇">pending</el-tab-pane>
                <el-tab-pane name="九寨沟">pending</el-tab-pane>
                <el-tab-pane name="七秀">pending</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
const map1houses = require("../assets/data/map1.js");
export default {
    name: "Map",
    props: [],
    data: function() {
        return {
            map: "广陵邑",
            houses: map1houses,
        };
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {},
};
</script>
