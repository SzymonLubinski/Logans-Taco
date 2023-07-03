
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {signOut} from "next-auth/react";
import SlidingButton from "../UI/SlidingButton";
import styles from './DS.module.css';
import React from "react";

export default function DashboardSection(){
    const router = useRouter();
    const session = useSession();
    const moveClientHandler = (path: string) => {
        router.push(`/${path}`)
    }
    const logOutHandler = async () => {
        await signOut();
    }
    let isLoggedIn = session.status === 'authenticated';

    return (
        <section>
            <h1>Panel administratora</h1>
            <div className={styles.dashboardLinks}>
                <div className={styles.links}>
                    {isLoggedIn &&
                        <>
                            <SlidingButton clickHandler={moveClientHandler.bind(null, 'admin')}
                                           detailsText={'Panel Administracyjny'}
                            />
                            <SlidingButton clickHandler={logOutHandler}
                                           detailsText={'Wyloguj'}
                            />
                        </>

                    }
                    {!isLoggedIn &&
                        <>
                            <SlidingButton clickHandler={moveClientHandler.bind(null, 'login')}
                                           detailsText={'Logowanie'}
                            />
                            <SlidingButton clickHandler={moveClientHandler.bind(null, 'register')}
                                           detailsText={'Rejestracja'}
                            />
                        </>
                    }

                </div>
                <div className={styles.aboutLinks}>
                    {isLoggedIn &&
                        <>
                            <h3>Witaj {session.data?.user?.name}</h3>
                            <h3>Jesteś zalogowany</h3>
                        </>
                    }
                    {!isLoggedIn &&
                        <h3>Aby zobaczyć dane o firmie i analizę danych zaloguj się.
                            Aby się zalogować powinieneś utworzyć nowe konto.
                            <span>Nie musisz podawać
                        Prawdziwych danych przy rejestracji.</span>
                        </h3>
                    }
                </div>
            </div>
        </section>
    )
}