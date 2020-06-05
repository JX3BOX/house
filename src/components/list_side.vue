<template>
    <div class="m-extend-list">
        <RightSideMsg>
            <em>家园玩法交流群</em> :
            <strong
                ><a href="https://jq.qq.com/?_wv=1027&k=InbtJGcw"
                    >658035079</a
                ></strong
            >
        </RightSideMsg>
        <div class="m-side-rank">
            <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/rank.svg"
                />最高花价
                <a href="/house#/flower" class="m-flower-rec-more"
                    >查看更多<i class="el-icon-d-arrow-right"></i
                ></a>
            </h3>
            <el-select
                class="m-flower-rec-select"
                v-model="server"
                filterable
                placeholder="梦江南"
                size="small"
                @change="changeServer"
            >
                <el-option
                    v-for="item in servers"
                    :key="item"
                    :label="item"
                    :value="item"
                >
                </el-option>
            </el-select>
            <el-table class="m-flower-rec-list" 
                :data="data"
            >
                <el-table-column prop="name" label="品种" sortable width="100">
                </el-table-column>
                <el-table-column prop="price" label="价格" sortable width="75">
                </el-table-column>
                <el-table-column prop="line" label="分线" width="70"></el-table-column>
            </el-table>
        </div>
        <div class="m-side-links">
            <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/puzzle.svg"
                />相关链接
            </h3>
            <div class="c-sidebar-right-list">
                <a
                    class="u-item"
                    href="https://www.jx3box.com/tool/13948/"
                    target="_blank"
                    >如何导出家园蓝图？</a
                >
            </div>
        </div>

        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
import { getHighestPrice } from "../service/flower";
import servers from "@jx3box/jx3box-data/data/server/server_list.json";
import flower_types from "../assets/data/flower_types.json";
export default {
    name: "list_side",
    props: [],
    data: function() {
        return {
            focus: 0,
            subnav: ["趋势榜", "7日下载榜", "30日下载榜"],
            data: [],
            loading: false,
            server: "",
            servers,
        };
    },
    computed: {},
    methods: {
        loadPrice(server) {
            this.loading = true;
            getHighestPrice(server).then((res) => {
                let data = res.data;
                let list = [];
                flower_types.forEach((name) => {
                    list.push({
                        name,
                        line: data[name]["line"],
                        price: ~~data[name]["price"],
                    });
                });
                this.data = list;
                this.loading = false;
            });
        },
        changeServer() {
            this.loadPrice(this.server);
        },
    },
    mounted: function() {
        this.loadPrice("梦江南");
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
