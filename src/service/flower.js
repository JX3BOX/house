import axios from "axios";
import { __api } from "@jx3box/jx3box-common/js/jx3box.json";
// const API = __api + "api/flower/price/query";    //TODO:
const API = "/api/flower/price/query";
// https://github.com/JX3BOX/jx3box-api/blob/master/DOCS/flower-price.md
function getFlowerPrice(query) {
    return axios.get(API, {
        params: query,
        withCredentials: true,
    })
}


export { getFlowerPrice };
