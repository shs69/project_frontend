import styles from './ProfileFull.module.css';
import { useState } from 'react';
import Avatar from './Avatar/avatar';

function ProfileFull({ onClose }) {

    const [selectedBackground, setBackground] = useState();
    const [selectedForeground, setForeground] = useState();
    const [username, setUsername] = useState('');

    const changeUsername = (event) => setUsername(event.target.value)

    const selectBackground = (number) => setBackground(number);

    const selectForeground = (name) => setForeground(name + '.png');

    const tapInsideProfile = (event) => event.stopPropagation();

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.full} onClick={tapInsideProfile}>
                <div className={selectedBackground}>
                    <Avatar fore={selectedForeground}/>
                </div>
                <input className={styles.textInput} type='text' onChange={() => changeUsername} value={username}/>
                <p className={styles.textProfile}> Градиент фона </p>
                <div className={styles.changeBackground}>
                    <div className={styles.circle1} onClick={() => selectBackground(styles.avatar1)}></div>
                    <div className={styles.circle2} onClick={() => selectBackground(styles.avatar2)}></div>
                    <div className={styles.circle3} onClick={() => selectBackground(styles.avatar3)}></div>
                    <div className={styles.circle4} onClick={() => selectBackground(styles.avatar4)}></div>
                </div>
                <p className={styles.textProfile}> Иконка </p>
                <div className={styles.changeIcon}>
                    <div className={styles.circle}>
                        <img src='profile_icons/man.png' className={styles.circleCat} onClick={() => selectForeground('man')}/>
                    </div>
                    <div className={styles.circle}>
                        <img src='profile_icons/cat.png' className={styles.circleCat} onClick={() => selectForeground('cat')}/>
                    </div>
                    <div className={styles.circle}>
                        <img src='profile_icons/gamepad.png' className={styles.circleCat} onClick={() => selectForeground('gamepad')} />
                    </div>
                    <div className={styles.circle}>
                        <img src='profile_icons/heart.png' className={styles.circleCat} onClick={() => selectForeground('heart')} />
                    </div>
                </div>
                <div className={styles.inputs}>
                    <input className={styles.inputCancel} type="submit" onClick={onClose} value='Отменить' />
                    <input className={styles.input} type="submit" onClick={onClose} value='Сохранить' />
                </div>
            </div>
        </div>
    )
}

export default ProfileFull;