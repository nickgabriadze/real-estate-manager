import AddCircleSVG from "/src-icons/add-round-circle.svg";
import selectStyles from '../styles/form/select.module.css'
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../hooks/redux.ts";
import {useEffect, useState} from "react";
import useClickOutside from "../../hooks/useClickOutside.ts";
import {Link} from "react-router-dom";
import commonStyles from "../styles/form/common.module.css";
import {Validation} from "../../types/validationOptions.ts";


export default function Select({data, value, name, setValue, loading, label, forCity, forAgent}: {
    value: [number, Validation],
    name: string,
    forCity?: number,
    forAgent?: boolean
    setValue: ActionCreatorWithPayload<any>,
    loading: boolean, data: any[], label: string
}) {
    const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
    const selectClickOutside = useClickOutside(() => setDropDownOpen(false))
    const dispatch = useAppDispatch()
    const selectedValue = data.find(item => item.id === value[0]) === undefined ? 'აირჩიე' : data.find(item => item.id === value[0]).name

    const sessionStorageValue = sessionStorage.getItem(name)

    useEffect(() => {
        if (!loading && sessionStorageValue) dispatch(setValue([Number(sessionStorageValue), Number(sessionStorageValue) === -1 ? false : 'valid']))
    }, [loading, sessionStorageValue]);

    return <div className={selectStyles['selectWrapper']}>
        {<h5>{label}</h5>}

        <div className={selectStyles['dropDownWrapper']} ref={selectClickOutside}
             onClick={() => {
                 if (forCity !== -1) {
                     setDropDownOpen(prev => !prev)
                 }
             }}>
            <div className={`${selectStyles['dropDownMainOption']} ${value[1] === 'invalidForm' && commonStyles['invalid']} ${dropDownOpen && selectStyles['dropDownOpen']}`}

            >{forAgent && value[0] === -1 ? 'აგენტები' : loading ? 'აირჩიე' : value[0] === -1 ? 'აირჩიე' : selectedValue}
            </div>
            {dropDownOpen && <div className={selectStyles['dropDownOptions']}
                                  style={data.length > 5 ? {height: '200px'} : {height: 'fit-content'}}
            >
                {forAgent && <Link
                    to={'/real-estate-manager/add-agent'}
                    className={`${selectStyles['dropDownOption']} ${selectStyles['addAgentOption']}`}>
                    <img src={AddCircleSVG} width={24} alt={'Add icon'}/>
                    <p>დაამატე აგენტი</p></Link>}

                {data.map((dataEntry) => <p
                    className={selectStyles['dropDownOption']}
                    onClick={() => {
                        dispatch(setValue([parseInt(dataEntry.id), 'valid']))
                        sessionStorage.setItem(`${name}`, String(dataEntry.id))
                    }}
                    key={dataEntry.id}>{dataEntry.name}</p>)}
            </div>}
        </div>
    </div>
}