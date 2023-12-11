import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/auth',
    withCredentials: true,
})

export const loginAPI = {
    loginApi(username, password) {
        return instance.post("/log_in", {
            'email': username,
            'password': password,
        })
    },
    logoutApi() {
        return instance.get("/log_out")
    }
}

export const regAPI = {
    regApi(username, email, password) {
        return instance.post("reg", {
            'username': username,
            'email': email,
            'password': password,
        })
    }
}

export const ProfileAPI = {
    
}