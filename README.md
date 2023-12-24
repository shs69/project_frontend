## Установка и запуск
- Убедитесь, что на вашем компьютере установлен Node.js и npm (или yarn) на компьютере
- Клонируйте репозиторий
 ```
git clone https://github.com/shs69/project_frontend.git
 ```
- Перейдите в директорию /project_frontend

```
cd project_frontend
```

- Установите зависимости 
```
yarn install
```
или 
```
npm install
```

- Запустите проект
```
yarn dev
```
или
```
npm run dev
```

## Используемый стек технологий и архитектура

Наш проект представляет собой мессенджер с шифрованием.
Чат в режиме настоящего времени реализован при помощи использования протокола WebSocket.
Функциональность:
1) Чат
2) Наличие учётных записей пользователей
3) Кастомизация профиля
-----------------------------------------------------------
Библиотеки, использованые для написания веб-приложения:
1) React.js - JavaScript - библиотека, при помощи которой и создадим наше SPA
2) Axios - библиотека для работы с http-запросами
3) WebSocket - библиотека для работы в веб-сокетами

В качестве архитектуры использована модульная архитектура, так как она позволила разбить большой проект на преимущественно независимые части - модули.

Структура проекта: 
/modules/... - модули (компоненты приложения)
/utils/... - вспомогательные модули (утилиты)
/public/... - файлы, используемые приложением (фон, иконки)

## Важные компоненты 

1) Для работы с http-запросами используется модулю query_api.js:

```js
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
```

2) Для работы с веб-сокетами использовался модуль WebSock.js:

```js
export const wsAPI = {
    webSocket(socket) {

        socket.onopen = () => {
            console.log('Соединение установлено');
        };

        socket.onclose = () => {
            console.log('Соединение закрыто');
        };

        return () => {
            socket.close();
        }
    },

    formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    },

    sendMessage(socket, users_id, message_id, message, channel_id) {
        if (message.trim() !== '') {
            const messageObject = {
                "id": users_id,
                "msg": {
                    "message_id": message_id,
                    "user_id": localStorage.getItem('uid'),
                    "channel_id": channel_id,
                    "body": message,
                    "is_reply": false,
                    "created_at": this.formatDateTime(new Date()),
                }
            };

            const jsonString = JSON.stringify(messageObject);
            socket.send(jsonString);
        }
    }
}
```

3) Маршрутизация
```js
 <Routes>
    <Route path="/login" element={(!isCookie) ? <Login /> : <Navigate to='/chat' />} />
    <Route path="/reg" element={(!isCookie) ? <Reg /> : <Navigate to='chat' />} />
    <Route path="/chat" element={(isCookie) ? <Chatpage /> : <Navigate to="/login" />} />
    <Route path="*" element={<Navigate to="/chat" />} />
</Routes>
```

4) Первое, что видит пользователь, попадая на веб-приложение - страница авторизации. Модуль отвечающий за неё - компонент Login.

Особенности компонента: 
- **Ввод электронной почты и пароля**: Пользователи могут = вводить свою электронную почту и пароль для аутентификации.

```js 
<div className={styles.body}>
            <form onSubmit={submit}>
                <div className={styles.box}>
                    <img className={styles.logo}
                        src='logo.png' alt={"logo"} />
                    <div>
                        <p className={styles.login}> Войти </p>
                    </div>
                    <div>
                        <p className={styles.underLogin}>
                            Введите свои данные, чтобы получить доступ к вашей учётной записи
                        </p>
                    </div>
                    {error != "" && <div className={styles.error}> {error} </div>}
                    <div className={styles.fields}>
                        <label className={styles.label}> Почта </label>
                        <input
                            name="email"
                            type="email"
                            value={login}
                            onChange={usernameChange}
                            placeholder=' Имя пользователя или почта'
                            className={styles.inputs}
                        />
                        <label className={styles.label}>Пароль</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={passwordChange}
                            placeholder=' Пароль'
                            className={styles.inputs}
                        />
                        <input type="submit" value="Войти" />
                    </div>
                    <div className={styles.underSubmit}>
                        <span> Ещё не зарегистрированы? </span>
                        <span>
                            <Link className={styles.link} to="/reg"> Создать аккаунт </Link>
                        </span>
                    </div>
                </div>
            </form>
        </div>
```

