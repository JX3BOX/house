<template>
    <el-carousel class="m-house-pics" :interval="4000" :type="viewmode" v-if="pics.length" arrow="always">
        <el-carousel-item class="u-item" v-for="(item, i) in pics" :key="i">
            <div class="m-house-pic">
                <img 
                    v-photoswipe:single
                    :src="item.url | showImage"
                    class="u-pic"
                />
            </div>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
import house from '@/components/house'
import {
    authorLink,
    editLink,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils.js";
export default {
    name: "house",
    props: ["data",'mode'],
    data: function() {
        return {
            pics : this.data || [],
            viewmode : ""
        };
    },
    watch : {
        data : function (newdata){
            this.pics = newdata
        }
    },
    computed: {},
    methods: {
        
    },
    filters : {
        showImage: function(val) {
            return resolveImagePath(val);
        },
    },
    mounted: function() {
        let isMobile = window.innerWidth < 1025
        if(!isMobile) this.viewmode = 'card'
    },
    components: {
    },
};
</script>
