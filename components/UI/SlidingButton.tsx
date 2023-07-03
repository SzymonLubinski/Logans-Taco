import styles from "./SlidingButton.module.css";


export default function SlidingButton(
    props: {clickHandler: any, detailsText: string}
){
    return (
        <button className={styles.detailsOrder}
                onClick={props.clickHandler}
                type='submit'
        >
            <span>{props.detailsText}</span>
        </button>
    )
}