- **Обработка ошибок**: Компонент отображает сообщения об ошибках для сценариев, таких как отсутствующий пользователь или неверный пароль.
```js
                if (error.response.data == "Current user does not exist") {
                    setError("Пользователь с такой почтой не зарегистрирован")
                }
                if (error.response.data == "Password are invalid") {
                    setError("Вы ввели неправильный пароль")
                }
```
- **Навигация**: После успешного входа пользователи перенаправляются по адресу "/chat".

5) Второй важный аспект - регистрация пользователей. За неё отвечает модуль Reg

Особенности компонента:

1) **Ввод данных**:

- Почта: Пользователь вводит свою почту в соответствующем поле ввода.
- Пароль: Пользователь задает пароль для новой учетной записи.
- Повторение пароля: Пользователь повторно вводит пароль для подтверждения.

```js
<div className={stylesLogin.body}>
    <form onSubmit={submit}>
        <div className={stylesLogin.box}>
            <img className={stylesLogin.logo}
                src='logo.png ' alt={'logo'} />
            <div>
                <p className={styles.reg}> Регистрация </p>
            </div>
            {error != "" && <div className={styles.error}> {error} </div>}
            <div className={stylesLogin.fields}>
                <label className={stylesLogin.label}>Почта</label>
                <input
                    name="username"
                    type="email"
                    value={login}
                    onChange={usernameChange}
                    placeholder=' Имя пользователя или почта'
                    className={stylesLogin.inputs}
                />
                <label className={stylesLogin.label}>Пароль</label>
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={passwordChange}
                    placeholder=' Пароль'
                    className={stylesLogin.inputs}
                />
                <label className={stylesLogin.label}> Повторите пароль </label>
                <input
                    name="repeatPassword"
                    type="password"
                    value={repeatPassword}
                    onChange={repeatPasswordChange}
                    placeholder=' Повторите пароль'
                    className={stylesLogin.inputs} />
                <input type="submit" value="Зарегистрироваться" />
            </div>
            <div className={stylesLogin.underSubmit}>
                <span> У вас уже есть аккаунт? </span>
                <span>
                    <Link className={stylesLogin.link} to="/login"> Войти в аккаунт </Link>
                </span>
            </div>
        </div>
    </form>
</div>
```

2) **Обработка ошибок**:

- Если почта уже зарегистрирована, выводится сообщение об ошибке "Пользователь с такой почтой уже зарегистрирован".
- Если пароль слишком короткий (менее 6 символов), появляется предупреждение "Пароль слишком короткий".
- Если введенные пароли не совпадают, выводится сообщение "Пароли не совпадают".
- Если не все поля формы заполнены, появляется предупреждение "Вы заполнили не все поля".

3) **Регистрация**:
- При успешной регистрации пользователь перенаправляется на страницу входа.

```js
if (repeatPassword === password && (login && password) && password.length >= 6) {
    regAPI.regApi(login.substring(0, login.length - 8), login, password
    ).then((response) => {
        console.log(response);
        if (response.status === 200) {
            setPassword('')
            setRepeatPassword('')
            setLogin('')
            navigate("/login")
        }
    }).catch((error) => {
        console.log(error.response);
        if (error.response.data == "Email must be unique") {
            setError("Пользователь с такой почтой уже зарегистрирован")
        }
    });
} else {
    if (password.length < 6) {
        setError("Пароль слишком короткий")
    }
    if (password !== repeatPassword) {
        setError("Пароли не совпадают")
    }
    if (!login || !password) {
        setError("Вы заполнили не все поля")
    }
}
```

6) Самое главное - компонент отвечающий за чат ChatPage(), который разбит по более мелким модулям.

```js
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
```
Здесь получаем необходимые для дальнейшей работы данные от сервера и передаём их в составляющие компонента.

