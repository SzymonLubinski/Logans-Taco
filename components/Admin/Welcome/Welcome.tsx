import styles from './Welcome.module.css'


export default function Welcome () {
    return (
        <div className={styles.welcome}>
            <h1>Witaj Admin #1</h1>
            <p>Miłej pracy w Logan's Taco</p>
            <div className={styles.worker}>
                <h3>Dane pracownika</h3>
                <div>
                    <p>Nazwa użytkownika: Admin #1</p>
                    <p>Start Pracy: </p>
                </div>
            </div>
        </div>
    )
}