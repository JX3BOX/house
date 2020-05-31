<template>
    <div class="m-furniture">
        <!-- 父大类 -->
        <el-tabs class="m-furniture-type" v-model="activeName" type="card" @tab-click="changeTab">
            <el-tab-pane label="建筑" name="1"></el-tab-pane>
            <el-tab-pane label="家具" name="2"></el-tab-pane>
            <el-tab-pane label="景观" name="3"></el-tab-pane>
            <el-tab-pane label="收藏" name="4"></el-tab-pane>
        </el-tabs>

        <!-- 子类型，若干个ul组 -->
        <div class="m-furniture-subtype">
            <ul class="subctg">
                <li
                    v-for="subctg of subCtgData"
                    :key="subctg.name"
                    @mouseenter="handleHoverSubCtg($event, subctg)"
                    @mouseleave="handleLeaveSubCtg($event, subctg)"
                    @click="handleSelectSubCtg($event, subctg)"
                >
                    <div :class="setSubCtgClass(subctg)"></div>
                    <!-- <img :src="`${imgurl}building/TY/TY_Base_M_pool01_AB200.png`" alt=""> -->
                    <span>{{ subctg.name }}</span>
                </li>
            </ul>
        </div>

        <!-- 内容列表区 :max-height="tableMaxHeight" --> 
        <el-table class="m-furniture-list" :data="listData" style="width: 100%" :cell-style="setCellStyle">
            <el-table-column class="u-img" fixed prop="icon" label="预览" width="150">
                <template slot-scope="prop">
                    <el-image
                        style="height: 80px"
                        :src="`${imgurl}${prop.row.attr.img}`"
                        fit="contain"
                        v-if="prop.row.attr.img"
                    >
                    </el-image>
                    <div class="u-img-null" v-else>无</div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" sortable width="200">
                <template slot-scope="prop">
                    <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="prop.row.attr.desc"
                        v-if="prop.row.attr.desc && prop.row.attr.desc !== ''"
                        :close-delay="20"
                        :open-delay="20"
                    >
                        <span
                            slot="reference"
                            style="border-bottom: 1px solid gray"
                        >{{prop.row.name}}</span>
                    </el-popover>
                    <span v-else>{{prop.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="attr.QL" label="品质" sortable width="80"></el-table-column>
            <el-table-column prop="attr.levelLimit" label="需求宅邸等级" sortable width="140"></el-table-column>
            <el-table-column prop="attr.ornmnt" label="观赏" sortable width="80"></el-table-column>
            <el-table-column prop="attr.usblty" label="实用" sortable width="80"></el-table-column>
            <el-table-column prop="attr.firm" label="坚固" sortable width="80"></el-table-column>
            <el-table-column prop="attr.luck" label="风水" sortable width="80"></el-table-column>
            <el-table-column prop="attr.fun" label="趣味" sortable width="80"></el-table-column>
            <el-table-column prop="attr.price" label="价格" sortable width="80"></el-table-column>
            <el-table-column prop="attr.source" label="获取方式" ></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import fdata from "@/assets/data/furniture.json";
export default {
    name: "Furniture",
    props: [],
    data: function() {
        return {
            activeName: "1",
            imgurl: __ossMirror + "pic/furniture/",
            fdata: [],
            lastSubCtgElmnt: null,
            lastSubCtg: null,
            qualityArr: ["", "白色", "绿色", "蓝色", "紫色", "橙色"],
            tableMaxHeight: window.innerHeight - 371
        };
    },
    computed: {
        subCtgData() {
            for (let ctg of fdata) {
                if (ctg.id == this.activeName) {
                    return ctg.children;
                }
            }
            return null;
        },
        listData() {
            if (this.lastSubCtg === null) {
                return [];
            }
            return this.lastSubCtg.children;
        }
    },
    methods: {
        changeTab: function() {},
        loadTableData() {},
        setSubCtgClass(subctg) {
            let tmpClass = {
                "bg-1": subctg.attr.icon === "homelandbuildingfiltericon.png",
                "bg-2": subctg.attr.icon === "homelandbuildingfiltericon2.png"
            };
            tmpClass[
                `sprite-${subctg.attr.normal.x}-${subctg.attr.normal.y}`
            ] = true;
            return tmpClass;
        },
        handleHoverSubCtg(e, subctg) {
            // 调整图标
            if (e.target == this.lastSubCtgElmnt) {
                return;
            }
            e.target.children[0].classList.add(
                `sprite-${subctg.attr.hover.x}-${subctg.attr.hover.y}-important`
            );
        },
        handleLeaveSubCtg(e, subctg) {
            // 调整图标
            e.target.children[0].classList.remove(
                `sprite-${subctg.attr.hover.x}-${subctg.attr.hover.y}-important`
            );
        },
        handleSelectSubCtg(e, subctg) {
            // 调整图标
            if (this.lastSubCtg) {
                this.lastSubCtgElmnt.children[0].classList.remove(
                    `sprite-${this.lastSubCtg.attr.checked.x}-${this.lastSubCtg.attr.checked.y}-important`
                );
            }
            e.target.parentElement.children[0].classList.remove(
                `sprite-${subctg.attr.hover.x}-${subctg.attr.hover.y}-important`
            );
            e.target.parentElement.children[0].classList.add(
                `sprite-${subctg.attr.checked.x}-${subctg.attr.checked.y}-important`
            );
            this.lastSubCtg = subctg;
            this.lastSubCtgElmnt = e.target.parentElement;
        },
        setCellStyle({row, column, rowIndex, columnIndex}) {
            if (columnIndex == 1) {
                let quality = row.attr.quality
                let color = ''
                switch (quality) {
                    case 2:
                        color = '#00d24b'
                        break;
                    case 3:
                        color = '#007eff'
                        break;
                    case 4:
                        color = '#ff2dff'
                        break;
                    case 5:
                        color = '#ffa500'
                        break;
                    default:
                        color = 'black'
                        break;
                }
                return `color: ${color};`
            }
        }
    },
    mounted: function() {},
    components: {}
};
</script>

<style lang="less">
@import "../assets/css/furniture.less";
</style>