Важные составляющие компонента:

1) Chatlist - компонент списка каналов пользователя

    ```js
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
    ```

    Получаем данные для списка каналов пользователя из компонента ChatPage() и отображаем на экране пользователя

    2) Chatdisplay - компонент чата

    ```js
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
    ```
    Получаем более развёрнутые данные для представления данных пользователя на экране: сообщения, имена пользователей, иконки пользователей.

    ```js
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
    ```

    Работаем с сообщениями: получаем их в режиме реального времени и отправляем.

    3) ProfileFull - компонент, отвечающий за кастомизацию профиля

    ```js
    const logout = (event) => {
        event.preventDefault()
        loginAPI.logoutApi().then((response) => {
            console.log(response, document.cookie)
            document.cookie = `${document.cookie}; max-age=-1;`
            setIsCookie(false)
            localStorage.removeItem('uid')
            localStorage.clear()
            navigate("/login")
        }).catch((error) => {
            console.log(error)
        })
    }

    const updateInfo = () => {
        if (username.trim() !== "") {
            console.log(background)
            ProfileAPI.updateProfile(background, selectedForeground, username
            ).then((response) => {
                console.log(response)
                onClose()
            }).catch((error) => {
                console.log(error)
            });
        }
        localStorage.setItem('username', username)
    }
    ```
    Функции отвечающие за выход пользователя из учетной записи и обновление его данных

    ```js
    <div className={styles.overlay} onClick={onClose}>
            <div className={styles.full} onClick={tapInsideProfile}>
                <div className={selectedBackground}>
                    <Context.Provider value={selectedForeground}>
                        <Avatar />
                    </Context.Provider>
                </div>
                <input className={styles.textInput}
                    type='text'
                    onChange={(changeUsername)}
                    value={username} />
                <p className={styles.textProfile}> Градиент фона </p>
                <div className={styles.changeBackground}>
                    <div className={`${styles.circle1} ${selectedBackground === styles.avatar1 ? styles.selected : ''}`}
                        onClick={() => selectBackground(styles.avatar1, '1')}></div>
                    <div className={`${styles.circle2} ${selectedBackground === styles.avatar2 ? styles.selected : ''}`}
                        onClick={() => selectBackground(styles.avatar2, '2')}></div>
                    <div className={`${styles.circle3} ${selectedBackground === styles.avatar3 ? styles.selected : ''}`}
                        onClick={() => selectBackground(styles.avatar3, '3')}></div>
                    <div className={`${styles.circle4} ${selectedBackground === styles.avatar4 ? styles.selected : ''}`}
                        onClick={() => selectBackground(styles.avatar4, '4')}></div>
                </div>
                <p className={styles.textProfile}> Иконка </p>
                <div className={styles.changeIcon}>
                    <div className={`${styles.circle} ${selectedForeground == "man.png" ? styles.selected : ''}`}>
                        <img src='profile_icons/man.png' onClick={() => selectForeground('man')} />
                    </div>
                    <div className={`${styles.circle} ${selectedForeground == "cat.png" ? styles.selected : ''}`}>
                        <img src='profile_icons/cat.png' onClick={() => selectForeground('cat')} />
                    </div>
                    <div className={`${styles.circle} ${selectedForeground == 'gamepad.png' ? styles.selected : ''}`}>
                        <img src='profile_icons/gamepad.png' onClick={() => selectForeground('gamepad')} />
                    </div>
                    <div className={`${styles.circle} ${selectedForeground == 'heart.png' ? styles.selected : ''}`}>
                        <img src='profile_icons/heart.png' onClick={() => selectForeground('heart')} />
                    </div>
                </div>
                <div className={styles.inputs}>
                    <input className={styles.input} type="submit" onClick={updateInfo} value='Сохранить' />
                </div>
                <div className={styles.inputs}>
                    <input className={styles.logout} type="submit" onClick={logout} value='Выйти из аккаунта' />
                </div>
            </div>
        </div> 
    ```

