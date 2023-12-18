import { useContext } from 'react';
import styles from './Profile.module.css';
import Context from '../../../../utils/context';

function Profile() {
    const [username, openProfile] = useContext(Context);
        return(
        <div className={styles.profile} onClick={openProfile}>
            <img className={styles.logo}
                src='logo_profile.png' alt={'logo'}/>
            <p> {username} </p>
            <img className={styles.icon}
                src='edit_icon.png' alt={'edit_icon'}/>
        </div>
    )
}

export default Profile;