import { useContext } from "react";
import Profile from "../Profile/profile";
import styles from "./Chatlist.module.css";
import chat from "../../../utils/chatcontext";

function ChatList() {

    const [chats, onSelect, selectedChat, open] = useContext(chat)

    return (
        <div className={styles.chatList}>
            <Profile />
            <input type="submit" className={styles.input} onClick={open} value={"Создать чат"} />
            <div className={styles.chatsContainer}>
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`${styles.chatItem} ${selectedChat.id === chat.id ? styles.selected : ''}`}
                        onClick={() => onSelect(chat.id)}>
                        <div className={styles.chatContainer}>
                            <div className={styles.firstline}>
                                <div className={styles.chatName}> {chat.chatName} </div>
                                <div className={styles.chatLastTime}> {chat.time !== null ? chat.time.substring(11, 16) : ""} </div>
                            </div>
                            <div className={styles.chatLastMessage}> {chat.message_body} </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatList;
