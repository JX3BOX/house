<template>
    <div class="m-furniture">
        <!-- 父大类 -->
        <el-tabs
            class="m-furniture-type"
            v-model="type"
            type="card"
            @tab-click="handleTabChange"
        >
            <el-tab-pane label="全部" name="0"></el-tab-pane>
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
                    <div  v-bind:class="subCtgClass(subctg)"></div>
                    <!-- <img :src="`${imgurl}building/TY/TY_Base_M_pool01_AB200.png`" alt=""> -->
                    <span>{{ subctg.name }}</span>
                </li>
            </ul>
        </div>

        <!-- 内容列表区 :max-height="tableMaxHeight" -->
        <el-table
            class="m-furniture-list"
            :data="listData"
            style="width: 100%"
        >
            <el-table-column
                class="u-img"
                fixed
                prop="icon"
                label="预览"
                width="150"
            >
                <template slot-scope="prop">
                    <el-image
                        :images="{ url: getUrl(prop.row.attributes.img) }"
                        style="height: 80px"
                        :src="getUrl(prop.row.attributes.img)"
                        fit="contain"
                        v-if="prop.row.attributes.img"
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
                        class="u-haspop"
                        :content="prop.row.attributes.desc"
                        v-if="prop.row.attributes.desc && prop.row.attributes.desc !== ''"
                        :close-delay="20"
                        :open-delay="20"
                    >
                        <span
                            slot="reference"
                            style="border-bottom: 1px solid gray"
                            class="furniture-name"
                            :class="`quality-${prop.row.attributes.quality}`"
                            >{{ prop.row.attributes.name }}</span
                        >
                    </el-popover>
                    <span
                        class="furniture-name"
                        :class="`quality-${prop.row.attributes.quality}`"
                        v-else
                    >{{ prop.row.attributes.name }}</span>
                    <span
                        v-if="prop.row.attributes.interact"
                        class="furniture-indicator interactable"
                        title="可交互"
                    ></span>
                    <span
                        v-if="prop.row.attributes.scaleRange"
                        class="furniture-indicator scaleable"
                        title="可缩放"
                    ></span>
                </template>
            </el-table-column>
            <el-table-column
                prop="attributes.level"
                label="品质"
                sortable
                width="80"
            ></el-table-column>
            <el-table-column
                prop="attributes.limit"
                label="需求宅邸等级"
                sortable
                width="140"
            ></el-table-column>
            <el-table-column
                prop="attributes.beauty"
                label="观赏"
                sortable
                width="80"
            ></el-table-column>
            <el-table-column
                prop="attributes.practicality"
                label="实用"
                sortable
                width="80"
            ></el-table-column>
            <el-table-column
                prop="attributes.robustness"
                label="坚固"
                sortable
                width="80"
            ></el-table-column>
            <el-table-column
                prop="attributes.environment"
                label="风水"
                sortable
                width="80"
            ></el-table-column>
            <el-table-column
                prop="attributes.fun"
                label="趣味"
                sortable
                width="80"
            ></el-table-column>
            <el-table-column
                prop="attributes.price"
                label="价格"
                sortable
                width="80"
            ></el-table-column>
            <el-table-column
                prop="attributes.source"
                label="获取方式"
            ></el-table-column>
        </el-table>

        <!-- 筛选面板 -->
        <RightSidebar class="furniture-filter">
            <div class="note">来源</div>
            <el-select v-model="source" placeholder="请选择">
                <el-option
                    v-for="item in sourceList"
                    :key="item"
                    :label="item"
                    :value="item"
                >
                </el-option>
            </el-select>
            <div class="note">最大家园等级</div>
            <el-select v-model="maxLevel" placeholder="请选择">
                <el-option
                    v-for="level in levels"
                    :key="level"
                    :label="level + '级'"
                    :value="level"
                >
                </el-option>
            </el-select>
        </RightSidebar>
    </div>
</template>

<script>
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import typedata from "@/assets/data/furniture_types.json";
import { getFurnitures } from '../service/furniture';

export default {
    name: "Furniture",
    props: [],
    data: function() {
        return {
            type: '0', // 默认全部
            subCtg: undefined, // 默认全部
            hover: 0,
            typeData: [],
            listData: [],
            // tableMaxHeight: window.innerHeight - 371,

            // 图片
            imgurl: __ossMirror + "pic/furniture/",

            // 筛选
            source: "全部",
            sourceList: [
                "全部",
                "园宅币",
                "活动",
                "园宅会赛",
                "隐藏",
                "生活技能",
                "声望",
                "奇遇",
                "侠义值",
                "飞沙令",
                "名剑大会",
                "战阶",
                "师徒值",
                "管家",
                "宠物游历",
                "小区",
                "监本印文",
                "雀神点数",
                "江湖贡献值",
                "入住家园赠送",
                "商城",
                "副本",
                "未知",
            ],
            maxLevel: 15,
            levels: Array.from({ length: 15 }).map((_, i) => i + 1),
        };
    },
    watch: {
        maxLevel() {
            this.loadData();
        },
        source() {
            this.loadData();
        }
    },
    computed: {
        subCtgData() {
            return typedata[this.type] || [];
        },
        subCtgClass() {
            return (subctg) => {
                const category = +this.type * 10000 + subctg.id * 100;
                const tmpClass = {
                    "bg-1": subctg.attr.icon === "homelandbuildingfiltericon.png",
                    "bg-2": subctg.attr.icon === "homelandbuildingfiltericon2.png",
                };
                const type = category === this.subCtg
                    ? 'checked'
                    : category === this.hover ? 'hover' : 'normal';
                const x = subctg.attr[type] % 19;
                const y = Math.floor(subctg.attr[type] / 19);
                tmpClass[`sprite-${x}-${y}`] = true;
                return tmpClass;
            }

        }
    },
    methods: {
        handleHoverSubCtg(e, subctg) {
            this.hover = +this.type * 10000 + subctg.id * 100;
        },
        handleLeaveSubCtg(e, subctg) {
            // 调整图标
            this.hover = 0;
        },
        handleTabChange(tab) {
            if (tab.name === '0') {
                this.subCtg = undefined;
                this.loadData();
            }
        },
        handleSelectSubCtg(e, subctg) {
            // 调整图标
            this.subCtg = +this.type * 10000 + subctg.id * 100;
            this.loadData();
        },
        loadData() {
            getFurnitures({
                category: this.subCtg,
                source: this.source === '全部' ? undefined : this.source,
                limit: this.maxLevel,
            }).then((res) => {
                this.listData = res.data.data;
            });
        },
        getUrl(rawUrl) {
            return this.imgurl + rawUrl.replace('home/' ,'');
        },
    },
    mounted: function() {
        this.loadData();
    },
};
</script>

<style lang="less">
@import "../assets/css/furniture.less";
</style>
