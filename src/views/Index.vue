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
                >
                    <el-option label="房号" value="meta_1"></el-option>
                    <el-option label="面积" value="meta_2"></el-option>
                    <el-option label="作者" value="authorname"></el-option>
                    <el-option label="标题" value="title"></el-option>
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
        <!-- 排序 -->
        <div class="m-archive-order">
            <a :href="publish_url" class="u-publish el-button el-button--primary el-button--small">+ 发布房屋/蓝图</a>
            <div class="u-modes">
                <span class="u-mode u-update" :class="{on:order=='update'}" icon="el-icon-refresh" size="small" plain @click="reorder('update')"><i class="el-icon-refresh"></i> 最后更新</span>
                <span class="u-mode u-podate" :class="{on:order=='podate'}" icon="el-icon-sort" size="small" plain @click="reorder('podate')"><i class="el-icon-sort"></i> 最早发布</span>
                <span class="u-mode u-likes" :class="{on:order=='favs'}" icon="el-icon-star-off" size="small" plain @click="reorder('favs')"><i class="el-icon-star-off"></i> 点赞最多</span>
                <span class="u-mode u-downs" :class="{on:order=='downs'}" icon="el-icon-download" size="small" plain @click="reorder('downs')"><i class="el-icon-download"></i> 下载最多</span>
            </div>
        </div>
        <!-- 列表 -->
        <div class="m-blueprint-list" v-if="data.length">
            <el-row :gutter="20" v-loading="loading">
                <el-col :span="6" v-for="(item, i) in data" :key="i">
                    <el-card class="u-card">
                        <a
                            class="u-item"
                            :href="item.post.ID | postLink"
                            :target="target"
                        >
                            <i class="u-pic">
                                <img
                                    class="u-img"
                                    :src="meta(item, 'pics') | showHousepic"
                                    :alt="item.post.post_title"
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

                            <span class="u-title">
                                <span class="u-blueprint on" v-if="item.post.post_meta && item.post.post_meta.hasData"><i class="el-icon-s-home"></i>有蓝图</span>
                                <span class="u-blueprint" v-else><i class="el-icon-s-home"></i>无蓝图</span>
                                <span class="u-text">{{
                                    item.post.post_title || "无标题"
                                }}</span>
                            </span>
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
    </div>
</template>

<script>
import { getPosts } from "../service/post";
import {
    authorLink,
    publishLink,
    showAvatar,
    resolveImagePath,
    buildTarget
} from "@jx3box/jx3box-common/js/utils";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import lodash from "lodash";
import Bus from '../store/bus'

export default {
    name: "Index",
    props: [],
    data: function() {
        return {
            loading: false, //加载状态

            data: [],   //数据列表
            page: 1,    //当前页数
            total: 1,   //总条目数
            pages: 1,   //总页数
            per : 16,   //每页条目
            order : '', //排序模式

            search: "", //搜索
            searchType: "meta_1",   //搜索类型

            hasData: false,
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
                params.meta_3 = '1';
            }
            if(this.order){
                params.order = this.order
            }
            return params;
        },
        publish_url: function(val) {
            return publishLink('house')
        },
        target : function (){
            return buildTarget()
        }
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
        reorder : function (val){
            this.order = val
            this.loadPosts()
        }
    },
    mounted: function() {
        this.loadPosts(1);
    },
    created : function (){
        Bus.$on('chooseHouse',(val) => {
            this.searchType = 'meta_1'
            this.search = val
            this.commitSearch()
        })
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
