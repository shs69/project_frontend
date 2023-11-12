import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styles from './Login.module.css';


function Reg() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cookies, setCookie] = useCookies(['username', 'password'])


    const usernameChange = (event) => setUsername(event.target.value)

    const passwordChange = (event) => setPassword(event.target.value)
    
    const submit = (event) => {
        event.preventDefault();
        if (username && password) {
            setCookie('username', username, {path: "/"})
            setCookie('password', password, {path: "/"})
            console.log(cookies.username)
            console.log(cookies.password)
        }
    }

    return(
        <div>
            <form onSubmit={submit}>
                <div className={styles.loginBox}>
                    <img className={styles.logo}
<<<<<<<< HEAD:src/components/screens/Login/login.jsx
                    src = 'logo.png' alt={"logo"}/>
========
                    src = 'logo.png ' alt={'logo'}
                    />
>>>>>>>> RegPage:src/components/screens/Reg/reg.jsx
                    <div> 
                        <p className={styles.login}> Войти </p>
                    </div>
                    <div>
                        <p className={styles.underLogin}> 
                            Введите свои данные, чтобы получить доступ к вашей учётной записи
                        </p>
                    </div>
                    <div className={styles.fields}>
                        <label className={styles.label}>Имя пользователя</label>
                        <input
                        name="username"
                        type="email" 
                        value={username}
                        onChange={usernameChange}
                        placeholder=' Имя пользователя или почта'
                        className={styles.loginInput}
                        />
                        <label className={styles.label}>Пароль</label>
                        <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={passwordChange}
                        placeholder=' Пароль'
                        className={styles.loginInput}
                        />
                       <input type="submit" value="Войти"/>
                    </div>
                    <div className={styles.underSubmit}>
                            <span> Ещё не зарегистрированы? </span>
                            <span>
                                <Link to="/reg"> Создать аккаунт </Link>
                            </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Reg
