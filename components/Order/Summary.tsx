import React, {useContext} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import styles from './Summary.module.css';
import {OrderContext} from "@/app/context/context";
import {ContactTypes, OnShowFinishType} from "../models/Types";
import ContactInput from "../UI/ContactInput";


export default function Summary(props: OnShowFinishType) {
    const ctx = useContext(OrderContext);
    const {register, formState: {errors}, handleSubmit} = useForm<ContactTypes>();
    const onSubmit: SubmitHandler<ContactTypes> = async data => {
        props.onShow();
        ctx.clearOrder();

        const sentData = {
            items: ctx.items,
            totalAmount: ctx.totalAmount,
            freeDelivery: ctx.freeDelivery,
            contact: data,
        }
        const response = await fetch('/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sentData),
        });

        if (response.ok) {
            console.log('(EMAIL), sent message successfully step 1!')
        }
        if (!response.ok) {
            console.log('(EMAIL), we have a bug step 1')
        }
    };

    return (
        <div className={styles.summary}>
            <h1>Szczegóły zamówienia</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.address}>
                    <h3>Adres dostawy</h3>
                    <ContactInput label={"street"}
                           name={'Ulica'}
                           type={'text'}
                           placeholder={'ul. Sienkiewicza'}
                           register={register}
                           required
                           minLength={3}
                           maxLength={30}
                           errors={errors.street}
                           errorMessage={'nazwa ulicy jest wymagana'}
                    />
                    <ContactInput label={"apartment"}
                                  name={'Numer domu/lokalu'}
                                  type={'text'}
                                  placeholder={'12/22'}
                                  register={register}
                                  required
                                  minLength={1}
                                  maxLength={10}
                                  errors={errors.apartment}
                                  errorMessage={'nr mieszkania jest wymagany'}
                    />
                    <ContactInput label={"code"}
                                  name={'Kod pocztowy'}
                                  type={'text'}
                                  placeholder={'12-345'}
                                  register={register}
                                  required
                                  minLength={5}
                                  maxLength={6}
                                  errors={errors.code}
                                  errorMessage={'kod pocztowy jest wymagany'}
                    />
                    <ContactInput label={"city"}
                                  name={'Miasto'}
                                  type={'text'}
                                  placeholder={'Rzeszów'}
                                  register={register}
                                  required
                                  minLength={3}
                                  maxLength={30}
                                  errors={errors.city}
                                  errorMessage={'nazwa miasta jest wymagana'}
                    />
                </div>
                <div className={styles.address}>
                    <h3>Dane kontaktowe</h3>
                    <ContactInput label={"phone"}
                                  name={'Telefon'}
                                  type={'tel'}
                                  placeholder={'123456789'}
                                  register={register}
                                  required
                                  minLength={9}
                                  maxLength={12}
                                  errors={errors.phone}
                                  errorMessage={'nr telefonu jest wymagany'}
                    />
                    <ContactInput label={"email"}
                                  name={'E-Mail'}
                                  type={'email'}
                                  placeholder={'example@gmail.com'}
                                  register={register}
                                  required
                                  minLength={5}
                                  maxLength={30}
                                  errors={errors.email}
                                  errorMessage={'email jest wymagany'}
                    />
                </div>
                <p>Upewnij się że podałeś poprawny adres e-mail. Dostaniesz na niego powiadomienie o zamówieniu</p>
                <button className={styles.btn} type='submit'>Złóż zamówienie</button>
            </form>
        </div>
    )
}