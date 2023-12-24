import styles from './Login.module.css';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../../utils/query_api';
import { CookieContext } from '../../utils/context';

function Reg() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const setIsCookie = useContext(CookieContext)
    const navigate = useNavigate();

    const usernameChange = (event) => setLogin(event.target.value)

    const passwordChange = (event) => setPassword(event.target.value)

    const submit = (event) => {
        event.preventDefault();
        if (login && password) {
            setError("")
            loginAPI.loginApi(login, password
            ).then(() => {
                setIsCookie(true)
                localStorage.setItem('uid', document.cookie.substring(5))
                navigate("/chat");
            }).catch((error) => {
                if (error.response.data == "Current user does not exist") {
                    setError("Пользователь с такой почтой не зарегистрирован")
                }
                if (error.response.data == "Password are invalid") {
                    setError("Вы ввели неправильный пароль")
                }
            });
        }
    }

    return (
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
    )
}

export default Reg
