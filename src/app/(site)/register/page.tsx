'use client'

import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import styles from '../login/login.module.css';
import SlidingButton from "../../../../components/UI/SlidingButton";
import {useRouter} from "next/navigation";
import Header from "../../../../components/Header/Header";
import Logo from "../../../../components/Main/Logo";


export default function Register (){
    const router = useRouter();
    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
    });

    const registerUser = async (e: any) => {
        e.preventDefault();
        axios.post('/api/register', data)
            .then(() => toast.success('User has been registered'))
            .catch(() => toast.error('an error occurred'))
    }
    const toLoginSite = () => {
        router.push('/login');
    }

    return (
        <div className={styles.loginSite}>
            <header>
                <Logo/>
            </header>
            <form onSubmit={registerUser}>
                <div>
                    <h1>Formularz Rejestracyjny</h1>
                </div>
                <div>
                    <label>Email</label>
                    <input id='email'
                           name='email'
                           type='email'
                           onChange={e => setData({...data, email: e.target.value})}
                           required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input id='password'
                           name='password'
                           type='password'
                           onChange={e => setData({...data, password: e.target.value})}
                           required
                    />
                </div>
                <div>
                    <label>Name</label>
                    <input id='name'
                           name='name'
                           type='name'
                           onChange={e => setData({...data, name: e.target.value})}
                           required
                    />
                </div>
                <section className={styles.btn}>
                    <SlidingButton clickHandler={null} detailsText={'Załóż konto'}/>
                </section>
            </form>
            <div className={styles.toLogin}>
                <h3>Jesteś już zarejestrowany?</h3>
                <div className={styles.btn}>
                    <SlidingButton clickHandler={toLoginSite}
                                   detailsText={"zaloguj się"}
                    />
                </div>
            </div>
        </div>
    )
}