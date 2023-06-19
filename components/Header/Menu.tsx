import React from "react";
import Image from "next/image";
import {Portal} from "../Portal/Portal";
import {BackdropType} from "../models/Types";
import styles from './Menu.module.css';
import CloseButton from "../UI/CloseButton";


const linkedIn = require('../../public/linkedin-white.svg').default;
const GitHub = require('../../public/github-white.svg').default;


export default function Menu (props:BackdropType) {
    return (
        <Portal onClose={props.onClose}>
            <div className={styles.menu}>
                <h3>
                    Strona stworzona przez Szymona Lubińskiego
                    i jest inspirowana przygodami Logana Kapuczino
                </h3>
                <div>
                    <h3>Więcej info o mnie znajdziesz tutaj</h3>
                    <ul className={styles.list}>
                        <li>
                            <a href='https://github.com/SzymonLubinski'
                               target='_blank'
                            >
                                <p>GitHub</p>
                                <Image className={styles.img}
                                       src={GitHub}
                                       alt='repository'
                                />
                            </a>
                        </li>
                        <li>
                            <a href='https://www.linkedin.com/in/szymon-lubi%C5%84ski-5b6a62243'
                               target='_blank'
                            >
                                <p>LinkedIn</p>
                                <Image className={styles.img}
                                       src={linkedIn}
                                       alt='account'
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.greetings}>
                    <h3>Podziękowania dla twórców grafik</h3>
                    <p>
                        Taco food truck <span>Weronika</span> (moja dziewczyna)
                    </p>
                    <p>
                        Obraz <a href="https://pixabay.com/pl/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=155812"> OpenClipart-Vectors</a> z <a href="https://pixabay.com/pl//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=155812"> Pixabay</a>
                    </p>
                    <p>
                        Obraz <a href="https://pixabay.com/pl/users/limoncitosketching-7400657/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5651624"> Marta Simon</a> z <a href="https://pixabay.com/pl//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5651624"> Pixabay</a>
                    </p>
                    <p>
                        Obraz <a href="https://pixabay.com/pl/users/katillustrationlondon-10871763/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3927420"> Katherine Ab</a> z <a href="https://pixabay.com/pl//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3927420"> Pixabay</a>
                    </p>
                    <p>
                        Obraz <a href="https://pixabay.com/pl/users/ariapsa-7646834/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3655803"> Ariapsa MX</a> z <a href="https://pixabay.com/pl//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3655803"> Pixabay</a>
                    </p>
                </div>
                <CloseButton onClose={props.onClose}/>
            </div>
        </Portal>
    )
}