import styles from './Chatdisplay.module.css'
import Context from '../../../utils/context';
import ChatAvatar from './ChatAvatar/ChatAvatar';
import { ChatAPI, SearchAPI } from '../../../utils/query_api';
import { wsAPI } from '../../../utils/WebSock';
import { useContext, useEffect, useState } from 'react';
import { v4 as muuid } from "uuid";

function ChatDisplay() {

    const [selectedChat, socket, username] = useContext(Context)
    const [currentMessage, setCurrentMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [usersId, setUsersId] = useState([])
    const [sendedMess, setSendedMess] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const parseBackground = (back) => {
        if (back === "1") {
            return styles.avatar1
        } else if (back === "2") {
            return styles.avatar2
        } else if (back === "3") {
            return styles.avatar3
        } else if (back === "4") {
            return styles.avatar4
        }
    }

    const getMessage = async (start_index, end_index) => {
        try {
            const selectionMess = await ChatAPI.getMessage(start_index, end_index, selectedChat.id)
            setMessages(selectionMess.data.sort().reverse())
        } catch (error) {
            console.log(error)
        }
    }

    const getUsersId = async () => {
        try {
            const response = await SearchAPI.getChannels(selectedChat.chatName)
            let userId = (response.data.find(chat => chat.out_channel_id === selectedChat.id && chat.out_users)).out_users
            if (userId) {
                userId = userId.filter(userId => userId !== localStorage.getItem('uid'));
            }
            return userId
        } catch (error) {
            console.log(error)
        }
    }

    const getIconsUsers = async (userId) => {
        try {
            const id = await SearchAPI.getUsers("")
            for (let i = 0; i < id.data.length; i++) {
                if (userId.find(user => user == id.data[i].out_user_id)) {
                    if (id.data[i].out_background != null && id.data[i].out_icon != null) {
                        localStorage.setItem(id.data[i].out_user_id, id.data[i].out_username)
                        localStorage.setItem("background" + id.data[i].out_username, id.data[i].out_background)
                        localStorage.setItem("foreground" + id.data[i].out_username, id.data[i].out_icon)
                    } else {
                        localStorage.setItem(id.data[i].out_user_id, id.data[i].out_username)
                        localStorage.setItem("background" + id.data[i].out_username, "1")
                        localStorage.setItem("foreground" + id.data[i].out_username, "man.png")
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = async () => {
        try {
            await getMessage(0, 10000)
            const userid = await getUsersId()
            setUsersId(userid)
            await getIconsUsers(usersId)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        fetchData()
        setSendedMess(false)

    }, [selectedChat.id, sendedMess, selectedChat, isLoading])


    useEffect(() => {
        socket.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data);
            if (parsedMessage.channel_id == selectedChat.id) {
                const username = localStorage.getItem(parsedMessage.user_id)
                const message = { username: username, message_body: parsedMessage.body, created_at: parsedMessage.created_at }
                setMessages(messages => [message, ...messages])
                console.log(messages)
            }
        }
    }, [messages])

    const sendMessage = async (e) => {
        e.preventDefault()
        let response;
        if (currentMessage.trim() !== '') {
            response = await ChatAPI.createMessage(selectedChat.id, currentMessage)
            wsAPI.sendMessage(socket, usersId, response.data, currentMessage, selectedChat.id)
        }
        setCurrentMessage('')
        setSendedMess(true)
    }

    return (
        <div className={styles.chatDisplay}>
            <div className={styles.messageContainer}>
                {messages.map((message) => (
                    <div key={muuid()} className={message.username === username ? styles.usermessage : styles.notuser}>
                        {message.username !== username &&
                            <div className={parseBackground(localStorage.getItem("background" + message.username))}>
                                <Context.Provider value={localStorage.getItem("foreground" + message.username)}>
                                    <ChatAvatar />
                                </Context.Provider>
                            </div>
                        }
                        <div className={message.username !== username ? styles.itemMessage : styles.userContainer}>
                            {message.username !== username && <div className={styles.usernameMessage}> {message.username} </div>}
                            <div className={styles.textMessage}> {message.message_body} </div>
                            <div className={styles.time}> {message.created_at.substring(11, 16)} </div>
                        </div>
                    </div>
                ))}
            </div>
            <form className={styles.formMessage} onSubmit={(e) => sendMessage(e)}>
                <input
                    autoFocus
                    type="text"
                    placeholder="Напишите сообщение..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button type="submit">
                    <img src="send_button.png" alt="sendButton" className={styles.submit} />
                </button>
            </form>
        </div>
    )
}

export default ChatDisplay