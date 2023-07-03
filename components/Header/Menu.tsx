import React from "react";
import {Portal} from "../Portal/Portal";
import styles from './Menu.module.css';
import CloseButton from "../UI/CloseButton";
import DashboardSection from "./DashboardSection";
import RatingSection from "./RatingSection";
import ProjectInfoSection from "./ProjectInfoSection";


export default function Menu (
    props: {onClose: () => void, ratings: number[] }
) {
    return (
        <Portal onClose={props.onClose}>
            <div className={styles.menu}>
                <DashboardSection/>
                <ProjectInfoSection/>
                <RatingSection ratings={props.ratings}/>
                <CloseButton onClose={props.onClose}/>
            </div>
        </Portal>
    )
}
