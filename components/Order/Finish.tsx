import Image from "next/image";
import {useEffect, useState} from "react";
import styles from './Finish.module.css';
import {Portal} from "../Portal/Portal";
import {BackdropType} from "../models/Types";
import CloseButton from "../UI/CloseButton";


const tacoTruck1 = require('../../public/tacotruck1.png').default;
const tacoTruck2 = require('../../public/tacotruck2.png').default;
const tacoTruck3 = require('../../public/tacotruck3.png').default;
const tacoTruck4 = require('../../public/tacotruck4.png').default;
const truckList = [tacoTruck1, tacoTruck2, tacoTruck3, tacoTruck4]


export default function Finish(props: BackdropType) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (
                prev == truckList.length - 1 ? 0 : prev + 1
            ));
        }, 400);
        return () => clearInterval(interval)
    },[])

    return (
        <Portal onClose={props.onClose}>
            <div className={styles.finish}>
                <div className={styles.info}>
                    <h3>Dziękujemy za złożenie zamówienia w Logan's Taco!</h3>
                    <h3>Bob już zabiera się do zrobienia twojego zamówienia</h3>
                    <CloseButton onClose={props.onClose}/>
                </div>
            </div>
            <div className={styles.animatedObject}>
                <Image src={truckList[currentIndex]}
                       width={350}
                       height={122}
                       alt="Logan Truck"/>
            </div>
        </Portal>
    )
}