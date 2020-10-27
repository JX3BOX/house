<template>
    <div class="m-archive m-blueprint">
        <!-- 搜索 -->
        <div class="m-archive-search m-blueprint-search">
            <el-input
                placeholder="请输入搜索条件"
                v-model="search"
                class="input-with-select"
                @change="commitSearch"
            >
                <el-select
                    v-model="searchType"
                    slot="prepend"
                    placeholder="请选择"
                    @change="commitSearch"
                >
                    <el-option label="房号" value="meta_1"></el-option>
                    <el-option label="面积" value="meta_2"></el-option>
                    <el-option label="关键词" value="search"></el-option>
                </el-select>
                <el-switch
                    class="u-switch u-hasdata"
                    slot="append"
                    v-model="hasData"
                    active-color="#13ce66"
                    inactive-text="只看有蓝图"
                    @change="commitSearch"
                >
                </el-switch>
            </el-input>
        </div>
        <!-- 筛选 -->
        <div class="m-archive-order">
            <a
                :href="publish_url"
                class="u-publish el-button el-button--primary el-button--small"
                >+ 发布房屋蓝图</a
            >

            <!-- meta过滤 -->
            <div class="u-filter" :class="{ on: areas_visible }">
                <span class="u-label" @click="showAreas">
                    <span class="u-current-order"
                        ><i class="el-icon-collection-tag"></i>
                        {{ area || "全部" }}</span
                    >
                    <span class="u-toggle">
                        <i class="el-icon-arrow-down"></i>
                        <i class="el-icon-arrow-up"></i>
                    </span>
                </span>
                <span class="u-options">
                    <span
                        class="u-mode u-all"
                        :class="{ on: area == '' }"
                        @click="filterArea('')"
                        ><i class="el-icon-collection-tag"></i> 全部面积</span
                    >
                    <span
                        class="u-mode"
                        :class="{ on: area == 7200 }"
                        @click="filterArea(7200)"
                        ><i class="el-icon-collection-tag"></i> 7200平米</span
                    >
                    <span
                        class="u-mode"
                        :class="{ on: area == 4032 }"
                        @click="filterArea(4032)"
                        ><i class="el-icon-collection-tag"></i> 4032平米</span
                    >
                    <span
                        class="u-mode"
                        :class="{ on: area == 2240 }"
                        @click="filterArea(2240)"
                        ><i class="el-icon-collection-tag"></i> 2240平米</span
                    >
                    <span
                        class="u-mode"
                        :class="{ on: area == 1280 }"
                        @click="filterArea(1280)"
                        ><i class="el-icon-collection-tag"></i> 1280平米</span
                    >
                </span>
                <span class="u-options u-range">
                    <i class="el-icon-crop"></i>
                    <span class="u-range-label">等级</span>
                    <el-input
                        class="u-range-value u-min"
                        v-model="min_level"
                        placeholder="1"
                        size="mini"
                        @change="commitSearch"
                    ></el-input>
                    <span class="u-line"> - </span>
                    <el-input
                        class="u-range-value u-max"
                        v-model="max_level"
                        placeholder="15"
                        size="mini"
                        @change="commitSearch"
                    ></el-input>
                </span>
            </div>

            <!-- 排序 -->
            <div class="u-modes">
                <span
                    class="u-mode u-update"
                    :class="{ on: order == 'update' }"
                    icon="el-icon-refresh"
                    size="small"
                    plain
                    @click="reorder('update')"
                    ><i class="el-icon-refresh"></i> 最后更新</span
                >
                <span
                    class="u-mode u-podate"
                    :class="{ on: order == 'podate' }"
                    icon="el-icon-sort"
                    size="small"
                    plain
                    @click="reorder('podate')"
                    ><i class="el-icon-sort"></i> 最早发布</span
                >
                <!-- <span class="u-mode u-likes" :class="{on:order=='likes'}" icon="el-icon-star-off" size="small" plain @click="reorder('likes')"><i class="el-icon-star-off"></i> 点赞最多</span>
                <span class="u-mode u-downs" :class="{on:order=='downs'}" icon="el-icon-download" size="small" plain @click="reorder('downs')"><i class="el-icon-download"></i> 下载最多</span> -->
            </div>
        </div>

        <!-- 列表 -->
        <div class="m-blueprint-list" v-if="data.length">
            <el-row :gutter="20" v-loading="loading">
                <el-col :span="4" v-for="(item, i) in data" :key="i">
                    <el-card class="u-card">
                        <div class="u-item" @click=preview(item) title="点击快速预览">
                            <i class="u-pic">
                                <img
                                    class="u-img"
                                    :src="meta(item, 'pics') | showHousepic"
                                    :alt="item.post.post_title"
                                    loading="lazy"
                                />

                                <span class="u-pos">
                                    <i class="u-coord el-icon-map-location"></i>
                                    <em class="u-num">{{
                                        meta(item, "num")
                                            ? meta(item, "num")
                                            : "未知"
                                    }}</em
                                    >号 ／
                                    <em>{{
                                        meta(item, "server") || "未知"
                                    }}</em>
                                    -
                                    <em>{{
                                        meta(item, "line")
                                            ? meta(item, "line")
                                            : "未知"
                                    }}</em
                                    >线
                                </span>

                                <em class="u-map">{{
                                    item.post.post_subtype
                                }}</em>
                            </i>
                        </div>

                        <a
                            class="u-title"
                            :href="item.post.ID | postLink"
                            :target="target"
                        >
                            <span
                                class="u-blueprint on"
                                v-if="
                                    item.post.post_meta &&
                                        item.post.post_meta.hasData
                                "
                                ><i class="el-icon-s-home"></i>有蓝图</span
                            >
                            <span class="u-blueprint" v-else
                                ><i class="el-icon-s-home"></i>无蓝图</span
                            >
                            <span class="u-text">{{
                                item.post.post_title || "无标题"
                            }}</span>
                        </a>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!-- 为空 -->
        <el-alert
            v-else
            class="m-archive-null"
            title="没有找到相关条目"
            type="info"
            center
            show-icon
        >
        </el-alert>
        <!-- 下一页 -->
        <el-button
            class="m-archive-more"
            :class="{ show: hasNextPage }"
            type="primary"
            :loading="loading"
            @click="appendPage(++page)"
            >加载更多</el-button
        >
        <!-- 分页 -->
        <el-pagination
            class="m-archive-pages"
            :page-size="per"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>

        <!-- 预览区 -->
        <el-drawer :visible.sync="drawer" direction="ttb" :append-to-body="true" title="点击当前图片可放大预览" class="m-archive-preview">

            <div class="u-title">{{focus.post_title}}</div>

            <house :data="focusdata" mode="list"/>

            <p class="u-details" v-if="focus" >
                <span class="u-server"><em>区服</em><b>{{ focus.post_meta.server || "未知服" }}</b></span>
                <span class="u-map"><em>地图</em><b>{{ focus.post_subtype || "未知" }}</b></span>
                <span class="u-line"><em>分线</em><b>{{ focus.post_meta.line || "未知" }}线</b></span>
                <span class="u-num"><em>房号</em><b>{{ focus.post_meta.num || "未知" }}号</b></span>
                <span class="u-area"><em>面积</em><b>{{ focus.post_meta.area || "未知" }}平米</b></span>
                <span class="u-level"><em>等级</em><b>{{ focus.post_meta.level || "未知" }}级</b></span>
            </p>

            <a v-if="focus" :href="focus.ID | postLink" :target="target" class="u-btn el-button el-button--primary" @click="skip"><i class="el-icon-copy-document"></i> 查看详情</a>
        </el-drawer>
    </div>
