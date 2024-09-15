import inputStyles from './styles/input.module.css'
import CheckmarkSVG from '/src-icons/checkmark.svg'
import CheckmarkErrorSVG from '/src-icons/checkmark-error.svg'
import CheckmarkValidSVG from '/src-icons/checkmark-valid.svg'
import {ValidationOptions} from "../types/validationOptions.ts";
import { useState} from "react";
import {validate} from "./validate.ts";
import {useAppDispatch} from "../hooks/redux.ts";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";


export default function Input({label, value, setValue, validator, type, required, validationType}: {
    label: string;
    value: any,
    setValue:  ActionCreatorWithPayload<any>,
    validationType: ValidationOptions
    validator: string,
    type: string,
    required: boolean
}) {
    const dispatch = useAppDispatch()
    const [valid, setValid] = useState<false | 'none' | 'valid'>('none')


    return <div className={inputStyles['inputWrapper']}>
        <label htmlFor={label}>{label} {required ? "*" : ''}</label>
        <input
            style={valid !== 'none' && !valid ? {
                outline: '1px solid var(--accent-color)',
                border: '1px solid var(--accent-color)'
            } : valid === 'valid' ? {
                outline: '1px solid var(--form-valid)',
                border: '1px solid var(--form-valid)'
            } : {}}
            id={label} type={type}
            value={value[0]}
            onChange={(e) => {
                const validated = validate(validationType, e.target.value)
                setValid(validated)
                dispatch(setValue([e.target.value, validated]))
                }
            }
            required={required}/>
        {validator && <div>
            <img
                src={valid !== 'none' && !valid ? CheckmarkErrorSVG : valid === 'valid' ? CheckmarkValidSVG : CheckmarkSVG}
                alt={'Checkmark icon'} width={12}/>
            <p style={valid !== 'none' && !valid ? {color: 'var(--accent-color)'} : valid === 'valid' ? {color: 'var(--form-valid)'} : {}}>{validator}</p>
        </div>}
    </div>
}