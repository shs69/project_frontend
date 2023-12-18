import styles from './ProfileFull.module.css';
import { useContext, useState } from 'react';
import Avatar from './Avatar/avatar';
import Context from '../../../../utils/context';
import { loginAPI } from '../../../../utils/query_api';
import { useNavigate } from 'react-router-dom';

function ProfileFull() {

    const [onClose, user] = useContext(Context);
    const [selectedBackground, setBackground] = useState(styles.avatar1);
    const [selectedForeground, setForeground] = useState('man.png');
    const [username, setUsername] = useState(user);
    const navigate = useNavigate();

    const changeUsername = (event) => { 
        setUsername(event.target.value)
        console.log(username)
    }

    const selectBackground = (number) => setBackground(number);

    const selectForeground = (name) => setForeground(name + '.png');

    const tapInsideProfile = (event) => event.stopPropagation();

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
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.full} onClick={tapInsideProfile}>
                <div className={selectedBackground}>
                    <Avatar fore={selectedForeground}/>
                </div>
                <input className={styles.textInput} 
                type='text' 
                onChange={changeUsername} 
                value={username}/>
                <p className={styles.textProfile}> Градиент фона </p>
                <div className={styles.changeBackground}>
                    <div className={`${styles.circle1} ${selectedBackground === styles.avatar1 ? styles.selected : ''}`} 
                    onClick={() => selectBackground(styles.avatar1)}></div>
                    <div className={`${styles.circle2} ${selectedBackground === styles.avatar2 ? styles.selected : ''}`} 
                    onClick={() => selectBackground(styles.avatar2)}></div>
                    <div className={`${styles.circle3} ${selectedBackground === styles.avatar3 ? styles.selected : ''}`} 
                    onClick={() => selectBackground(styles.avatar3)}></div>
                    <div className={`${styles.circle4} ${selectedBackground === styles.avatar4 ? styles.selected : ''}`} 
                    onClick={() => selectBackground(styles.avatar4)}></div>
                </div>
                <p className={styles.textProfile}> Иконка </p>
                <div className={styles.changeIcon}>
                    <div className={`${styles.circle} ${selectedForeground == "man.png" ? styles.selected : ''}`}>
                        <img src='profile_icons/man.png' onClick={() => selectForeground('man')}/>
                    </div>
                    <div className={`${styles.circle} ${selectedForeground == "cat.png" ? styles.selected : '' }`}>
                        <img src='profile_icons/cat.png' onClick={() => selectForeground('cat')}/>
                    </div>
                    <div className={`${styles.circle} ${selectedForeground == 'gamepad.png' ? styles.selected : '' }`}>
                        <img src='profile_icons/gamepad.png' onClick={() => selectForeground('gamepad')} />
                    </div>
                    <div className={`${styles.circle} ${selectedForeground == 'heart.png' ? styles.selected : '' }`}>
                        <img src='profile_icons/heart.png' onClick={() => selectForeground('heart')} />
                    </div>
                </div>
                <div className={styles.inputs}>
                    <input className={styles.input} type="submit" onClick={onClose} onSubmit={changeUsername} value='Сохранить' />
                </div>
                <div className={styles.inputs}>
                    <input className={styles.logout} type="submit" onClick={logout} value='Выйти из аккаунта' />
                </div>
            </div>
        </div>
    )
}

export default ProfileFull;