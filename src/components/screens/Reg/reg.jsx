import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styles from './Reg.module.css';
import stylesLogin from '../Login/Login.module.css'

function Reg() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [cookies, setCookie] = useCookies(['username', 'password'])


    const usernameChange = (event) => setUsername(event.target.value)

    const passwordChange = (event) => setPassword(event.target.value)

    const repeatPasswordChange = (event) => setRepeatPassword(event.target.value)

    const submit = (event) => {
        event.preventDefault();
        if (repeatPassword === password && (username && password)) {
            const newUsername = username
            const newPassword = password
            setCookie('username', newUsername, { path: "/" })
            setCookie('password', newPassword, { path: "/" })
            console.log("После изменения cookie")
            console.log(cookies.username)
            console.log(cookies.password)
        }
    }

    return (
        <div className={stylesLogin.body}>
            <form onSubmit={submit}>
                <div className={stylesLogin.box}>
                    <img className={stylesLogin.logo}
                        src='logo.png ' alt={'logo'}
                    />
                    <div>
                        <p className={styles.reg}> Регистрация </p>
                    </div>
                    <div>
                        {/* <p className={styles.underReg}> 
                            Введите данные, которые будут использоваться для входа в аккаунт
                        </p> */}
                    </div>
                    <div className={stylesLogin.fields}>
                        <label className={stylesLogin.label}>Имя пользователя</label>
                        <input
                            name="username"
                            type="email"
                            value={username}
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
                            <Link to="/login"> Войти в аккаунт </Link>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Reg
