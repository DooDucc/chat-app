import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, Link } from 'react-router-dom';
import { CameraAlt, Delete, ArrowBack } from '@mui/icons-material';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

import styles from './Profile.module.scss';
import { auth, db, storage } from '../../firebase/config';

const cx = classNames.bind(styles);

const Profile = () => {
    const [user, setUser] = useState();
    const [ava, setAva] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
            if (docSnap.exists) {
                setUser(docSnap.data());
            }
        });
        if (ava) {
            const uploadImg = async () => {
                const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${ava.name}`);
                try {
                    if (user.avatarPath) {
                        await deleteObject(ref(storage, user.avatarPath));
                    }
                    const snap = await uploadBytes(imgRef, ava);
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
                    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                        ava: url,
                        avatarPath: snap.ref.fullPath,
                    });
                    setAva('');
                } catch (error) {
                    console.log(error.message);
                }
            };
            uploadImg();
        }
    }, [ava]);

    const deleteImage = async () => {
        try {
            const confirm = window.confirm('Delete avatar?');
            if (confirm) {
                await deleteObject(ref(storage, user.avatarPath));

                await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                    ava: '',
                    avatarPath: '',
                });
                navigate('/chat');
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return user ? (
        <div className={cx('profile')}>
            <Link className={cx('back')} to="/chat">
                <ArrowBack />
            </Link>
            <div className={cx('container')}>
                <div className={cx('ava')}>
                    <img
                        src={
                            user.ava ||
                            'https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE='
                        }
                        alt={user.name}
                    />
                    <div className={cx('overlay')}>
                        <div>
                            <label htmlFor="photo">
                                <CameraAlt className={cx('camera')} />
                            </label>
                            {user.ava ? <Delete className={cx('delete')} onClick={deleteImage} /> : null}
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="photo"
                                onChange={(e) => setAva(e.target.files[0])}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('info')}>
                    <h4>Name: {user.name}</h4>
                    <p>
                        Email: <span>{user.email}</span>
                    </p>
                    <p>
                        Joined on: <span>{user.createdAt.toDate().toDateString()}</span>
                    </p>
                </div>
            </div>
        </div>
    ) : null;
};

export default Profile;
