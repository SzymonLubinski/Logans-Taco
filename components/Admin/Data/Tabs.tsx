import styles from "./FD.module.css";
import {TabTypes} from "../../models/Types";


export default function Tabs(props: TabTypes) {
    const listItems = () => {
        let elementsValues = props.tabs;

        const checkActivity = (tab: string) => {
            if (props.currTab === tab) {
                return `${styles.active}`;
            } else {
                return '';
            }
        }
        return (
            <ul>
                {elementsValues.map((elVal) => (
                    <li key={elVal.tab}
                        className={checkActivity(elVal.tab)}
                        onClick={props.changeTab.bind(null, elVal.tab)}
                    >
                        {elVal.text}
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <div>
            {listItems()}
        </div>
    )
}