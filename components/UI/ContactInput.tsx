import NotValid from "../Order/NotValid";
import React from "react";
import {ContactInputTypes} from "../models/Types";


const ContactInput = ({
                   label,
                   name,
                   type,
                   placeholder,
                   register,
                   required,
                   minLength,
                   maxLength,
                   errors,
                   errorMessage
               }: ContactInputTypes) => {
    return (
        <div>
            <label>{name}</label>
            <input type={type}
                   placeholder={placeholder}
                   {...register(label, {
                       required,
                       minLength: minLength,
                       maxLength: maxLength,

                   })} />
            {errors && <NotValid info={errorMessage}/>}
        </div>
    )
};

export default ContactInput;