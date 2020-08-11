<template>
    <singlebox :post="post" :author="author" :stat="stat" v-loading="loading">
        <div class="m-single-meta">
            <div class="m-single-showbox">
                <house
                    class="m-single-pics"
                    :data="meta.pics"
                    v-if="meta.pics && meta.pics.length"
                    mode="single"
                />
                <div class="m-single-coord">
                    <span class="u-server">{{ meta.server || "未知服" }}</span>
                    <span class="u-map">{{ post.post_subtype || "未知" }}</span>
                    <span class="u-area">{{ meta.line || "未知" }}线</span>
                    <span class="u-num">{{ meta.num || "未知" }}号</span>
                </div>
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
    </singlebox>
</template>

<script>
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "../service/post.js";
import { getStat, postStat } from "../service/stat.js";
import house from "@/components/house";
import _ from "lodash";

export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,
            post: {},
            author: {},
            meta: {},
            data: [],
            stat: {},
            showViewer: false,
        };
    },
    computed: {
        id: function() {
            return this.$store.state.pid;
        },
        srcList: function() {
            let arr = [];
            if (!this.meta.pics || !this.meta.pics.length) return [];
            this.meta.pics.forEach((val) => {
                arr.push(resolveImagePath(val.url));
            });
            return arr;
        },
        title: function() {
            return _.get(this.post, "post_title") || "无标题";
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
        singlebox,
        house,
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
@import "../assets/css/house.less";
</style>
