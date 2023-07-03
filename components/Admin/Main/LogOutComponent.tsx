'use client'
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import styles from './LOC.module.css';


export default function LogOutComponent() {
    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    })
    return (
        <div className={styles.logOut}>
            Jesteś wylogowany. Przenoszę do strony logowania...
        </div>
    )
}