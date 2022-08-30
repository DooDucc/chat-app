import React from 'react';
import classNames from 'classnames/bind';

import styles from './User.module.scss';

const cx = classNames.bind(styles);

const User = ({ user, selectUser }) => {
    return (
        <div className={cx('user')} onClick={() => selectUser(user)}>
            <div className={cx('info')}>
                <div className={cx('ava')}>
                    <img
                        src={
                            user.ava ||
                            'https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE='
                        }
                        alt="img"
                    />
                    {user.isOnline ? <div className={cx('dot')}></div> : null}
                </div>
                <div className={cx('text')}>
                    <p className={cx('name')}>{user.name}</p>
                    <p className={cx('email')}>{user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default User;
