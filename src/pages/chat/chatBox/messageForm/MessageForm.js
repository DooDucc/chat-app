import React from 'react';
import classNames from 'classnames/bind';
import { TagFaces, Send } from '@mui/icons-material';

import styles from './MessageForm.module.scss';

const cx = classNames.bind(styles);

const MessageForm = ({ onSubmit, text, setText, messageFormRef }) => {
    return (
        <div className={cx('message-form')} onSubmit={onSubmit}>
            <form className={cx('form')}>
                <TagFaces className={cx('icon-box')} />
                <input
                    ref={messageFormRef}
                    type="text"
                    value={text}
                    placeholder="Enter message..."
                    onChange={(e) => setText(e.target.value)}
                />
                <button>
                    <Send className={cx('send-icon')} />
                </button>
            </form>
        </div>
    );
};

export default MessageForm;
