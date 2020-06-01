<template>
    <div class="m-single-box" v-if="!loading" :loading="loading">
        <header class="m-single-header">
            <div class="m-single-title">
                <!-- 标题 -->
                <!-- <a class="u-title u-sub-block" :href="url">{{
                    post.post_title || '无标题'
                }}</a> -->
                <span class="u-server">{{ meta.server || "未知服" }}</span>
                <span class="u-map">{{ meta.map || "未知" }}</span>
                <span class="u-area">{{ meta.area || "未知" }}线</span>
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

                <!-- tags -->
                <!-- <div class="u-meta u-sub-block" v-if="post.post_subtype == '1'">
                    <em class="u-label">标签</em>
                    <span class="u-value">
                        {{ format(post.post_meta, "tag") }}
                    </span>
                </div> -->

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
                <!-- <el-button
                    size="mini"
                    type="primary"
                    disabled
                    title="即将推出.."
                    ><i class="el-icon-bell"></i><span>订阅</span></el-button
                > -->
            </div>
        </header>

        <div class="m-single-meta">
            <el-carousel
                class="m-house-pics"
                :interval="4000"
                type="card"
                height="400px"
                v-if="meta.pics && meta.pics.length"
            >
                <el-carousel-item
                    class="u-item"
                    v-for="(item, i) in meta.pics"
                    :key="i"
                >
                    <div
                        class="m-house-pics"
                        v-if="meta.pics && meta.pics.length"
                    >
                        <el-image :src="item.url" class="u-pic" @click="onPreview"></el-image>
                    </div>
                </el-carousel-item>
            </el-carousel>

            <el-image-viewer
                v-if="showViewer"
                :on-close="closeViewer"
                :url-list="srcList"
            />

            <div class="m-house-data" v-if="meta.hasData && meta.blueprint">
                <el-table :data="meta.blueprint" v-if="meta.blueprint.length">
                    <el-table-column prop="type" label="蓝图类型" width="180">
                    </el-table-column>
                    <el-table-column prop="desc" label="蓝图说明">
                    </el-table-column>
                    <el-table-column prop="file" label="蓝图下载" width="180">
                        <template slot-scope="scope">
                            <a
                                class="u-down el-button el-button--default el-button--small is-plain"
                                :href="scope.row.file"
                                ><i class="el-icon-download"></i>下载</a
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- <div class="m-single-prepend">
            <div class="m-single-excerpt" v-if="post.post_excerpt">
                <el-divider content-position="left">Excerpt</el-divider>
                {{ post.post_excerpt }}
            </div>
        </div> -->

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
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
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
// import list_side from "@/components/list_side.vue";

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
            showViewer: false,
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
        srcList: function() {
            let arr = [];
            if (!this.meta.pics || !this.meta.pics.length) return [];
            this.meta.pics.forEach((val) => {
                arr.push(val.url);
            });
            return arr;
        },
    },
    methods: {
        onPreview() {
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
    mounted: function() {
        if (this.$store.state.pid) {
            getPost(this.$store.state.pid, this).then((res) => {
                this.post = this.$store.state.post = res.data.data.post || {};
                this.meta = this.$store.state.meta =
                    res.data.data.post.post_meta || {};
                this.author = this.$store.state.author =
                    res.data.data.author || {};
                this.$store.state.status = true;

                this.loading = false;
            });
        }
    },
    components: {
        // list_side,
        ElImageViewer
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
@import "../assets/css/house.less";
</style>
