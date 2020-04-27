<template>
    <nav class="m-nav">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <el-tree
            :render-content="renderContent"
            :data="data"
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree"
        ></el-tree>
    </nav>
</template>

<script>
export default {
    name: "Nav",
    data: function() {
        return {
            filterText: "",
            data: [
                {
                    label: "广陵邑",
                    count: 652,
                    children: [
                        {
                            label: "7200平米",
                            count: 111,
                        },
                        {
                            label: "4032平米",
                            count: 122,
                        },
                        {
                            label: "2240平米",
                            count: 51,
                        },
                        {
                            label: "1280平米",
                            count: 88,
                        },
                    ],
                },
                {
                    label: "望扬镇",
                    count: 0,
                },
                {
                    label: "九寨沟",
                    count: 0,
                },
                {
                    label: "七秀",
                    count: 0,
                },
            ],
            defaultProps: {
                children: "children",
                label: "label",
            },
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    computed: {},
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        renderContent(h, { node, data, store }) {
            return (
                <span class="el-tree-node__label">
                    <span class="u-name">{node.label}</span>
                    <em class="u-count">({data.count})</em>
                </span>
            );
        },
    },
    mounted: function() {},
};
</script>

<style lang="less"></style>
