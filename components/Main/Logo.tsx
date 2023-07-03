import Image from "next/image";
import styles from "./Logo.module.css";

const logo = require('../../public/tacoLogo.png').default;


export default function Logo (){
    return (
        <div className={styles.title}>
            <h1>Logan's</h1>
            <Image className={styles.logo} src={logo} alt="logo Logan's Taco"/>
            <h1>Taco</h1>
        </div>
    )
}