import {useForm, SubmitHandler} from "react-hook-form";
import styles from './NewEmployee.module.css';
import {EmployeeTypes} from "../../models/Types";
import ContactInput from "../../UI/ContactInput";


export default function NewEmployee() {
    const {register, formState: {errors}, handleSubmit} = useForm<EmployeeTypes>();

    const onSubmit: SubmitHandler<EmployeeTypes> = async data => {
        const response = await fetch('/api/newemployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log('(NEWEMPLOYEE), successfully step 1!')
        }
        if (!response.ok) {
            console.log('(NEWEMPLOYEE), we have a bug step 1')
        }
    }
    return (
        <form className={styles.form}
              onSubmit={handleSubmit(onSubmit)}>
            <ContactInput label={'employeeName'}
                          name={'Imię i nazwisko'}
                          type={'text'}
                          placeholder={''}
                          register={register}
                          required
                          minLength={3}
                          maxLength={20}
                          errors={errors.employeeName}
                          errorMessage={'Podaj imię i nazwisko pracownika'}
            />
            <ContactInput label={'contractStarts'}
                          name={'Data zawarcia umowy'}
                          type={'date'}
                          placeholder={''}
                          register={register}
                          required
                          minLength={3}
                          maxLength={20}
                          errors={errors.contractStarts}
                          errorMessage={'Wprowadź datę rozpoczęcia umowy pracownika'}
            />
            <button type='submit'>Dodaj</button>
        </form>
    )
}