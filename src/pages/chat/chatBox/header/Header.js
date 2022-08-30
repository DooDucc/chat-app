import React from 'react';
import classNames from 'classnames/bind';
import { ArrowBackIos, LocalPhone, MoreVert } from '@mui/icons-material';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const Header = ({ selectedUser, setSelectedUser }) => {
    return (
        <div className={cx('header')}>
            <div className={cx('left')}>
                <ArrowBackIos onClick={() => setSelectedUser(null)} />
                <div className={cx('user')}>
                    <div className={cx('ava')}>
                        <img
                            src={
                                selectedUser.ava ||
                                'https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE='
                            }
                            alt={selectedUser.name}
                        />
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
    );
};

export default Header;
