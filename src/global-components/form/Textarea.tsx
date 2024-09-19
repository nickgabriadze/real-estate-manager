import textareaStyles from '../styles/form/textarea.module.css'
import commonStyles from "../styles/form/common.module.css";
import CheckmarkSVG from "/src-icons/checkmark.svg";
import {useAppDispatch} from "../../hooks/redux.ts";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {Validation, ValidationOptions} from "../../types/validationOptions.ts";
import {validate} from "./validate.ts";
import {useEffect, useState} from "react";
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
    const [validState, setValidState] = useState<Validation>(validate(validationType, value[0]))
    const dispatch = useAppDispatch()
    const sessionStorageValue = sessionStorage.getItem('description')

    useEffect(() => {
        if (sessionStorageValue) {
            const valid = validate(validationType, value[0])
            dispatch(setValue([sessionStorageValue, valid]))
        }
    }, [sessionStorageValue]);
    useEffect(() => {
        setValidState(validate(validationType, value[0]))
    }, [value[0]]);

    return <div className={textareaStyles['textareaWrapper']}>
        <label htmlFor={'description'}>{label} {required ? "*" : ''}</label>
        <textarea
            id={'description'}
            className={`${(validState !== 'none' && !validState) || value[1] === 'invalidForm' ? commonStyles['invalid'] : validState === 'valid' && commonStyles['valid']}`}
            value={value[0]}
            onChange={(e) => {
                const valid = validate(validationType, String(e.target.value))
                setValidState(valid)
                dispatch(setValue([e.target.value, valid]))
                sessionStorage.setItem('description', e.target.value)
            }}
        />
        {validator && <div>
            <img
                src={(validState !== 'none' && !validState) || value[1] === 'invalidForm'  ? CheckmarkErrorSVG : validState === 'valid' ? CheckmarkValidSVG : CheckmarkSVG}
                alt={'Checkmark icon'} width={12}/>
            <p
                className={`${(validState !== 'none' && !validState) || value[1] === 'invalidForm'  ? commonStyles['invalidColor'] : validState === 'valid' && commonStyles['validColor']}`}>{validator}</p>
        </div>}

    </div>
}