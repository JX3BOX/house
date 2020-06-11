import { axios } from "../service/axios";

// const furnitureApi = 'https://apis.j3pz.com/furniture';
const furnitureApi = 'http://localhost:1024/house'; //TODO:

function getFurnitures(query) {
    return axios.get(furnitureApi, {
        params: query,
    });
}

export { getFurnitures };
