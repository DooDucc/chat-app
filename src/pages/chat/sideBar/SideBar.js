import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Segment } from '@mui/icons-material';
import { db, auth } from '../../../firebase/config';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

import styles from './SideBar.module.scss';
import User from '../user/User';

const cx = classNames.bind(styles);

const SideBar = ({ selectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', 'not-in', [auth.currentUser.uid]));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data());
            });
            setUsers(users);
        });
        return () => unsub();
    }, []);

    return (
        <div className={cx('side-bar')}>
            <div className={cx('header')}>
                <div className={cx('logo')}>Chat app</div>
                <Segment className={cx('icon')} />
            </div>
            <div className={cx('body')}>
                <div className={cx('search-box')}>
                    <input type="text" placeholder="Search..." />
                </div>
                <div className={cx('users')}>
                    {users.map((user, i) => (
                        <User key={i} user={user} selectUser={selectUser} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
