import ChatList from "./ChatList/chat_list.jsx";
import ChatDisplay from './ChatDisplay/chatdisplay.jsx';
import ProfileFull from './Profile Full/profilefull.jsx';
import Context from '../../utils/context.jsx';
import CreateChannel from './CreateChannel/createChannel.jsx';
import styles from './Chatpage.module.css';
import chat from '../../utils/chatcontext.jsx';
import { ProfileAPI} from '../../utils/query_api.js';
import { useEffect, useRef, useState } from 'react';
import { wsAPI } from "../../utils/WebSock.js";

function Chatpage() {

    const [selectedChat, setSelectedChat] = useState([]);
    const [selectProfile, setSelectedProfile] = useState(false);
    const [username, setUsername] = useState();
    const [selectedCreateChannel, setStateCreateChannel] = useState(false);
    const [channels, setChannels] = useState([]);
    const [userImageData, changeUserImageData] = useState({ foreground: "man.png", background: "1" });
    const socket = useRef()

    const getUserInfo = async () => {
        try {
            const response = await ProfileAPI.getUserInfoApi()
            return response.data
        } catch (error) {
            console.error(error.response)
        }
    }

    const getChannels = async () => {
        try {
            const response = await ProfileAPI.getChannels()
            return response.data
        } catch (error) {
            console.error(error.response)
        }
    }
   
    const fetchData = async () => {
        try {
            const userInfo = await getUserInfo()
            const userChannels = await getChannels()
            changeUserImageData({
                foreground: userInfo.icon, background: userInfo.background
            })
            setUsername(userInfo.username)
            setChannels(userChannels)
        } catch (error) {
            console.error(error.response)
        }
    }

    const chats = channels.map((channel) => ({
        id: channel.channel_id,
        chatName: channel.channel_name,
        image: channel.channel_img,
        message_body: channel.last_message_text,
        time: channel.last_message_timestamp,
    }))

    useEffect(() => {
        socket.current = new WebSocket(`ws://localhost:8080/api/v1/stream/${localStorage.getItem('uid')}`);
        wsAPI.webSocket(socket.current)
    }, [])

    useEffect(() => {
        fetchData()
    }, [selectProfile, selectedCreateChannel, selectedChat.id])


    const handleChatSelect = async (chatId) => {
        (selectedChat.id === chatId) ? setSelectedChat([]) : setSelectedChat(chats.find(chat => chat.id === chatId))
    }

    return (
        <div className={styles.chatPage}>
            <Context.Provider value={[username, () => setSelectedProfile(true), userImageData]}>
                <chat.Provider value={[chats, handleChatSelect, selectedChat, () => setStateCreateChannel(true)]}>
                    <ChatList />
                </chat.Provider>
            </Context.Provider>
            {!selectedChat.id && <div className={styles.welcome}> Выберите чат и начните переписываться </div>}
            <Context.Provider value={[selectedChat, socket.current, username]}>
                {selectedChat.id && <ChatDisplay />}
            </Context.Provider>
            <Context.Provider value={[() => setSelectedProfile(false), username, userImageData]}>
                {selectProfile && <ProfileFull />}
            </Context.Provider>
            <Context.Provider value={() => setStateCreateChannel(false)}>
                {selectedCreateChannel && <CreateChannel />}
            </Context.Provider>
        </div>
    )

}

export default Chatpage;