import { useContext} from 'react';
import styles from './Profile.module.css';
import Context from '../../../utils/context';
import SmallAvatar from './Small Avatar/smallAvatar';

function Profile() {
    const [username, openProfile, userImageData] = useContext(Context);

    const parseBackground = (back) => {
        if (back === "1") {
            return styles.avatar1
        } else if(back === "2") {
            return styles.avatar2
        } else if (back === "3") {
            return styles.avatar3
        } else if (back === "4") {
            return styles.avatar4
        }
    }

    return (
        <div className={styles.profile} onClick={openProfile}>
            <div className={userImageData.background != null ? parseBackground(userImageData.background) : styles.avatar1}>
                <Context.Provider value={userImageData.foreground}>
                    <SmallAvatar />
                </Context.Provider>
            </div>
            <p> {username} </p>
            <img className={styles.icon}
                src='edit_icon.png' alt={'edit_icon'} />
        </div>
    )
}

export default Profile;