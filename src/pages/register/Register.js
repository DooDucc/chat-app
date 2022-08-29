import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Facebook } from '@mui/icons-material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';

import styles from './Register.module.scss';
import { auth, db } from '../../firebase/config';

const cx = classNames.bind(styles);

const Register = () => {
    const [data, setData] = useState({ name: '', email: '', password: '', cfpassword: '', error: null, loading: null });
    const { name, email, password, cfpassword, error, loading } = data;

    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value, error: null });
    };

    const handleSubmit = async () => {
        setData({ ...data, loading: true });
        if (password !== cfpassword) {
            setData({ ...data, error: 'Confirm password and passwrod must not be different.' });
        } else if (!email.includes('@gmail.com')) {
            setData({ ...data, error: 'Please enter valid email address.' });
        } else {
            createAccount();
        }
    };

    const createAccount = async () => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                ava: 'https://picsum.photos/200/300',
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
            });
            setData({
                name: '',
                email: '',
                password: '',
                error: null,
                loading: false,
            });
            navigate('/chat');
        } catch (error) {
            validate(error.message);
        }
    };

    const validate = (err) => {
        if (err === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
            setData({ ...data, error: 'Password should be at least 6 characters' });
        }
        if (err === 'Firebase: Error (auth/email-already-in-use).') {
            setData({ ...data, error: 'This account is exists.' });
        }
    };

    return (
        <div className={cx('register')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('logo')}>Chat app</div>
                    <h3 className={cx('title')}>A messaging app initialed from Nepal</h3>
                </div>
                <div className={cx('right')}>
                    <div className={cx('btn-group')}>
                        <p className={cx('right-btn', { active: true })}>Sign up</p>
                        <span>/</span>
                        <Link to="/" className={cx('right-btn')}>
                            Sign in
                        </Link>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-left')}>
                            <h3 className={cx('title')}>Register</h3>
                            <form className={cx('form')} onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                                {/* {error ? <p className="error">{error}</p> : null} */}
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email address"
                                    onChange={handleChange}
                                    required
                                />
                                {/* {error ? <p className="error">{error}</p> : null} */}
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="cfpassword"
                                    value={cfpassword}
                                    placeholder="Confirm password"
                                    onChange={handleChange}
                                />
                            </form>
                        </div>
                        <div className={cx('content-mid')}>
                            <div className={cx('line')}></div>
                            <span>OR</span>
                            <div className={cx('line')}></div>
                        </div>
                        <div className={cx('content-right')}>
                            <h3 className={cx('title')}>Or do you prefer to...</h3>
                            <div className={cx('fb-login')}>
                                <div className={cx('wrap')}>
                                    <p>Login with</p>
                                    <Facebook className={cx('icon')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('go')}>
                        {error ? <p className={cx('error')}>{error}</p> : null}
                        <button onClick={handleSubmit} className={cx('register-btn')}>
                            {loading ? 'Creating...' : "Let's go"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
