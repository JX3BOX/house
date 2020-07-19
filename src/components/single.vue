<template>
    <div class="m-single-box" :loading="loading">
        <header class="m-single-header">
            <div class="m-single-coord">
                <i v-if="isOriginal" class="u-original">原创</i> 
                <span class="u-server">{{ meta.server || "未知服" }}</span>
                <span class="u-map">{{ post.post_subtype || "未知" }}</span>
                <span class="u-area">{{ meta.line || "未知" }}线</span>
                <span class="u-num">{{ meta.num || "未知" }}号</span>
            </div>

            <div class="m-single-info">
                <!-- 用户名 -->
                <div class="u-author u-sub-block">
                    <i class="u-icon-author2"
                        ><img svg-inline src="../assets/img/author.svg"
                    /></i>
                    <a class="u-name" :href="authorLink">{{ author.name }}</a>
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

                <!-- 查看次数 -->
                <span class="u-views u-sub-block">
                    <i class="el-icon-view"></i>
                    {{ stat.views }}
                </span>

                <!-- 编辑 -->
                <a class="u-edit u-sub-block" :href="editLink" v-if="showEdit">
                    <i class="u-icon-edit el-icon-edit-outline"></i>
                    <span>编辑</span>
                </a>
            </div>

        </header>

        <div class="m-single-meta">
            <div class="m-single-showbox">
                <div class="m-single-title">
                    {{ post.post_title || "无名居" }}
                </div>
                <div class="m-single-excerpt">
                    {{ post.post_excerpt || '无名游于天地间。'}}
                </div>
                <house class="m-single-pics"
                    :data="meta.pics"
                    v-if="meta.pics && meta.pics.length"
                    mode="single"
                />
            </div>

            <div class="m-house-action">
                <Like
                    class="u-like"
                    mode="heart"
                    :count="stat.likes"
                    :showCount="true"
                    txt="Like!!"
                />
            </div>

            <div class="m-house-data" v-if="meta.hasData && meta.blueprint">
                <el-table :data="meta.blueprint" v-if="meta.blueprint.length">
                    <el-table-column prop="type" label="蓝图类型">
                    </el-table-column>
                    <el-table-column prop="desc" label="蓝图说明">
                    </el-table-column>
                    <el-table-column prop="file" label="蓝图下载">
                        <template slot-scope="scope">
                            <Down
                                v-if="scope.row.file"
                                classes="u-down el-button el-button--primary el-button--small"
                                :url="scope.row.file"
                                :showCount="true"
                                :count="stat.downs"
                            />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="m-single-post">
            <el-divider content-position="left">JX3BOX</el-divider>
            <div class="m-single-content">
                <Article :content="post.post_content"/>
            </div>
        </div>

        <div class="m-single-append">
            <!-- 操作 -->
            <div class="m-single-panel" v-if="!loading">
                <div class="u-minigroup">
                    <!-- <Print class="u-fn" :title="title"/> -->
                    <QRcode class="u-fn" />
                    <Sharing class="u-fn" :title="title" :pic="srcList[0]"/>
                </div>
                <Fav />
            </div>
        </div>

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
import Article from '@jx3box/jx3box-editor/src/Article.vue'
import house from "@/components/house";
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
import { getStat, postStat } from "../service/stat.js";

export default {
    name: "single",
    props: [],
    data: function() {
        return {
            post: {},
            stat: {},
            meta: {},
            author: {},
            loading: false,
            url: location.href,
            data: [],
            showViewer: false,
        };
    },
    computed: {
        isOriginal:function (){
            return !!~~_.get(this.post, "original")
        },
        ready: function() {
            return this.$store.state.status;
        },
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
        srcList: function() {
            let arr = [];
            if (!this.meta.pics || !this.meta.pics.length) return [];
            this.meta.pics.forEach((val) => {
                arr.push(resolveImagePath(val.url));
            });
            return arr;
        },
        title : function (){
            return _.get(this.post,'post_title') || '无标题' 
        },
    },
    methods: {
        onPreview(el) {
            this.showViewer = true;
        },
        closeViewer() {
            this.showViewer = false;
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
    },
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post = this.$store.state.post =
                        res.data.data.post || {};
                    this.meta = this.$store.state.meta =
                        res.data.data.post.post_meta || {};
                    this.author = this.$store.state.author =
                        res.data.data.author || {};
                    this.$store.state.status = true;
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat(this.id).then((data) => {
                if (data) this.stat = this.$store.state.stat = data;
            });
            postStat(this.id);
        }
    },
    components: {
        Article,
        house,
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
@import "../assets/css/house.less";
</style>
