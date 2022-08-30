import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

import styles from './ChatBox.module.scss';
import Header from './header/Header';
import Messages from './messages/Messages';
import MessageForm from './messageForm/MessageForm';
import { auth, db } from '../../../firebase/config';

const cx = classNames.bind(styles);

const ChatBox = ({ selectedUser, setSelectedUser, messages }) => {
    const [text, setText] = useState('');

    const messageFormRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUser = auth.currentUser.uid;

        const userChatting = selectedUser.uid;

        const id = currentUser > userChatting ? `${currentUser + userChatting}` : `${userChatting + currentUser}`;

        if (text.trim() !== '') {
            await addDoc(collection(db, 'messages', id, 'chat'), {
                text,
                from: currentUser,
                to: userChatting,
                createdAt: Timestamp.fromDate(new Date()),
            });
            setText('');
            messageFormRef.current.focus();
        }
    };

    return (
        <div className={cx('chat-box')}>
            <Header selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <div className={cx('body')}>
                <div className={cx('messages-area')}>
                    {messages.length ? messages.map((message, i) => <Messages key={i} message={message} />) : null}
                </div>
                <MessageForm onSubmit={handleSubmit} text={text} setText={setText} messageFormRef={messageFormRef} />
            </div>
        </div>
    );
};

export default ChatBox;
