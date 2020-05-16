<template>
    <div class="m-blueprint-list">
        <el-page-header @back="goBackHome" :content="isFullhouseOrNot ? '全屋蓝图页面' : '局部蓝图页面'" />
        <div class="search-wrapper">
            <el-input placeholder="请输入要搜索的蓝图名或作者名" v-model="searchKeyword" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <div class="filter-house-number">
                <i class="el-icon-location-outline"></i>
                <el-cascader
                    v-model="houseNumberFilterCascader"
                    :options="houseNumberFilterOptions"
                    :props="{ expandTrigger: 'hover', multiple: true, value: 'id' }"
                    placeholder="根据地皮编号精确搜索"
                    clearable
                    collapse-tags
                    :show-all-levels="true"
                    @change="handleHouseNumberFilterChange"
                >
                    <template slot-scope="{ node, data }">
                        <span style="float: left">{{ data.name ? data.name : data.label }}</span>
                        <span v-if="node.isLeaf" style="float: right; color: #8492a6; font-size: 13px">#{{ data.id }}</span>
                    </template>
                </el-cascader>
            </div>
            <div class="filter-outer-wrapper">
                <!-- <el-button slot="reference" icon="el-icon-s-operation" circle></el-button> -->
                <div class="filter-icon">
                    <i class="el-icon-s-operation"></i>
                    <el-divider direction="vertical"></el-divider>
                </div>
                <div class="filter-inner-wrapper">
                    <div class="filter-item filter-city">
                        <p class="filter-label">城市</p>
                        <el-select v-model="cityFilterSelect" placeholder="请选择城市">
                            <el-option v-for="city in cityFilterOptions" :key="city.id" :label="city.label" :value="city.id"></el-option>
                        </el-select>
                    </div>
                    <div class="filter-item filter-size">
                        <p class="filter-label">房屋大小</p>
                        <el-checkbox-group v-model="sizeFilterCheckbox">
                            <el-checkbox-button label="1200" class="u-house-area-1200"><p></p></el-checkbox-button>
                            <el-checkbox-button label="2080" class="u-house-area-2080"><p></p></el-checkbox-button>
                            <el-checkbox-button label="3640" class="u-house-area-3640"><p></p></el-checkbox-button>
                            <el-checkbox-button label="7000" class="u-house-area-7000"><p></p></el-checkbox-button>
                        </el-checkbox-group>
                    </div>
                    <div class="filter-item filter-level">
                        <p class="filter-label">家园等级</p>
                        <el-slider v-model="levelFilterSlider" range show-stops :min="1" :max="4" label="家园等级筛选滑块" :marks="levelFilterSliderMarks"></el-slider>
                    </div>
                </div>
            </div>
        </div>

        <div class="bluprint-list-wrapper">
            <el-card :body-style="{ padding: '20px' }" shadow="hover" v-for="item of 10" :key="item">
                <el-image
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    lazy
                    :preview-src-list="imgPreviewSrcList"
                    fit="cover"
                ></el-image>
                <div class="card-description-wrapper">
                    <div class="card-description-title">
                        <span>尽享荣华富贵的宏伟的美丽的巨大的埃及金字塔</span>
                    </div>
                    <div class="card-description-sub">
                        <span class="card-description-place">
                            <i class="el-icon-location" />
                            埃及 胡佛金字塔 7000m²
                        </span>
                        <div class="card-description-mid-bottom">
                            <span class="card-description-place">
                                <i class="el-icon-user-solid" />
                                耶律阿保机
                            </span>
                            <span class="card-description-time">
                                <i class="el-icon-time" />
                                2020年4月31日
                            </span>
                        </div>
                    </div>
                    <el-divider></el-divider>
                    <div class="card-description-tag-wrapper">
                        <div class="card-description-tag"><i class="el-icon-star-on"></i>58888</div>
                        <div class="card-description-tag"><i class="icon-self icon-like"></i>5888</div>
                        <div class="card-description-tag"><i class="icon-self icon-save"></i>2333</div>
                    </div>
                    <el-divider></el-divider>
                </div>
                <div class="card-download">
                    <i class="icon-self icon-download"></i><span>下载</span>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    label: 'BlueprintList',
    components: {
        // HelloWorld
    },
    data() {
        return {
            searchKeyword: '',
            houseNumberFilterCascader: [],
            houseNumberFilterOptions: [
                {
                    id: 0,
                    label: '广陵邑',
                    children: [
                        {
                            value: 'size1200',
                            label: '1200m²',
                            children: [
                                { id: '5', cityid: '455', label: '挂剑里四邻' },
                                { id: '15', cityid: '455', label: '清茨里一邻' },
                                { id: '24', cityid: '455', label: '吴亭里五邻' },
                                { id: '26', cityid: '455', label: '吴亭里七邻' },
                                { id: '27', cityid: '455', label: '襟江里一邻' },
                                { id: '32', cityid: '455', label: '襟江里六邻' }
                            ]
                        },
                        {
                            value: 'size2080',
                            label: '2080m²',
                            children: [
                                { id: '2', cityid: '455', label: '挂剑里一邻' },
                                { id: '4', cityid: '455', label: '挂剑里三邻' },
                                { id: '7', cityid: '455', label: '通寰里二邻' },
                                { id: '8', cityid: '455', label: '通寰里三邻' },
                                { id: '9', cityid: '455', label: '通寰里四邻' },
                                { id: '10', cityid: '455', label: '通寰里五邻' },
                                { id: '12', cityid: '455', label: '观桥里二邻' },
                                { id: '13', cityid: '455', label: '观桥里三邻' },
                                { id: '14', cityid: '455', label: '观桥里四邻' },
                                { id: '16', cityid: '455', label: '清茨里二邻' },
                                { id: '17', cityid: '455', label: '鱼雁里一邻' },
                                { id: '18', cityid: '455', label: '鱼雁里二邻' },
                                { id: '20', cityid: '455', label: '吴亭里一邻' },
                                { id: '22', cityid: '455', label: '吴亭里三邻' },
                                { id: '23', cityid: '455', label: '吴亭里四邻' },
                                { id: '25', cityid: '455', label: '吴亭里六邻' },
                                { id: '28', cityid: '455', label: '襟江里二邻' },
                                { id: '30', cityid: '455', label: '襟江里四邻' },
                                { id: '31', cityid: '455', label: '襟江里五邻' },
                                { id: '33', cityid: '455', label: '襟江里七邻' }
                            ]
                        },
                        {
                            value: 'size3640',
                            label: '3640m²',
                            children: [
                                { id: '3', cityid: '455', label: '挂剑里二保' },
                                { id: '6', cityid: '455', label: '通寰里一保' },
                                { id: '11', cityid: '455', label: '观桥里一保' },
                                { id: '19', cityid: '455', label: '鱼雁里三保' },
                                { id: '21', cityid: '455', label: '吴亭里二保' },
                                { id: '29', cityid: '455', label: '襟江里三保' }
                            ]
                        },
                        {
                            value: 'size7000',
                            label: '7000m²',
                            children: [{ id: '1', cityid: '455', label: '句容里一保' }]
                        }
                    ]
                },
                {
                    id: 1,
                    label: '望扬镇',
                    children: [
                        {
                            value: 'size1200',
                            label: '1200m²',
                            children: [
                                { id: '5', cityid: '455', label: '挂剑里四邻' },
                                { id: '15', cityid: '455', label: '清茨里一邻' },
                                { id: '24', cityid: '455', label: '吴亭里五邻' },
                                { id: '26', cityid: '455', label: '吴亭里七邻' },
                                { id: '27', cityid: '455', label: '襟江里一邻' },
                                { id: '32', cityid: '455', label: '襟江里六邻' }
                            ]
                        },
                        {
                            value: 'size2080',
                            label: '2080m²',
                            children: [
                                { id: '2', cityid: '455', label: '挂剑里一邻' },
                                { id: '4', cityid: '455', label: '挂剑里三邻' },
                                { id: '7', cityid: '455', label: '通寰里二邻' },
                                { id: '8', cityid: '455', label: '通寰里三邻' },
                                { id: '9', cityid: '455', label: '通寰里四邻' },
                                { id: '10', cityid: '455', label: '通寰里五邻' },
                                { id: '12', cityid: '455', label: '观桥里二邻' },
                                { id: '13', cityid: '455', label: '观桥里三邻' },
                                { id: '14', cityid: '455', label: '观桥里四邻' },
                                { id: '16', cityid: '455', label: '清茨里二邻' },
                                { id: '17', cityid: '455', label: '鱼雁里一邻' },
                                { id: '18', cityid: '455', label: '鱼雁里二邻' },
                                { id: '20', cityid: '455', label: '吴亭里一邻' },
                                { id: '22', cityid: '455', label: '吴亭里三邻' },
                                { id: '23', cityid: '455', label: '吴亭里四邻' },
                                { id: '25', cityid: '455', label: '吴亭里六邻' },
                                { id: '28', cityid: '455', label: '襟江里二邻' },
                                { id: '30', cityid: '455', label: '襟江里四邻' },
                                { id: '31', cityid: '455', label: '襟江里五邻' },
                                { id: '33', cityid: '455', label: '襟江里七邻' }
                            ]
                        },
                        {
                            value: 'size3640',
                            label: '3640m²',
                            children: [
                                { id: '3', cityid: '455', label: '挂剑里二保' },
                                { id: '6', cityid: '455', label: '通寰里一保' },
                                { id: '11', cityid: '455', label: '观桥里一保' },
                                { id: '19', cityid: '455', label: '鱼雁里三保' },
                                { id: '21', cityid: '455', label: '吴亭里二保' },
                                { id: '29', cityid: '455', label: '襟江里三保' }
                            ]
                        },
                        {
                            value: 'size7000',
                            label: '7000m²',
                            children: [{ id: '1', cityid: '455', label: '句容里一保' }]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '九寨沟',
                    children: [
                        {
                            value: 'size1200',
                            label: '1200m²',
                            children: [
                                { id: '5', cityid: '455', label: '挂剑里四邻' },
                                { id: '15', cityid: '455', label: '清茨里一邻' },
                                { id: '24', cityid: '455', label: '吴亭里五邻' },
                                { id: '26', cityid: '455', label: '吴亭里七邻' },
                                { id: '27', cityid: '455', label: '襟江里一邻' },
                                { id: '32', cityid: '455', label: '襟江里六邻' }
                            ]
                        },
                        {
                            value: 'size2080',
                            label: '2080m²',
                            children: [
                                { id: '2', cityid: '455', label: '挂剑里一邻' },
                                { id: '4', cityid: '455', label: '挂剑里三邻' },
                                { id: '7', cityid: '455', label: '通寰里二邻' },
                                { id: '8', cityid: '455', label: '通寰里三邻' },
                                { id: '9', cityid: '455', label: '通寰里四邻' },
                                { id: '10', cityid: '455', label: '通寰里五邻' },
                                { id: '12', cityid: '455', label: '观桥里二邻' },
                                { id: '13', cityid: '455', label: '观桥里三邻' },
                                { id: '14', cityid: '455', label: '观桥里四邻' },
                                { id: '16', cityid: '455', label: '清茨里二邻' },
                                { id: '17', cityid: '455', label: '鱼雁里一邻' },
                                { id: '18', cityid: '455', label: '鱼雁里二邻' },
                                { id: '20', cityid: '455', label: '吴亭里一邻' },
                                { id: '22', cityid: '455', label: '吴亭里三邻' },
                                { id: '23', cityid: '455', label: '吴亭里四邻' },
                                { id: '25', cityid: '455', label: '吴亭里六邻' },
                                { id: '28', cityid: '455', label: '襟江里二邻' },
                                { id: '30', cityid: '455', label: '襟江里四邻' },
                                { id: '31', cityid: '455', label: '襟江里五邻' },
                                { id: '33', cityid: '455', label: '襟江里七邻' }
                            ]
                        },
                        {
                            value: 'size3640',
                            label: '3640m²',
                            children: [
                                { id: '3', cityid: '455', label: '挂剑里二保' },
                                { id: '6', cityid: '455', label: '通寰里一保' },
                                { id: '11', cityid: '455', label: '观桥里一保' },
                                { id: '19', cityid: '455', label: '鱼雁里三保' },
                                { id: '21', cityid: '455', label: '吴亭里二保' },
                                { id: '29', cityid: '455', label: '襟江里三保' }
                            ]
                        },
                        {
                            value: 'size7000',
                            label: '7000m²',
                            children: [{ id: '1', cityid: '455', label: '句容里一保' }]
                        }
                    ]
                },
                {
                    id: 3,
                    label: '七秀',
                    children: [
                        {
                            value: 'size1200',
                            label: '1200m²',
                            children: [
                                { id: '5', cityid: '455', label: '挂剑里四邻' },
                                { id: '15', cityid: '455', label: '清茨里一邻' },
                                { id: '24', cityid: '455', label: '吴亭里五邻' },
                                { id: '26', cityid: '455', label: '吴亭里七邻' },
                                { id: '27', cityid: '455', label: '襟江里一邻' },
                                { id: '32', cityid: '455', label: '襟江里六邻' }
                            ]
                        },
                        {
                            value: 'size2080',
                            label: '2080m²',
                            children: [
                                { id: '2', cityid: '455', label: '挂剑里一邻' },
                                { id: '4', cityid: '455', label: '挂剑里三邻' },
                                { id: '7', cityid: '455', label: '通寰里二邻' },
                                { id: '8', cityid: '455', label: '通寰里三邻' },
                                { id: '9', cityid: '455', label: '通寰里四邻' },
                                { id: '10', cityid: '455', label: '通寰里五邻' },
                                { id: '12', cityid: '455', label: '观桥里二邻' },
                                { id: '13', cityid: '455', label: '观桥里三邻' },
                                { id: '14', cityid: '455', label: '观桥里四邻' },
                                { id: '16', cityid: '455', label: '清茨里二邻' },
                                { id: '17', cityid: '455', label: '鱼雁里一邻' },
                                { id: '18', cityid: '455', label: '鱼雁里二邻' },
                                { id: '20', cityid: '455', label: '吴亭里一邻' },
                                { id: '22', cityid: '455', label: '吴亭里三邻' },
                                { id: '23', cityid: '455', label: '吴亭里四邻' },
                                { id: '25', cityid: '455', label: '吴亭里六邻' },
                                { id: '28', cityid: '455', label: '襟江里二邻' },
                                { id: '30', cityid: '455', label: '襟江里四邻' },
                                { id: '31', cityid: '455', label: '襟江里五邻' },
                                { id: '33', cityid: '455', label: '襟江里七邻' }
                            ]
                        },
                        {
                            value: 'size3640',
                            label: '3640m²',
                            children: [
                                { id: '3', cityid: '455', label: '挂剑里二保' },
                                { id: '6', cityid: '455', label: '通寰里一保' },
                                { id: '11', cityid: '455', label: '观桥里一保' },
                                { id: '19', cityid: '455', label: '鱼雁里三保' },
                                { id: '21', cityid: '455', label: '吴亭里二保' },
                                { id: '29', cityid: '455', label: '襟江里三保' }
                            ]
                        },
                        {
                            value: 'size7000',
                            label: '7000m²',
                            children: [{ id: '1', cityid: '455', label: '句容里一保' }]
                        }
                    ]
                }
            ],
            cityFilterSelect: '',
            cityFilterOptions: [{ id: 0, label: '全部' }, { id: 1, label: '广陵邑' }, { id: 2, label: '望扬镇' }, { id: 3, label: '九寨沟' }, { id: 4, label: '七秀' }],
            sizeFilterCheckbox: [],
            levelFilterSlider: [1, 3],
            levelFilterSliderMarks: { 1: '1', 2: '2', 3: '3', 4: '4' },
            imgPreviewSrcList: [
                'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ]
        };
    },
    computed: {
        isFullhouseOrNot() {
            if (this.$route.path.includes('fullhouse')) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        goBackHome() {
            this.$router.push('/');
        },
        handleHouseNumberFilterChange(value) {
            console.log(value);
        }
    }
};
</script>

<style scoped lang="less">
    @import '../assets/css/svgfonts.css';
.search-wrapper {
    .mt(20px);
    .filter-house-number {
        .mt(10px);
        i {
            .fz(24px);
            vertical-align: middle;
        }
        .el-cascader {
            .w(300px);
            .ml(10px);
            ::v-deep.el-input__inner {
                border: none;
            }
        }
    }
    .filter-outer-wrapper {
        .mt(10px);
        .pr;
        .filter-icon {
            .pa;
            .h(80%);
            left: 34px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            .el-icon-s-operation {
                transform: rotate(90deg);
                font-size: 30px;
                color: #aaaaaa;
                .mr(10px);
            }
            .el-divider--vertical {
                height: 100%;
            }
        }
        ::v-deep.filter-inner-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: center;
            .w(98%);
            .auto(x);
            border: 1px solid #dcdfe6;
            .r(20px);
            .pb(30px);
            .filter-label {
                color: #0366d6;
                .mb(10px);
            }
            .filter-level {
                flex: 0.2 1 auto;
            }
            .el-checkbox-button {
                .mr(10px);
            }
            .el-checkbox-button__inner {
                border-radius: 8px !important;
                border: 1px solid #dcdfe6 !important;
                filter: saturate(0);
                opacity: 0.5;
            }
            .el-checkbox-button__inner:hover {
                opacity: 0.8;
                filter: saturate(0.5);
            }
            .el-checkbox-button.is-checked .el-checkbox-button__inner {
                box-shadow: none;
                filter: none;
                opacity: 1;
            }
            .el-slider__button-wrapper {
                z-index: 300;
                .el-slider__button {
                    .h(10px);
                    .w(10px);
                }
            }
        }
    }
}

.bluprint-list-wrapper {
    .mt(20px);
    .w(100%);
    .auto(x);
    display: flex;
    flex-wrap: wrap;
    .el-card {
        .w(400px);
        .r(20px);
        margin: 0 10px 20px 10px;
        background-color: rgb(247,249,251);
        .el-image {
            .w(100%);
            .h(202.5px);
            .r(20px);
        }
        .card-description-wrapper {
            .pt(10px);
            .card-description-title {
                .db;
                color: rgb(85, 110, 132);
                font-weight: bolder;
                .fz(20px);
                line-height: 30px;
                .mb(8px);
                span {
                    display: block;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .card-description-sub {
                color: rgb(120, 120, 120);
                .fz(16px);
                line-height: 24px;
                i {
                    color: rgb(180, 180, 180);
                    .mr(10px);
                }
                // span {
                //     .db;
                // }
                .card-description-mid-bottom {
                    // .mt(36px);
                    .card-description-time {
                        float: right;
                    }
                }
            }
            .el-divider--horizontal {
                .mt(16px);
                .mb(16px);
            }
            .card-description-tag-wrapper {
                display: flex;
                justify-content: space-around;
                .card-description-tag {
                    // border: 1px solid rgb(180, 180, 180);
                    .r(20px);
                    padding: 5px 10px;
                    .fz(16px);
                    background-color: white;
                    color: rgb(88,88,88);
                    i {
                        .mr(6px);
                        color: #409EFF;
                        font-weight: bolder;
                    }
                }
            }
        }
        .card-download {
            text-align: center;
            i {
                .mr(10px);
            }
            cursor: pointer;
        }
        .card-download:hover {
            color: #0366d6;
            .icon-download:before {
                color: #0366d6;
            }
        }
        .icon-self::before {
            vertical-align: middle;
        }
        .icon-download:before {
            .fz(20px);
        }
    }
    
}


// 房屋

.u-house-area-7000 > ::v-deep span {
    background: url('../assets/img/house/7000-1.png') no-repeat center center;
    background-size: auto 85%;
}
.u-house-area-3640 > ::v-deep span {
    background: url('../assets/img/house/3640-1.png') no-repeat center center;
    background-size: auto 80%;
}
.u-house-area-2080 > ::v-deep span {
    background: url('../assets/img/house/2080-1.png') no-repeat center center;
    background-size: auto 70%;
}
.u-house-area-1200 > ::v-deep span {
    background: url('../assets/img/house/1200-1.png') no-repeat center center;
    background-size: auto 60%;
}
</style>
