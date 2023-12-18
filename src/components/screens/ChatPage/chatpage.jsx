import styles from './Chatpage.module.css';
import ChatList from "./ChatList/chat_list.jsx";
import ChatDisplay from './ChatDisplay/chatdisplay.jsx';
import ProfileFull from './Profile Full/profilefull.jsx';
import Context from '../../../utils/context.jsx';
import chat from '../../../utils/chatcontext.jsx';
import { ProfileAPI } from '../../../utils/query_api.js';
import {useState } from 'react';

function Chatpage() {

    const [selectedChat, setSelectedChat] = useState(null);
    const [selectProfile, setSelectedProfile] = useState(false);
    const [username, setUsername] = useState('');

    async function getUserInfo() {
        await ProfileAPI.getUserInfoApi(
        ).then((response) => {
            console.log(response.data)
            setUsername(response.data.username);
        }
        ).catch((error) => {
            console.log(error.response);
        })

    }

    console.log(document.cookie)
    getUserInfo()

    const chats = [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
        { id: 4, name: '4' },
        { id: 5, name: '5' },
        { id: 6, name: '6' },
        { id: 7, name: '7' },
        { id: 8, name: '8' },
        { id: 9, name: '9' },
        { id: 10, name: '10' },
        { id: 11, name: '11' },
        { id: 12, name: '12' },
    ]

    const ProfileOpen = () => {
        setSelectedProfile(true);
    }

    const closeProfile = () => {
        setSelectedProfile(false);
    }

    const handleChatSelect = (chatId) => {
        (selectedChat === chatId) ? setSelectedChat(null) : setSelectedChat(chatId);
    }

    return (
        <div className={styles.chatPage}>
            <Context.Provider value={[username, ProfileOpen]}>
                <chat.Provider value={[chats, handleChatSelect, selectedChat]}>
                    <ChatList/>
                </chat.Provider>

            </Context.Provider>
            {!selectedChat && <div className={styles.welcome}> Выберите чат и начните переписываться </div>}
            {selectedChat && <ChatDisplay chatId={selectedChat} />}
            <Context.Provider value={[closeProfile, username]}>
                {selectProfile && <ProfileFull />}
            </Context.Provider>
        </div>
    )

}

export default Chatpage;