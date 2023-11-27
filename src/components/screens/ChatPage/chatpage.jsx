import styles from './Chatpage.module.css';
import ChatList from "./ChatList/chat_list.jsx";
import ChatDisplay from './ChatDisplay/chatdisplay.jsx';
import ProfileFull from './Profile Full/profilefull.jsx';
import { useState } from 'react';

function Chatpage() {

    const [selectedChat, setSelectedChat] = useState(null);
    const [selectProfile, setSelectedProfile] = useState(false);

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
            <ChatList chats={chats} onSelect={handleChatSelect} selectedChat={selectedChat} openProfile={ProfileOpen} />
            {!selectedChat && <div className={styles.welcome}> Выберите чат и начните переписываться </div>}
            {selectedChat && <ChatDisplay chatId={selectedChat} />}
            {selectProfile && <ProfileFull onClose={closeProfile} />}
        </div>
    )

}

export default Chatpage; 
