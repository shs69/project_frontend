import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { loginAPI } from '../../../utils/query_api';

function Reg() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    const usernameChange = (event) => setUsername(event.target.value)

    const passwordChange = (event) => setPassword(event.target.value)

    const submit = (event) => {
        event.preventDefault();

        // if (document.cookie) {   
        //     navigate("/api/v1/auth/chat")  перекидываем пользователя в чат, когда есть куки вне действия submit

        if (username && password) {
            loginAPI.loginApi(username, password
            ).then((response) => {
                console.log(response);
                console.log(document.cookie);
                navigate("/api/v1/auth/chat");
                console.log(document.cookie)
            }).catch((error) => {
                console.log(error.response);
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
                    <div className={styles.fields}>
                        <label className={styles.label}> Почта </label>
                        <input
                            name="email"
                            type="email"
                            value={username}
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
                            <Link className={styles.link} to="/api/v1/auth/reg"> Создать аккаунт </Link>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Reg
