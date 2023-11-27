import styles from './Profile.module.css';

function Profile( {openProfile} ) {
        return(
        <div className={styles.profile} onClick={openProfile}>
            <img className={styles.logo}
                src='logo_profile.png' alt={'logo'}/>
            <p> Username </p>
            <img className={styles.icon}
                src='edit_icon.png' alt={'edit_icon'}/>
        </div>
    )
}

export default Profile;