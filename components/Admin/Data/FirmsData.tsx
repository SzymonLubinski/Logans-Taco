import PieChart from "./PieChart";
import {AllDataTypes} from "../../models/Types";


function FirmsData(props: {firmsData: AllDataTypes}) {
    return (
        <div>
            <div>
                <h3>Ilość sprzedawanych towarów</h3>
                <PieChart firmsData={props.firmsData}/>
            </div>
        </div>
    );
}

export default FirmsData;
