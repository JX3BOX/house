<template>
    <div class="m-blueprint">
        <div class="m-blueprint-list" v-if="data.length">
            <el-row :gutter="20" v-loading="loading">
                <el-col :span="6" v-for="(item, i) in data" :key="i"
                    ><div class="u-item">
                        <a class="u-pic" :href="item.post.ID | postLink"
                            ><i class="u-img"
                                ><img
                                    :src="meta(item, 'pics') | showHousepic"
                                    :alt="item.post.post_title"/></i
                            ><i class="u-map">{{ meta(item, "map") }}</i></a
                        >
                        <span class="u-pos"
                            >坐标 :
                            <em>{{ meta(item, "server") || "未知" }}</em> -
                            <em>{{
                                meta(item, "area")
                                    ? meta(item, "area") + "线"
                                    : "未知"
                            }}</em>
                            -
                            <em>{{
                                meta(item, "num")
                                    ? meta(item, "num") + "号"
                                    : "未知"
                            }}</em></span
                        >
                        <a class="u-title" :href="item.post.ID | postLink">
                            <span
                                class="u-blueprint"
                                v-if="
                                    item.post.post_meta &&
                                        item.post.post_meta.hasData
                                "
                                ><i class="el-icon-s-home"></i>蓝图</span
                            >
                            <span class="u-text">{{
                                item.post.post_title || "无标题"
                            }}</span>
                        </a>
                    </div></el-col
                >
            </el-row>
        </div>
        <el-alert
            v-else
            class="m-archive-null"
            title="没有找到相关条目"
            type="info"
            center
            show-icon
        >
        </el-alert>
        <el-button
            class="m-archive-more"
            :class="{ show: hasNextPage }"
            type="primary"
            :loading="loading"
            @click="appendPage(++page)"
            >加载更多</el-button
        >
        <el-pagination
            class="m-archive-pages"
            :page-size="24"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
        <RightSidebar>
            <list_side />
        </RightSidebar>
    </div>
</template>

<script>
import { getPosts } from "../service/post";
import {
    authorLink,
    showAvatar,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import lodash from "lodash";
import list_side from "@/components/list_side.vue";
export default {
    name: "Index",
    props: [],
    data: function() {
        return {
            data: [],
            page: 1,
            total: 1,
            pages: 1,
            loading: false,
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        subtype: function() {
            return this.$store.state.subtype;
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
            if (val.length) {
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
        loadPosts: function(i,append=false) {
            getPosts(
                {
                    page: i,
                    per: 24,
                    subtype: this.subtype,
                },
                this
            )
                .then((res) => {
                    if(append){
                        this.data = this.data.concat(res.data.data.list);
                    }else{
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
            this.loading = true;
            this.loadPosts(i,true)
        },
        changePage: function(i) {
            this.loading = true;
            this.loadPosts(i)
        },
    },
    mounted: function() {
        this.loadPosts(1)
    },
    components: {
        list_side,
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