</template>

<script>
import { getPosts } from "../service/post";
import {
    authorLink,
    publishLink,
    showAvatar,
    resolveImagePath,
    buildTarget,
    postLink
} from "@jx3box/jx3box-common/js/utils";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import lodash from "lodash";
import Bus from "../store/bus";
import house from '@/components/house'

export default {
    name: "Index",
    props: [],
    data: function() {
        return {
            loading: false, //加载状态

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 40, //每页条目
            order: "", //排序模式

            search: "", //搜索
            searchType: "search", //搜索类型

            hasData: false,

            areas_visible: false,
            area: "",
            min_level: "",
            max_level: "",

            drawer: false,

            focusdata : '',
            focus : '',
            isMobile : window.innerWidth < 1025
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        subtype: function() {
            return this.$store.state.subtype;
        },
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
            };
            if (this.search) {
                params[this.searchType] = this.search;
            }
            if (this.hasData) {
                params.meta_3 = "1";
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.area) {
                params.meta_2 = this.area;
            }
            if (this.min_level) {
                params.range = 1;
                params.min = this.min_level;
            }
            if (this.max_level) {
                params.range = 1;
                params.max = this.max_level;
            }
            return params;
        },
        publish_url: function(val) {
            return publishLink("house");
        },
        target: function() {
            return buildTarget();
        },
    },
    filters: {
        authorLink: function(val) {
            return authorLink(val);
        },
        showAvatar: function(val) {
            return showAvatar(val);
        },
        postLink: function(val) {
            return "./?pid=" + val;
        },
        dateFormat: function(val) {
            return dateFormat(val);
        },
        showHousepic: function(val) {
            if (val && val.length) {
                return (
                    resolveImagePath(val[0]["url"]) +
                    "?x-oss-process=style/house_thumb"
                );
            } else {
                return __ossMirror + "static/house/img/thumb/1.jpg";
            }
        },
    },
    methods: {
        meta: function(item, key) {
            return lodash.get(item["post"]["post_meta"], key);
        },
        loadPosts: function(i = 1, append = false) {
            let query = Object.assign(this.params, {
                page: i,
            });
            this.loading = true;
            getPosts(query, this)
                .then((res) => {
                    if (append) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        window.scrollTo(0, 0);
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        appendPage: function(i) {
            this.loadPosts(i, true);
        },
        changePage: function(i) {
            this.loadPosts(i);
        },
        commitSearch: function() {
            this.loadPosts();
        },
        reorder: function(val) {
            this.order = val;
            this.loadPosts();
        },
        filterArea: function(val) {
            this.area = val;
            this.loadPosts();
        },
        showAreas: function() {
            this.areas_visible = !this.areas_visible;
        },
        preview: function(item) {
            if(this.isMobile){
                location.href = postLink('house',item.post.ID)
            }else{
                this.drawer = true;
                this.focus = item.post
                this.focusdata = item.post.post_meta.pics
            }
        },
        skip : function (){
            // this.drawer = false;
        }
    },
    watch : {
        subtype : function (){
            this.loadPosts(1);
        }
    },
    mounted: function() {
        this.loadPosts(1);
    },
    created: function() {
        Bus.$on("chooseHouse", (val) => {
            this.searchType = "meta_1";
            this.search = val;
            this.commitSearch();
        });
    },
    components: {
        house
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
