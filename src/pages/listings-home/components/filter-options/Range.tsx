import filterOptionsStyles from '../styles/filters.options.module.css'
import React, {useEffect, useState} from "react";
import GELSVG from '/src-icons/gel.svg'
import filterStyles from "../styles/filters.module.css";
import UpArrowSVG from "/src-icons/up-arrow.svg";
import DownArrowSVG from "/src-icons/down-arrow.svg";
import useClickOutside from "../../../../hooks/useClickOutside.ts";
import {validate} from "../../../../global-components/form/validate.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../../hooks/redux.ts";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

export default function Range({params, values, type, visible, setValue}: {
    params: URLSearchParams,
    values: number[],
    type: 'pricing' | 'area',
    setValue:  ActionCreatorWithPayload<{ min: number, max: number }>
    visible: {
        status: boolean,
        makeVisible: React.Dispatch<React.SetStateAction<"region" | "pricing" | "area" | "rooms" | "none">>
    }
}) {
    const navigate = useNavigate()

    const title = type === 'area' ? ['ფართობი', 'ფართობის მიხედვით'] : ['საფასო კატეგორია', 'ფასის მიხედვით']
    const useRangeClickOutside = useClickOutside(() => visible.status && visible.makeVisible('none'))
    const [range, setRange] = useState<[string, string]>(['', ''])
    const [isValid, setIsValid] = useState<boolean>(true)
    const dispatch = useAppDispatch()
    const urlRangeFrom = params.get(`${type}_from`)
    const urlRangeTo = params.get(`${type}_to`)

    useEffect(() => {
        const empty = urlRangeFrom === null || urlRangeTo === null
        if(!empty){
            const valid = Number(urlRangeFrom) <= Number(urlRangeTo)
            if(valid){
                dispatch(setValue({min: Number(urlRangeFrom), max: Number(urlRangeTo)}))
            }
        }
    }, [urlRangeFrom, urlRangeTo]);

    useEffect(() => {
        if (!isValid) setIsValid(true)
    }, [range[0], range[1]]);
    return <div className={filterOptionsStyles['rangeWrapper']} ref={useRangeClickOutside}>
        <button
            style={visible.status ? {background: '#F3F3F3'} : {}}
            className={`${filterOptionsStyles['filterOptionsButton']} ${filterStyles['filterOption']}`}
            onClick={() => visible.makeVisible(visible.status ? 'none' : type)}>
            <h3>{title[0]}</h3>
            <img src={visible.status ? UpArrowSVG : DownArrowSVG} alt={'Arrow icon'} width={12}/>
        </button>


        {visible.status && <div className={filterOptionsStyles['range']}
        >
            <h3>{title[1]}</h3>

            <div className={filterOptionsStyles['rangeInputs']}>
                <div className={filterOptionsStyles['rangeOptions']}>

                    <div
                        className={`${filterOptionsStyles['rangeInput']} ${!isValid ? filterOptionsStyles['invalidRange'] : ''}`}>
                        <input placeholder={'დან'}
                               value={range[0]}
                               type={'text'}
                               tabIndex={1}
                               onChange={(e) => {

                                   if (e.target.value === '' || validate('RANGENUMBER', String(e.target.value)) === 'valid') {
                                       setRange((prev) => [e.target.value, prev[1]])
                                   }
                               }}
                        />

                        {type === 'pricing' ? <span><img src={GELSVG} alt={'GEL icon'}/></span> :
                            <span>მ<sup>2</sup></span>}
                    </div>

                </div>

                <div
                    className={`${filterOptionsStyles['rangeInput']} ${!isValid && filterOptionsStyles['invalidRange']}`}>
                    <input
                        tabIndex={2}
                        value={range[1]}
                        onChange={(e) => {
                            if (e.target.value === '' || validate('RANGENUMBER', String(e.target.value)) === 'valid') {
                                setRange((prev) => [prev[0], e.target.value])
                            }
                        }}
                        type={'text'}
                        placeholder={'მდე'}/>
                    {type === 'pricing' ? <span><img src={GELSVG} alt={'GEL icon'}/></span> :
                        <span>მ<sup>2</sup></span>}
                </div>

                {!isValid &&
                    <p style={{color: 'var(--accent-color)'}} className={filterOptionsStyles['invalidMessage']}>ჩაწერეთ
                        ვალიდური მონაცემები</p>}

            </div>

            <div className={filterOptionsStyles['rangeValues']}>

                <div className={filterOptionsStyles['min']}>
                    <h5>მინ. {type === 'pricing' ? <span>ფასი</span> : <span>მ<sup>2</sup></span>}</h5>
                    <div className={filterOptionsStyles['values']}>
                        {values.map(val =>
                            <button key={val}
                                    style={range[0] === String(val) ? {color: 'var(--form-valid)'} : {}}

                                    onClick={() => setRange((prev) => [String(val), prev[1]])}
                            >{val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} {type === 'pricing' ?
                                <span>₾</span> : <span>მ<sup>2</sup></span>}</button>)}</div>

                </div>
                <div className={filterOptionsStyles['max']}>
                    <h5>მაქს. {type === 'pricing' ? <span>ფასი</span> : <span>მ<sup>2</sup></span>}</h5>
                    <div className={filterOptionsStyles['values']}>{values.map(val =>
                        <button
                            key={val}
                            style={range[1] === String(val) ? {color: 'var(--form-valid)'} : {}}
                            onClick={() => setRange((prev) => [prev[0], String(val)])}

                        >{val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} {type === 'pricing' ?
                            <span>₾</span> : <span>მ<sup>2</sup></span>}</button>)}</div>
                </div>


            </div>

            <div>
                <button className={filterStyles['dropdownSelectButton']}
                        onClick={() => {
                            const validated = Number(range[0]) <= Number(range[1])

                            if (!validated) {
                                setIsValid(false)
                            } else {
                                params.set(`${type}_from`, range[0])
                                params.set(`${type}_to`, range[1])
                                visible.makeVisible(visible.status ? 'none' : type)
                                navigate(`${location.pathname}?${params.toString()}`);
                                setRange(['', ''])
                            }
                        }}
                >არჩევა
                </button>
            </div>
        </div>}

    </div>
}