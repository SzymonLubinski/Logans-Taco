import styles from './CB.module.css';
import {onCloseType} from "../models/Types";


export default function CloseButton(
    props: {onClose: () => void }
) {
    return (
        <div className={styles.container}>
            <button className={styles.btn}
                    onClick={props.onClose}>
                Zamknij
            </button>
        </div>
    )
}