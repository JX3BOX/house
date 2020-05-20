<template>
    <div class="m-info">
        街南绿树春饶絮，雪满游春路。树头花艳杂娇云，树底人家朱户。
    </div>
</template>
<script>
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {}
};
</script>

<style lang="less">
.m-info {
}
@media screen and (max-width:@ipad){
    .m-info{
        .u-stat{
            white-space:nowrap;
            overflow:auto;
        }
    }
}
</style>
