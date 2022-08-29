import classNames from 'classnames/bind';

import styles from './Messages.module.scss';
import { auth } from '../../../../firebase/config';

const cx = classNames.bind(styles);

const Messages = ({ message }) => {
    return (
        <div
            className={cx('messages', {
                own: message.from === auth.currentUser.uid,
                friend: message.from !== auth.currentUser.uid,
            })}
            style={message.from === auth.currentUser.uid ? { textAlign: 'right' } : { textAlign: 'left' }}
        >
            <p className={cx('message')}>{message.text}</p>
        </div>
    );
};

export default Messages;
