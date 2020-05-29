<template>
    <div class="m-single-box" v-if="!loading" :loading="loading">
        <header class="m-single-header">
            <div class="m-single-title">
                <!-- 标题 -->
                <a class="u-title u-sub-block" :href="url">{{
                    post.post_title
                }}</a>
            </div>

            <div class="m-single-info">
                <!-- 用户名 -->
                <div class="u-author u-sub-block">
                    <i class="u-icon-author2"
                        ><img svg-inline src="../assets/img/author.svg"
                    /></i>
                    <a class="u-name" :href="authorLink">{{ author.name }}</a>
                </div>

                <!-- tags -->
                <div class="u-meta u-sub-block" v-if="post.post_subtype == '1'">
                    <em class="u-label">标签</em>
                    <span class="u-value">
                        {{ format(post.post_meta, "tag") }}
                    </span>
                </div>

                <!-- 发布日期 -->
                <span class="u-podate u-sub-block" title="发布日期">
                    <i class="u-icon-podate"
                        ><img svg-inline src="../assets/img/podate.svg"
                    /></i>
                    <time>{{ post.post_date | dateFormat }}</time>
                </span>

                <!-- 最后更新时间 -->
                <span class="u-modate u-sub-block" title="最后更新">
                    <i class="u-icon-modate"
                        ><img svg-inline src="../assets/img/modate.svg"
                    /></i>
                    <time>{{ post.post_modified | dateFormat }}</time>
                </span>

                <!-- 编辑 -->
                <a class="u-edit u-sub-block" :href="editLink" v-if="showEdit">
                    <i class="u-icon-edit el-icon-edit-outline"></i>
                    <span>编辑</span>
                </a>
            </div>

            <div class="m-single-panel">
                <!-- 收藏 -->
                <Fav />
                <el-button
                    size="mini"
                    type="primary"
                    disabled
                    title="即将推出.."
                    ><i class="el-icon-bell"></i><span>订阅</span></el-button
                >
            </div>
        </header>

        <div class="m-single-meta">
        </div>

        <div class="m-single-prepend">
            <div class="m-single-excerpt" v-if="post.post_excerpt">
                <el-divider content-position="left">Excerpt</el-divider>
                {{ post.post_excerpt }}
            </div>
        </div>

        <div class="m-single-post">
            <el-divider content-position="left">JX3BOX</el-divider>
            <div class="m-single-content">
                <Article
                    :content="post.post_content"
                    directorybox="#directory"
                />
            </div>
        </div>

        <div class="m-single-append"></div>

        <div class="m-single-comment">
            <el-divider content-position="left">评论</el-divider>
            <Comment :post-id="id" />
        </div>

        <footer class="m-single-footer">
            <!-- <ins
                class="adsbygoogle"
                style="display:block;max-width:100%;overflow:hidden;margin:10px;"
                data-ad-client="ca-pub-4388499329141185"
                data-ad-slot="1787190081"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins> -->
        </footer>
    </div>
</template>

<script>
import lodash from "lodash";
import { getPost } from "../service/post";
import dateFormat from "../utils/dateFormat";
import { __Links } from "@jx3box/jx3box-common/js/jx3box.json";
import {
    authorLink,
    editLink,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils.js";
import User from "@jx3box/jx3box-common/js/user.js";
import { fn } from "moment";
import { jx3dat_types } from "@jx3box/jx3box-common/js/types.json";

export default {
    name: "single",
    props: [],
    data: function() {
        return {
            post: {},
            setting: {},
            meta: {},
            author: {},
            loading: true,
            url: location.href,
            data: [],
            typemap: jx3dat_types,
        };
    },
    computed: {
        authorLink: function() {
            return authorLink(this.author.uid);
        },
        editLink: function() {
            return editLink(this.post.post_type, this.post.ID);
        },
        id: function() {
            return this.$store.state.pid;
        },
        showEdit: function() {
            return (
                this.post.post_author == User.getInfo().uid ||
                User.getInfo().group > 60
            );
        },
        typename: function() {
            return this.typemap[this.post.post_subtype];
        },
        cansee: function() {
            return (
                User.getInfo().group >= 64 ||
                User.getInfo().uid == this.author.uid
            );
        },
        subtype : function(){
            return this.post.post_subtype || '1'
        }
    },
    methods: {
        format: function(parent, key) {
            let val = lodash.get(parent, key);
            if (Array.isArray(val)) {
                return val.toString();
            } else {
                return val;
            }
        },
        onCopy: function(val) {
            this.$notify({
                title: "订阅号复制成功",
                message: "复制内容 : " + val.text,
                type: "success",
            });
        },
        onError: function() {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        highlight: function(item) {
            const colormap = {
                newbie: "#49c10f",
                advanced: "#fba524",
                recommended: "#cb91ff",
                geek: "#fc3c3c",
            };
            if (item.mark) {
                return colormap[item.mark[0]];
            }
            return "#035cc1";
        },
        showDown: function(val) {
            return val && resolveImagePath(val);
        },
    },
    mounted: function() {
        if (this.$store.state.pid) {
            getPost(this.$store.state.pid, this).then((res) => {
                this.post = this.$store.state.post = res.data.data.post || {};
                this.meta = this.$store.state.meta =
                    res.data.data.post.post_meta || {};
                this.author = this.$store.state.author =
                    res.data.data.author || {};
                this.data = (this.meta && this.meta.data) || [];
                this.$store.state.status = true;

                this.loading = false;
            });
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
// @import "../assets/css/meta.less";
</style>
