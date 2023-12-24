import styles from './ProfileFull.module.css'
import Avatar from './Avatar/avatar'
import Context, { CookieContext } from '../../../utils/context'
import { useContext, useState } from 'react'
import { loginAPI, ProfileAPI } from '../../../utils/query_api'
import { useNavigate } from 'react-router-dom'

function ProfileFull() {

    const [onClose, user, userImageData] = useContext(Context);
    const setIsCookie = useContext(CookieContext)
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
    const [background, setBack] = useState((userImageData.background != null) ? userImageData.background : "1")
    const [selectedBackground, setBackground] = useState(parseBackground(background))
    const [selectedForeground, setForeground] = useState((userImageData.foreground != null) ? userImageData.foreground : "man.png")
    const [username, setUsername] = useState(user)
    const navigate = useNavigate()

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const selectBackground = (number, back) => {
        setBackground(number)
        setBack(back)
    }

    const selectForeground = (name) => setForeground(name + '.png')

    const tapInsideProfile = (event) => event.stopPropagation()



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

    return (
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
    )
}

export default ProfileFull;