/* eslint-disable react/prop-types */
import Profile from "../Profile/profile";
import styles from "./Chatlist.module.css";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../../../utils/query_api";

const ChatList = ({chats, onSelect, selectedChat, openProfile}) => {
    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();
        loginAPI.logoutApi().then( (response) => {
            console.log(response, document.cookie)
            document.cookie = `${document.cookie}; max-age=-1`
            navigate("/api/v1/auth/login")
        }).catch((error) => {
            console.log(error)
        })
    }
  
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
            <input type="submit" onClick={logout}/>
        </div>
    );
};

export default ChatList;
