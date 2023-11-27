/* eslint-disable react/prop-types */
import Profile from "../Profile/profile";
import styles from "./Chatlist.module.css";

const ChatList = ({chats, onSelect, selectedChat, openProfile}) => {

    

    return (
        <div className={styles.chatList}>
            <Profile openProfile={openProfile}/>
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
};


export default ChatList;
