'use client'

import {useState, useEffect} from "react";
import {signIn} from "next-auth/react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import styles from './login.module.css';
import SlidingButton from "../../../../components/UI/SlidingButton";
import Logo from "../../../../components/Main/Logo";


export default function Login (){
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session?.status === 'authenticated'){
            router.refresh();
            router.push('/admin');
        }
    })

    const loginUser = async (e: any) => {
        e.preventDefault();
        signIn('credentials', {...data, redirect:false})
            .then((callback) => {
                if (callback?.error){
                    toast.error(callback.error);
                }
                if (callback?.ok && !callback?.error){
                    toast.success('Logged successfully');
                }
            })
    }
    const toRegisterSite = () => {
        router.push('/register');
    }

    return (
        <div className={styles.loginSite}>
            <header>
                <Logo/>
            </header>
            <form onSubmit={loginUser}>
                <div>
                    <h1>Formularz logowania</h1>
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input id='email'
                           name='email'
                           type='email'
                           onChange={e => setData({...data, email: e.target.value})}
                           required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input id='password'
                           name='password'
                           type='password'
                           onChange={e => setData({...data, password: e.target.value})}
                           required
                    />
                </div>
                <section className={styles.btn}>
                    <SlidingButton clickHandler={null} detailsText={'Zaloguj'}/>
                </section>
            </form>
            <div className={styles.toLogin}>
                <h3>Jeszcze się nie zarejestrowałeś?</h3>
                <div className={styles.btn}>
                    <SlidingButton clickHandler={toRegisterSite}
                                   detailsText={"rejestracja"}
                    />
                </div>
            </div>
        </div>
    )
}