import styles from "./NotValid.module.css";
import React from "react";
import {ValidType} from "../models/Types";


export default function NotValid (props: ValidType) {
    return (
        <span className={styles.notValid}>
            {props.info}
        </span>
    )
}