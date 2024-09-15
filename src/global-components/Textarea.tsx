import textareaStyles from './styles/textarea.module.css'
import CheckmarkSVG from "/src-icons/checkmark.svg";
import {useAppDispatch} from "../hooks/redux.ts";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {Validation, ValidationOptions} from "../types/validationOptions.ts";
import {validate} from "./validate.ts";
import {useState} from "react";
import CheckmarkErrorSVG from "/src-icons/checkmark-error.svg";
import CheckmarkValidSVG from "/src-icons/checkmark-valid.svg";


export default function Textarea({label, validationType, value, setValue, validator, required}: {
    label: string,
    value: any,
    validationType: ValidationOptions,
    setValue: ActionCreatorWithPayload<any>,
    validator: string,
    required: boolean
}) {
    const [valid, setValid] = useState<Validation>('none')
    const dispatch = useAppDispatch()

    return <div className={textareaStyles['textareaWrapper']}>
        <h5>{label} {required ? "*" : ''}</h5>
        <textarea
            style={valid !== 'none' && !valid ? {
                outline: '1px solid var(--accent-color)',
                border: '1px solid var(--accent-color)'
            } : valid === 'valid' ? {
                outline: '1px solid var(--form-valid)',
                border: '1px solid var(--form-valid)'
            } : {}}
            value={value[0]}
            onChange={(e) => {
                const valid = validate(validationType, String(e.target.value))
                setValid(valid)
                dispatch(setValue([e.target.value, valid]))

            }}
            required={required}/>
        {validator && <div>
            <img
                src={valid !== 'none' && !valid ? CheckmarkErrorSVG : valid === 'valid' ? CheckmarkValidSVG : CheckmarkSVG}
                alt={'Checkmark icon'} width={12}/>
            <p style={valid !== 'none' && !valid ? {color: 'var(--accent-color)'} : valid === 'valid' ? {color: 'var(--form-valid)'} : {}}>{validator}</p>
        </div>}

    </div>
}