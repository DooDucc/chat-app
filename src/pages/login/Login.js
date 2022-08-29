/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Facebook, Google } from '@mui/icons-material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';

import styles from './Login.module.scss';
import { auth, db } from '../../firebase/config';

const cx = classNames.bind(styles);

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        error: null,
        loading: false,
    });
    const { email, password, error, loading } = data;

    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value, error: null });
    };

    const handleSubmit = async () => {
        setData({ ...data, loading: true });
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            await updateDoc(doc(db, 'users', result.user.uid), {
                isOnline: true,
            });
            setData({
                email: '',
                password: '',
                error: null,
                loading: false,
            });
            navigate('/chat');
        } catch (err) {
            validate(err.message);
        }
    };

    const validate = (err) => {
        if (err === 'Firebase: Error (auth/wrong-password).') {
            setData({ ...data, error: 'Password is invalid' });
        }
        if (err === 'Firebase: Error (auth/user-not-found).') {
            setData({ ...data, error: 'Your account is not exists. Plese sign up' });
        }
        if (err === 'Firebase: Error (auth/invalid-email).') {
            setData({ ...data, error: 'Your account is invalid' });
        }
    };

    return (
        <div className={cx('login')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('logo')}>Chat app</div>
                    <h3 className={cx('title')}>A messaging app initialed from Nepal</h3>
                </div>
                <div className={cx('right')}>
                    <div className={cx('btn-group')}>
                        <Link to="/register" className={cx('right-btn')}>
                            Sign up
                        </Link>
                        <span>/</span>
                        <p className={cx('right-btn', { active: true })}>Sign in</p>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-left')}>
                            <h3 className={cx('title')}>Login</h3>
                            <form className={cx('form')}>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email address"
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Password"
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
                            <div className={cx('login-method')}>
                                <button className={cx('wrap')}>
                                    <p>Login with</p>
                                    <Facebook className={cx('icon')} />
                                </button>
                                <button className={cx('wrap')} onClick={() => {}}>
                                    <p>Login with</p>
                                    <Google className={cx('icon')} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('go')}>
                        {error ? <p className={cx('error')}>{error}</p> : null}
                        <button onClick={handleSubmit} className={cx('login-btn')}>
                            {loading ? 'Login...' : "Let's go"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
