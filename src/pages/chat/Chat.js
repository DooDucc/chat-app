import { useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { updateDoc, doc, orderBy, collection, query, onSnapshot } from 'firebase/firestore';

import styles from './Chat.module.scss';
import SideBar from './sideBar/SideBar';
import ChatBox from './chatBox/ChatBox';
import { auth, db } from '../../firebase/config';

const cx = classNames.bind(styles);

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const navigate = useNavigate();

    const handleSignOut = async () => {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isOnline: false,
        });
        await signOut(auth);
        navigate('/');
    };

    const selectUser = async (user) => {
        setSelectedUser(user);

        const currentUser = auth.currentUser.uid;
        const userChatting = user.uid;
        const id = currentUser > userChatting ? `${currentUser + userChatting}` : `${userChatting + currentUser}`;

        const meassageRef = collection(db, 'messages', id, 'chat');
        const q = query(meassageRef, orderBy('createdAt', 'asc'));

        onSnapshot(q, (querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            setMessages(messages);
        });
    };

    return (
        <div className={cx('chat')}>
            <div className={cx('container')}>
                <button className={cx('logout-btn')} onClick={handleSignOut}>
                    Log out
                </button>
                <SideBar selectUser={selectUser} />
                {selectedUser ? <ChatBox selectedUser={selectedUser} messages={messages} /> : null}
            </div>
        </div>
    );
};

export default Chat;
