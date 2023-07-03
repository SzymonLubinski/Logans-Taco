import {useForm, SubmitHandler} from "react-hook-form";
import {useRouter} from "next/navigation";
import styles from './NE.module.css';
import {EmployeeTypes} from "../../models/Types";
import ContactInput from "../../UI/ContactInput";
import NotValid from "../../Order/NotValid";


export default function NewEmployee(props: {loadingScreen: any}) {
    const router = useRouter();
    const {register, formState: {errors}, handleSubmit} = useForm<EmployeeTypes>();

    const onSubmit: SubmitHandler<EmployeeTypes> = async data => {
        const response = await fetch('/api/new-employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log('(NEWEMPLOYEE), successfully step 1!')
            router.refresh();
        }
        if (!response.ok) {
            console.log('(NEWEMPLOYEE), we have a bug step 1')
        }
    }
    return (
        <form className={styles.form}
              onSubmit={handleSubmit(onSubmit)}>
            <h1>Dodaj pracownika</h1>
            <ContactInput label={'empNick'}
                          name={'Imię i nazwisko'}
                          type={'text'}
                          placeholder={''}
                          register={register}
                          required
                          minLength={3}
                          maxLength={20}
                          errors={errors.empNick}
                          errorMessage={'wprowadź daną'}
            />
            <div>
                <label>Typ umowy</label>
                <select {...register('contractType', {
                    required: true
                })}>
                    <option value={'Umowa o pracę'}>Umowa o pracę</option>
                    <option value={'Umowa zlecenie'}>Umowa zlecenie</option>
                </select>
                {errors.contractType && <NotValid info={'wprowadź daną'}/>}
            </div>
            <ContactInput label={'contractStart'}
                          name={'Rozpoczęcie umowy pracownika'}
                          type={'date'}
                          placeholder={''}
                          register={register}
                          required
                          minLength={3}
                          maxLength={20}
                          errors={errors.contractStart}
                          errorMessage={'wprowadź daną'}
            />
            <ContactInput label={'contractEnd'}
                          name={'Zakończenie umowy pracownika'}
                          type={'date'}
                          placeholder={''}
                          register={register}
                          required
                          minLength={3}
                          maxLength={20}
                          errors={errors.contractEnd}
                          errorMessage={'wprowadź daną'}
            />
            <ContactInput label={'salaryPerHour'}
                          name={'Wynagrodzenie godzinne pracownika'}
                          type={'number'}
                          placeholder={''}
                          register={register}
                          required
                          minLength={1}
                          maxLength={3}
                          errors={errors.salaryPerHour}
                          errorMessage={'wprowadź daną'}
            />
            <button onClick={props.loadingScreen} type='submit'>Dodaj</button>
        </form>
    )
}