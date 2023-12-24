import { useContext, useState } from 'react';
import styles from './createChannel.module.css';
import Context from '../../../utils/context';
import Search from './SearchUsers/search';
import { ProfileAPI } from '../../../utils/query_api';

function CreateChannel() {

    const close = useContext(Context)
    const [selectedUser, setSelectedUser] = useState([]);
    const [channelName, setChannelName] = useState('');
    const tapInside = (event) => event.stopPropagation();

    const deleteUser = (id) => {
        setSelectedUser(prevUsers => prevUsers.filter(user => user.out_user_id !== id));
    }

    const createChannel = (e) => {
        e.preventDefault();
        const usersId = selectedUser.map((user) => (user.out_user_id))
        if (channelName.trim() != "") {
            ProfileAPI.createChannel(channelName, usersId).then(
                (response) => {
                    console.log(response.data)
                }
            ).catch((error) => {
                console.log(error)
            })
        }
        close()
    }

    return (
        <div className={styles.overlay} onClick={close}>
            <form onSubmit={createChannel}>
                <div className={styles.full} onClick={tapInside}>
                    <div className={styles.firstline}>
                        <div className={styles.channelName}> Создать чат </div>
                    </div>
                    <label className={styles.label}> Название чата </label>
                    <input
                        className={styles.textInput}
                        onChange={(e) => setChannelName(e.target.value)}
                        value={channelName}
                    />
                    <label className={styles.label}> Участники чата </label>
                    {selectedUser.length > 0 && <div className={styles.usersContainer}>
                        {selectedUser.map((user) => (
                            <div
                                key={user.out_user_id}
                                className={styles.user}
                                onClick={() => deleteUser(user.out_user_id)}
                            >
                                {user.out_username}
                            </div>
                        ))
                        }
                    </div>}
                    <Context.Provider value={[selectedUser, setSelectedUser]}>
                        <Search />
                    </Context.Provider>
                    <div className={styles.beforeSubmit}>
                        Для поиска пользователя введите имя
                    </div>
                    <input className={styles.submit} type='submit' value='Создать чат' />

                </div>
            </form>
        </div>
    )
}

export default CreateChannel