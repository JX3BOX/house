import User from "@jx3box/jx3box-common/js/user";
import { $ } from "../service/axios";

function setServer(server) {
    localStorage && localStorage.setItem("flower_server", server);
}

function getProfile() {
    return $.get("user/profile", {
        withCredentials: true,
    }).then((res) => {
        return res.data.data
    })
}

function getTempServer(){
    return localStorage && localStorage.getItem('flower_server')
}

async function getServer() {
    let isLogin = User.isLogin();
    // 1.如果已登录
    if (isLogin) {
        // 1.1尝试获取资料设定服务器
        return getProfile().then((data) => {
            return data.server
        }).then((server) => {
            if(server){
                return server
            }else{
                // 1.2尝试获取本地搜索记录
                return getTempServer()
            }
        })
    }else{
    // 2.如果未登录，直接尝试获取本地搜索记录
        return getTempServer()
    }
}

export { setServer, getServer };
