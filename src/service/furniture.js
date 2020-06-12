import { axios } from "../service/axios";
// DOC http://j3pz.com:8080/developer/#/FurnitureCtrl/FurnitureCtrl.list

const furnitureApi = 'https://apis.j3pz.com/furniture';//TODO:
// const furnitureApi = 'http://localhost:1024/house'; 

function getFurnitures(query) {
    return axios.get(furnitureApi, {
        params: query,
    });
}

export { getFurnitures };
