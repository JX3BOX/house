<template>
    <div class="m-house-map" v-show="visible">
        <div class="m-house-model">
            <div class="u-map">
                <img class="u-map-bg" :src="mapimg">
            </div>
            <div class="u-house">
                <el-tooltip
                    class="item"
                    effect="light"
                    placement="top"
                    v-for="(house, i) in housegroup"
                    :key="'house-' + i"
                >
                    <span slot="content" class="u-house-desc">
                        {{house.name}} <br/>
                        面积：{{house.area}} <br>
                        价格：{{house.price}}
                    </span>
                    <span
                        class="u-house-item"
                        :class="'u-house-index-' + i"
                        :style="buildStyle(house)"
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
import housedata from "@jx3box/jx3box-data/data/house/area.json";
import Bus from '../store/bus'
import {__ossMirror,__ossRoot} from '@jx3box/jx3box-common/js/jx3box.json'
export default {
    name: "Map",
    data: function() {
        return {
        };
    },
    computed: {
        map : function (){
            return this.$store.state.map  
        },
        housegroup: function() {
            return housedata[this.map];
        },
        visible : function (){
            return this.$store.state.map_visible
        },
        mapimg : function (){
            return __ossRoot + 'image/house/map/' + this.map + '.png'
        }
    },
    methods: {
        close : function (){
            this.$store.commit('closeMap')
        },
        chooseHouse : function (val){
            this.$store.commit('closeMap')
            if(this.$route.name != 'index') {
                this.$router.push({'name':'index'},function (){
                    Bus.$emit('chooseHouse',val)
                })
            }else{
                Bus.$emit('chooseHouse',val)
            }
        },
        buildStyle : function (house){
            let x = (house.x / 1024)*100 + '%'
            let y = (house.y / 896)*100 + '%'
            return {
                left : x,
                top : y
            }
        }
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/map.less";
</style>
