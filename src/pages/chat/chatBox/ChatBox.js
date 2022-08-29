import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { ArrowBackIos, LocalPhone, MoreVert } from '@mui/icons-material';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

import styles from './ChatBox.module.scss';
import Messages from './messages/Messages';
import MessageForm from './messageForm/MessageForm';
import { auth, db } from '../../../firebase/config';

const cx = classNames.bind(styles);

const ChatBox = ({ selectedUser, messages }) => {
    const [text, setText] = useState('');

    const messageFormRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUser = auth.currentUser.uid;

        const userChatting = selectedUser.uid;

        const id = currentUser > userChatting ? `${currentUser + userChatting}` : `${userChatting + currentUser}`;

        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: currentUser,
            to: userChatting,
            createdAt: Timestamp.fromDate(new Date()),
        });
        setText('');
        messageFormRef.current.focus();
    };

    return (
        <div className={cx('chat-box')}>
            <div className={cx('header')}>
                <div className={cx('left')}>
                    <ArrowBackIos />
                    <div className={cx('user')}>
                        <div className={cx('ava')}>
                            <img src={selectedUser.ava} alt={selectedUser.name} />
                            {selectedUser.isOnline && <div className={cx('dot')}></div>}
                        </div>
                        <div className={cx('text')}>
                            <p className={cx('name')}>{selectedUser.name}</p>
                            {selectedUser.isOnline && <p className={cx('online')}>online</p>}
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <LocalPhone className={cx('icon')} />
                    <MoreVert className={cx('icon')} />
                </div>
            </div>
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
