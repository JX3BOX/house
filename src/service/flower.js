import axios from "axios";
import { __api } from "@jx3box/jx3box-common/js/jx3box.json";
// const all = __api + "api/flower/price/query";        //TODO:
const all = "/api/flower/price/query";
// const highest = __api + 'api/flower/price/max-index';   //TODO:
const highest = '/api/flower/price/max-index'

// https://github.com/JX3BOX/jx3box-api/blob/master/DOCS/flower-price.md
function getFlowerPrice(query) {
    return axios.get(all, {
        params: query,
        withCredentials: true,
    })
}

function getHighestPrice(server){
    return axios.get(highest,{
        params :{
            server : server
        },
        withCredentials: true,
    })
}


export { getFlowerPrice,getHighestPrice };
