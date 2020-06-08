<template>
    <div class="m-house-map" v-show="visible">
        <div class="m-house-model">
            <div class="u-map">
                <img class="u-map-bg" :src="mapimg" :alt="currentmap">
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
import housedata from "../assets/data/housedata";
import Bus from '../store/bus'
import {__ossMirror} from '@jx3box/jx3box-common/js/jx3box.json'
export default {
    name: "Map",
    data: function() {
        return {
            houses : housedata,
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
        },
        mapimg : function (){
            return __ossMirror + 'image/map/' + this.currentmap + '.png'
        }
    },
    methods: {
        close : function (){
            this.$store.commit('closeMap')
        },
        chooseHouse : function (val){
            this.$store.commit('closeMap')
            if(this.$route.name != 'index') this.$router.push({'name':'index'})
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
