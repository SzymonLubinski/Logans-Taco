"use client";

import React from "react";
import styles from './Input.module.css';


type InputRef = React.HTMLProps<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputRef>((props, ref) => {

    return (
        <div className={styles.divInput}>
            <label>Ilość: </label>
            <input className={styles.input}
                   defaultValue='1'
                   ref={ref}
                   type='number'
                   min='1'
                   max='10'
                   step='1'/>
        </div>
    )
});
export default Input;