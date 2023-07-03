'use client'
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import styles from './Welcome.module.css'
import User from "./User";
import SlidingButton from "../../UI/SlidingButton";
import Logo from "../../Main/Logo";

export default async function Welcome() {
    const router = useRouter();

    const logOutHandler = () => {
        signOut();
    }
    const toMainSite = () => {
        router.push('/');
    }

    return (
        <div className={styles.welcome}>
            <header>
                <Logo/>
            </header>
            <div className={styles.userInfo}>
                <User/>
                <p>W Panelu administratora możesz zapoznać się z
                    aktualnymi zamówieniami, zatrudnionymi pracownikami
                    oraz garścią informacji o firmie i pracownikach.
                </p>
                <p>Have Fun !</p>
            </div>
            <div>
                <SlidingButton clickHandler={logOutHandler}
                               detailsText={'Wyloguj'}
                />
                <SlidingButton clickHandler={toMainSite}
                               detailsText={"Strona Główna"}
                />
            </div>
        </div>
    )
}