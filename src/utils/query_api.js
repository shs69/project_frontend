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
    updateProfile(background, icon, username) {
        return instance.post("/profile/update", {
            "background": background,
            "icon": icon,
            "username": username
        })
    },
    getChannels() {
        return instance.get("/chat/channels/get")
    },
    createChannel(channelName, users) {
        return instance.post("/chat/channels/create", {
            "name": channelName,
            "users": users,
        }
        )
    },
}

export const SearchAPI = {
    getUsers(username) {
        const params = {
            "search_text": username,
        }
        return instance.get('/search/users', {
            params: params
        })
    },
    getChannels(name) {
        const params = {
            "search_text": name
        }
        return instance.get('/search/channels', {
            params: params
        })
    }
}

export const ChatAPI = {
    getMessage(start_index, end_index, channel_id) {
        return instance.post('http://localhost:8080/api/v1/chat/messages/get', {
            "start_index": start_index,
            "end_index": end_index,
            "channel_id": channel_id
        })
    },
    createMessage(chatId, message_body) {
        return instance.post("http://localhost:8080/api/v1/chat/messages/create", {
            "reciever": chatId,
            "body": message_body
        })
    }
}