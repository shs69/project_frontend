import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    withCredentials: true,
})

export const loginAPI = {
    loginApi(username, password) {
        return instance.post("/auth/log_in", {
            'email': username,
            'password': password,
        })
    },
    logoutApi() {
        return instance.get("/auth/log_out")
    }
}

export const regAPI = {
    regApi(username, email, password) {
        return instance.post("/auth/reg", {
            'username': username,
            'email': email,
            'password': password,
        })
    }
}

export const ProfileAPI = {
    getUserInfoApi() {
        return instance.get("/profile/get_me")
    },
    createChannel(channelName, users) {
        return instance.post("/chat/channels/create", {
            "name": channelName,
            "users": users,
        }
        )
    }
}