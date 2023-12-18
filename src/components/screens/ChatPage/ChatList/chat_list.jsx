/* eslint-disable react/prop-types */
import { useContext } from "react";
import Profile from "../Profile/profile";
import styles from "./Chatlist.module.css";
import chat from "../../../../utils/chatcontext";

function ChatList() {

    const [chats, onSelect, selectedChat] = useContext(chat)

    const submit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.chatList}>
            <Profile/>
            <input type="submit" className={styles.input} onClick={submit} value={"Создать чат"}/>
            {chats.map((chat) => (
                <div key={chat.id} 
                className={`${styles.chatItem} ${selectedChat === chat.id ? styles.selected : ''}`}
                onClick={() => onSelect(chat.id)}
                >
                    <div className={styles.chatContainer}> 
                        <div className={styles.chatName}> {chat.name} </div>
                        <div className={styles.chatLastMessage}> Last Message </div> 
                    </div>
                </div>  
            ))}
        </div>
    );
}

export default ChatList;
