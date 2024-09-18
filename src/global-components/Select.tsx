import AddCircleSVG from "/src-icons/add-round-circle.svg";
import selectStyles from './styles/select.module.css'
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "../hooks/redux.ts";
import {useState} from "react";
import useClickOutside from "../hooks/useClickOutside.ts";
import {Link} from "react-router-dom";


export default function Select({data, value, setValue, loading, label, forCity, forAgent}: {
    value: number,
    forCity?: number,
    forAgent?: boolean
    setValue: ActionCreatorWithPayload<any>,
    loading: boolean, data: any[], label: string
}) {
    const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
    const selectClickOutside = useClickOutside(() => setDropDownOpen(false))
    const dispatch = useAppDispatch()
    const selectedValue = data.find(item => item.id === value) === undefined ? 'აირჩიე' : data.find(item => item.id === value).name


    return <div className={selectStyles['selectWrapper']}>
        <h5>{label}</h5>

        <div className={selectStyles['dropDownWrapper']} ref={selectClickOutside}
             onClick={() => {
                 if (forCity !== -1) {
                     setDropDownOpen(prev => !prev)
                 }
             }}>
            <div className={`${selectStyles['dropDownMainOption']} ${dropDownOpen && selectStyles['dropDownOpen']}`}

            >{loading ? 'აირჩიე' : value === -1 ? 'აირჩიე' : selectedValue}
            </div>
            {dropDownOpen && <div className={selectStyles['dropDownOptions']}
                                  style={data.length > 5 ? {height: '200px'} : {height: 'fit-content'}}
            >
                {forAgent && <Link
                    to={'/add-agent'}
                    className={`${selectStyles['dropDownOption']} ${selectStyles['addAgentOption']}`}>
                    <img src={AddCircleSVG} width={24} alt={'Add icon'}/>
                    <p>დაამატე აგენტი</p></Link>}

                {data.map((dataEntry) => <p
                    className={selectStyles['dropDownOption']}
                    onClick={() => dispatch(setValue(parseInt(dataEntry.id)))}
                    key={dataEntry.id}>{dataEntry.name}</p>)}
            </div>}
        </div>
    </div>
}