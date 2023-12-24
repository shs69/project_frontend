export const wsAPI = {
    webSocket(socket) {

        socket.onopen = () => {
            console.log('Соединение установлено');
        };

        socket.onclose = () => {
            console.log('Соединение закрыто');
        };

        return () => {
            socket.close();
        }
    },
    formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    },

    sendMessage(socket, users_id, message_id, message, channel_id) {
        if (message.trim() !== '') {
            const messageObject = {
                "id": users_id,
                "msg": {
                    "message_id": message_id,
                    "user_id": localStorage.getItem('uid'),
                    "channel_id": channel_id,
                    "body": message,
                    "is_reply": false,
                    "created_at": this.formatDateTime(new Date()),
                }
            };

            const jsonString = JSON.stringify(messageObject);
            socket.send(jsonString);
        }
    }
}
