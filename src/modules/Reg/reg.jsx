import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { regAPI } from '../../utils/query_api';
import styles from './Reg.module.css';
import stylesLogin from '../Login/Login.module.css'
function Reg() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const usernameChange = (event) => setLogin(event.target.value)

    const passwordChange = (event) => setPassword(event.target.value)

    const repeatPasswordChange = (event) => setRepeatPassword(event.target.value)

    const submit = (event) => {
        event.preventDefault();

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
    }

    return (
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
    )
}

export default Reg
