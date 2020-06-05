<template>
    <div class="m-flower">
        <h1 class="m-flower-title">全区服小区花价查询</h1>
        <el-divider class="m-flower-desc">精准数据·居家种田好帮手</el-divider>

        <div class="m-flower-search">
            <el-row>
                <el-col :span="7">
                    <el-select
                        class="u-server"
                        v-model="server"
                        filterable
                        placeholder="请输入服务器"
                    >
                        <el-option
                            v-for="item in servers"
                            :key="item"
                            :label="item"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-select
                        class="u-type"
                        v-model="type"
                        placeholder="请选择花型"
                    >
                        <el-option
                            v-for="item in types"
                            :key="item"
                            :label="item"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-select
                        class="u-level"
                        v-model="level"
                        placeholder="请选择级别"
                    >
                        <el-option
                            v-for="item in levels"
                            :key="item"
                            :label="item"
                            :value="item"
                        >
                            <span>{{ item }}</span>
                            <span> · {{ color(item) }}</span>
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <el-button
                        class="u-button"
                        type="primary"
                        icon="el-icon-search"
                        :disabled="isGuest"
                        @click="search"
                        >查询</el-button
                    >
                </el-col>
            </el-row>
        </div>
        <div class="m-flower-submit">
            <el-alert
                class="u-tip"
                v-if="isGuest"
                title="请先登录"
                type="info"
                show-icon
            ></el-alert>
        </div>
        <div class="m-flower-tip el-alert el-alert--info is-light">
            前往个人中心<a href="https://v2.jx3box.com/dashboard/#/profile" target="_blank">资料修改</a>可绑定默认区服，否则默认将使用上一次搜索区服
        </div>
        <div class="m-flower-box">
            <div class="m-flower-result" v-if="data.length">
                <el-table
                    :data="data"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                >
                    <el-table-column prop="server" label="服务器"
                        >{{ server }}
                    </el-table-column>
                    <el-table-column prop="map" label="地图分线">
                    </el-table-column>
                    <el-table-column prop="unit" label="数量" sortable>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" sortable>
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="时间"
                        sortable
                        :formatter="dateFormat"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <el-alert
                v-if="!data.length && done"
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
                :page-size="15"
                background
                :hide-on-single-page="true"
                @current-change="changePage"
                :current-page.sync="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import servers from "@jx3box/jx3box-data/data/server/server_list.json";
import User from "@jx3box/jx3box-common/js/user";
import { getFlowerPrice } from "../service/flower";
import dateFormat from "../utils/moment";
import {setServer,getServer} from '../service/server'
import colormap from '../assets/data/flower_colormap.json'

export default {
    name: "Flower",
    props: [],
    data: function() {
        return {
            servers,
            server: "",
            types: ["荧光菌", "绣球花", "玫瑰", "郁金香", "百合", "牵牛花"],
            type: "",
            level: "",
            colormap,
            data: [],
            total: 1,
            pages: 1,
            page: 1,
            loading: false,
            done: false,
        };
    },
    computed: {
        levels: function() {
            if (this.type) {
                return Object.keys(this.colormap[this.type]);
            }
            return [];
        },
        isGuest: function() {
            // return !User.isLogin();
            return false;
        },
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
    },
    methods: {
        color: function(level) {
            if (this.type) {
                return this.colormap[this.type][level];
            }
            return "";
        },
        check: function() {
            this.server = this.server || '梦江南'
            this.type = this.type || '荧光菌'
            this.level = this.level || '一级'
        },
        search: function() {
            this.check();

            this.page = 1; //复位
            this.loadData(1);
            setServer(this.server)
        },
        dateFormat: function(row, column) {
            return dateFormat(row.time * 1000);
        },
        loadData: function(i, append = false) {
            return getFlowerPrice({
                server: this.server,
                flower: this.level + this.type,
                pageIndex: i,
            })
                .then((res) => {
                    if (append) {
                        this.data = this.data.concat(res.data.data);
                    } else {
                        this.data = res.data.data;
                    }
                    this.total = res.data.page.total;
                    this.pages = res.data.page.pageTotal;
                })
                .then(() => {
                    this.$message({
                        message: "加载成功",
                        type: "success",
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        appendPage: function(i) {
            this.loading = true;
            this.loadData(i, true);
        },
        changePage: function(i) {
            this.loading = true;
            this.loadData(i).then(() => {
                window.scrollTo(0, 0);
            });
        },
    },
    filters: {},
    mounted: function() {
        getServer().then((server) => {
            if(server){
                this.server = server
            }
        })
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/flower.less";
</style>
