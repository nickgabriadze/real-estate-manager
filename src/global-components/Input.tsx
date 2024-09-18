import inputStyles from './styles/input.module.css'
import commonStyles from './styles/common.module.css'
import CheckmarkSVG from '/src-icons/checkmark.svg'
import CheckmarkErrorSVG from '/src-icons/checkmark-error.svg'
import CheckmarkValidSVG from '/src-icons/checkmark-valid.svg'
import {ValidationOptions} from "../types/validationOptions.ts";
import {useEffect, useState} from "react";
import {validate} from "./validate.ts";
import {useAppDispatch} from "../hooks/redux.ts";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";


export default function Input({label, value, name, setValue, validator, required, validationType}: {
    label: string;
    value: any,
    name: string,
    setValue: ActionCreatorWithPayload<any>,
    validationType: ValidationOptions
    validator: string,
    required: boolean,
}) {
    const dispatch = useAppDispatch()
    const [validState, setValidState] = useState<false | 'none' | 'valid'>(validate(validationType, value[0]))
    const sessionStorageValue = sessionStorage.getItem(name)
    useEffect(() => {
        if (sessionStorageValue) {
            const valid = validate(validationType, value[0])
            dispatch(setValue([sessionStorageValue, valid]))
        }
    }, [sessionStorageValue]);

    useEffect(() => {
        setValidState(validate(validationType, value[0]))
    }, [value[0]]);

    return <div className={inputStyles['inputWrapper']}>
        <label htmlFor={label}>{label} {required ? "*" : ''}</label>
        <input
            autoComplete={'false'}
            id={label} type={'text'}
            value={value[0]}
            className={`${validState !== 'none' && !validState ? commonStyles['invalid'] : validState === 'valid' && commonStyles['valid']}`}
            onChange={(e) => {
                const validated = validate(validationType, e.target.value)
                setValidState(validated)
                dispatch(setValue([e.target.value, validated]))
                sessionStorage.setItem(`${name}`, e.target.value)
            }
            }
        />
        {validator && <div>
            <img
                src={validState !== 'none' && !validState ? CheckmarkErrorSVG : validState === 'valid' ? CheckmarkValidSVG : CheckmarkSVG}
                alt={'Checkmark icon'} width={12}/>
            <p
                className={`${validState !== 'none' && !validState ? commonStyles['invalidColor'] : validState === 'valid' && commonStyles['validColor']}`}>{validator}</p>
        </div>}
    </div>
}