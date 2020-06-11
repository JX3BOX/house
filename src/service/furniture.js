import { axios } from "../service/axios";

const furnitureApi = 'https://apis.j3pz.com/furniture';

function getFurnitures(query) {
    return axios.get(furnitureApi, {
        params: query,
    });
}

export { getFurnitures };
