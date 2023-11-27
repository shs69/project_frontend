import styles from './Chatdisplay.module.css'

function ChatDisplay() {
    const messages = [
        { id: "username1", text: 'Привет как дела?', sender: 'user'},
        { id: "username2", text: 'Все хорошо спасибо', sender: 'notuser' },
        { id: "username1", text: 'Привет как дела?', sender: 'user'},
        { id: "username2", text: 'Все хорошо спасибо', sender: 'notuser' },
        { id: "username1", text: 'Привет как дела?', sender: 'user'},
        { id: "username2", text: 'Все хорошо спасибо', sender: 'notuser' },
        { id: "username1", text: 'Привет как дела?', sender: 'user'},
        { id: "username2", text: 'Все хорошо спасибо', sender: 'notuser' },
        { id: "username1", text: 'Привет как дела?', sender: 'user'},
        { id: "username2", text: 'Все хорошо спасибо', sender: 'notuser' },
        { id: "username1", text: 'Привет как дела?', sender: 'user'},
        { id: "username2", text: 'Все хорошо спасибо', sender: 'notuser' },
        
    ];

    return (
        <div className={styles.chatDisplay}>
            <div className={styles.messageContainer}> 
                {messages.map((message) => (
                    <div key={message.id} className={message.sender === 'user' ? styles.usermessage : styles.notuser}>
                        <div className={styles.usernameMessage}> {message.id} </div>
                        <div className={styles.textMessage}> {message.text} </div>
                    </div>
                ))}
            </div>
            <form className={styles.formMessage}>
                <input
                    type="text"
                    placeholder="Напишите сообщение..."
                />
                <button type="submit"> Отправить </button>
            </form>
        </div>
    );
}

export default ChatDisplay