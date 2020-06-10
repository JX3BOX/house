import { axios, $ } from "../service/axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";

// 全部价格
const all = __next + "api/flower/price/query";        //TODO:
// const all = "/api/flower/price/query";

// 概览
const kind = __next + 'api/flower/price/rank'    //TODO:
// const kind = '/api/flower/price/rank'

// 排行榜
const highest = __next + 'api/flower/price/max-index';   //TODO:
// const highest = "/api/flower/price/max-index";



// https://github.com/JX3BOX/jx3box-api/blob/master/DOCS/flower-price.md
function getFlowerPrice(query) {
    return axios.get(all, {
        params: query,
        withCredentials: true,
    });
}

function getFlowerPrices(query){
    return axios.get(kind,{
        params : query,
        withCredentials: true,
    })
}

function getHighestPrice(server) {
    return axios.get(highest, {
        params: {
            server: server,
        },
        withCredentials: true,
    });
}

export { getFlowerPrice,getFlowerPrices, getHighestPrice };