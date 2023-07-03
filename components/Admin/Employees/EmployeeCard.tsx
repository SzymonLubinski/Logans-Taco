import {useRouter} from "next/navigation";
import Image from "next/image";
import {EmployeeTypes, FulfillmentType} from "../../models/Types";
import styles from './EC.module.css';
import {SubmitHandler, useForm} from "react-hook-form";
const xMark = require('../../../public/xmark-solid.svg').default;


export default function EmployeeCard (
    props: {employee: EmployeeTypes, loadingScreen: any}
) {
    const router = useRouter();
    const {register, formState: {errors}, handleSubmit} = useForm<FulfillmentType>({
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<FulfillmentType> = async (data: Object, e: any)=> {
        props.loadingScreen();
        e.preventDefault();
        const response = await fetch('/api/remove-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({action: 'remove-employee', load: props.employee._id}),
        });
        if (response.ok) {
            console.log('(REMOVE EMPLOYEE), successfully step 1!');
            router.refresh();

        }
        if (!response.ok) {
            console.log('(REMOVE EMPLOYEE), we have a bug step 1');
        }
    }

    return (
        <li className={styles.card}>
            <div className={styles.head}>
                <h1>{props.employee.empNick}</h1>
                <p>{props.employee._id}</p>
            </div>
            <div className={styles.main}>
                <div className={styles.info}>
                    <p>Start umowy: <span>{props.employee.contractStart}</span></p>
                    <p>Koniec umowy: <span>{props.employee.contractEnd}</span></p>
                    <p>Typ umowy: <span>{props.employee.contractType}</span></p>
                    <p>Wynagrodzenie: <span>{props.employee.salaryPerHour} zł/h</span></p>
                </div>
                <div className={styles.delete}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <button type='submit'>
                            <Image className={styles.xMark}
                                   src={xMark}
                                   alt={'usuń pracownika'}
                            />
                        </button>
                    </form>
                </div>
            </div>
        </li>
    )
}