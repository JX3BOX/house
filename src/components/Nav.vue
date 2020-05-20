<template>
    <nav class="m-nav">
        <div class="m-nav-btn">
            <el-button type="primary" @click="gotoPage('/fullhouse')" v-if="currentRoute === '/'">蓝图分享</el-button>
            <el-button type="primary" @click="gotoPage('/partial')" v-if="currentRoute.includes('fullhouse')">局部蓝图</el-button>
            <el-button type="primary" @click="gotoPage('/fullhouse')" v-if="currentRoute.includes('partial')">全屋蓝图</el-button>
        </div>
        
        <div class="m-nav-jump">
            <h4>分类导航</h4>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <el-tree :render-content="renderContent" :data="data" :props="defaultProps" :filter-node-method="filterNode" ref="tree"></el-tree>
        </div>

        <div class="m-nav-doc">
            <h4>常用文档</h4>
            <ul>
                <li><el-link icon="el-icon-document" :underline="false">如何建造房屋</el-link></li>
                <li><el-link icon="el-icon-document" :underline="false">房屋陈设如何选择</el-link></li>
                <li><el-link icon="el-icon-document" :underline="false">建设中的问题及解决办法</el-link></li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'Nav',
    data: function() {
        return {
            filterText: '',
            data: [
                {
                    label: '广陵邑',
                    count: 652,
                    children: [{ label: '7200平米', count: 111 }, { label: '4032平米', count: 122 }, { label: '2240平米', count: 51 }, { label: '1280平米', count: 88 }]
                },
                { label: '望扬镇', count: 0 },
                { label: '九寨沟', count: 0 },
                { label: '七秀', count: 0 }
            ],
            defaultProps: { children: 'children', label: 'label' }
        };
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    computed: {
        currentRoute() {
            return this.$route.path
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        gotoPage(path) {
            this.$router.push(path)
        },
        renderContent(h, { node, data, store }) {
            return (
                <span class="el-tree-node__label">
                    {' '}
                    <span class="u-name">{node.label}</span>
                    <em class="u-count">({data.count})</em>{' '}
                </span>
            );
        }
    },
    mounted: function() {}
};
</script>

<style lang="less" scoped>
h4 {
    .mb(1em);
    font-weight: bolder;
}
.m-nav-btn {
    text-align: center;
    .mt(1em);
    button {
        .w(100%);
    }
}
.m-nav-doc {
    ul {
        .mt(0);
        padding-inline-start: 10px;
    }
    li {
        list-style: none;
    }
}
</style>
