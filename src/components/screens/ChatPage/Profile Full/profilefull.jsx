import styles from './ProfileFull.module.css';

function ProfileFull({ onClose }) {

    const tapInsideProfile = (event) => {
        event.stopPropagation();
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.full} onClick={tapInsideProfile}>
                <img className={styles.icon} />
                <input className={styles.textInput} type='text' />
                <p className={styles.textProfile}> Градиент фона </p>
                <div className={styles.changeBackground}>
                    <div className={styles.circle1}></div>
                    <div className={styles.circle2}></div>
                    <div className={styles.circle3}></div>
                    <div className={styles.circle4}></div>
                </div>
                <p className={styles.textProfile}> Иконка </p>
                <div className={styles.change_icon}>

                </div>
                <div className={styles.inputs}>
                    <input className={styles.input} type="submit" onClick={onClose} value='Отменить' />
                    <input className={styles.input} type="submit" onClick={onClose} value='Сохранить' />
                </div>
            </div>
        </div>
    )
}

export default ProfileFull;