import React from 'react';
import classNames from 'classnames/bind';

import styles from './User.module.scss';

const cx = classNames.bind(styles);

const User = ({ user, selectUser }) => {
    return (
        <div className={cx('user')} onClick={() => selectUser(user)}>
            <div className={cx('info')}>
                <div className={cx('ava')}>
                    <img src={user.ava} alt="img" />
                    {user.isOnline ? <div className={cx('dot')}></div> : null}
                </div>
                <div className={cx('text')}>
                    <p className={cx('name')}>{user.name}</p>
                    <p className={cx('email')}>{user.email}</p>
                </div>
            </div>
            <div className={cx('time')}>June 28</div>
        </div>
    );
};

export default User;
