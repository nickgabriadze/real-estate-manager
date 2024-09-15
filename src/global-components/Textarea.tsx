import textareaStyles from './styles/textarea.module.css'
import commonStyles from "./styles/common.module.css";
import CheckmarkSVG from "/src-icons/checkmark.svg";
import {useAppDispatch} from "../hooks/redux.ts";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {Validation, ValidationOptions} from "../types/validationOptions.ts";
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


    useEffect(() => {
        setValidState(validate(validationType, value[0]))
    }, [value[0]]);

    return <div className={textareaStyles['textareaWrapper']}>
        <h5>{label} {required ? "*" : ''}</h5>
        <textarea
            id={'description'}
            className={`${validState !== 'none' && !validState ? commonStyles['invalid'] : validState === 'valid' && commonStyles['valid']}`}
            value={value[0]}
            onChange={(e) => {
                const valid = validate(validationType, String(e.target.value))
                setValidState(valid)
                dispatch(setValue([e.target.value, valid]))

            }}
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