import selectStyles from './styles/select.module.css'
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "../hooks/redux.ts";


export default function Select({data, setValue, loading, label}: {
    value: number,
    setValue: ActionCreatorWithPayload<any>,
    loading: boolean, data: any[], label: string
}) {
    const dispatch = useAppDispatch()
    return <div className={selectStyles['selectWrapper']}>
        <h5>{label}</h5>
        <select name={label} disabled={loading}
                onChange={(e) => {
                    dispatch(setValue(parseInt(e.target.value)))
                }}>
            {data.map((dataEntry) => <option value={dataEntry.id}
                                             key={dataEntry.id}>{dataEntry.name}</option>)}
        </select>
    </div>
}