<template>
    <div class="m-house-map" v-show="visible">
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
                <el-tooltip
                    class="item"
                    effect="light"
                    :content="i + 1 + '号-' + house.name"
                    placement="top"
                    v-for="(house, i) in housegroup"
                    :key="'house-' + i"
                >
                    <span
                        class="u-house-item"
                        :class="'u-house-index-' + i"
                        :style="house.style"
                        @click="chooseHouse(i + 1)"
                        ><i
                            :class="'u-house-icon u-house-area-' + house.area"
                        ></i
                    ></span>
                </el-tooltip>
            </div>
            <div class="u-close" @click="close"><i class="el-icon-close"></i>关闭</div>
        </div>
    </div>
</template>

<script>
import map1houses from "../assets/data/map1.js";
import Bus from '../store/bus'
export default {
    name: "Map",
    data: function() {
        return {
            houses: {
                广陵邑: map1houses,
            },
            currentmap: this.map || "广陵邑",
        };
    },
    computed: {
        map : function (){
            return this.$store.state.map  
        },
        housegroup: function() {
            return this.houses[this.currentmap];
        },
        visible : function (){
            return this.$store.state.map_visible
        }
    },
    methods: {
        close : function (){
            this.$store.commit('closeMap')
        },
        chooseHouse : function (val){
            this.$store.commit('closeMap')
            this.$router.push({'name':'index'})
            Bus.$emit('chooseHouse',val)
        }
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/map.less";
</style>
