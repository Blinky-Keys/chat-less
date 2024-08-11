// client/src/pages/chat/messages.js

import styles from './style.modules.css';
import {useState, useEffect} from 'react';

const messages = ({ socket }) => { //Unpack the socket property from the passed in object i.e. destructuring
    const [messagesReceived, setMessagesReceived] = useState([]); //Array for messagesReceived

    // Runs whenever a socket event is received from the server
    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    createdTime: data.createdTime
                },
            ]);
        });

        //Remove event listener on component unmount
        return () => socket.off('receive_message');

    }, [socket]);

    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp){
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <div className={styles.messagesColumn}>
            {messagesReceived.map((msg, i) => (
                <div className={styles.message} key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <span className={styles.msgMeta}>{msg.username}</span>
                        <span className={styles.msgMeta}>{formatDateFromTimestamp(msg.createdTime)}</span>
                    </div>
                    <p className={styles.msgText}>{msg.message}</p>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Messages;