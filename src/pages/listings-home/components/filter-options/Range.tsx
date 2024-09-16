import filterOptionsStyles from '../styles/filters.options.module.css'
import React from "react";
import filterStyles from "../styles/filters.module.css";
import UpArrowSVG from "/src-icons/up-arrow.svg";
import DownArrowSVG from "/src-icons/down-arrow.svg";
import useClickOutside from "../../../../hooks/useClickOutside.ts";

export default function Range({params, name, type, visible}: {
    params: URLSearchParams,
    name: string,
    type: 'pricing' | 'area',
    visible: {
        status: boolean,
        makeVisible: React.Dispatch<React.SetStateAction<"region" | "pricing" | "area" | "rooms" | "none">>
    }
}) {
    const title = type === 'pricing' ? ['ფართობი', 'ფართობის მიხედვით'] : ['საფასო კატეგორია', 'ფასის მიხედვით']
    const useRangeClickOutside = useClickOutside(() => visible.status && visible.makeVisible('none'))
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
                <input type={'number'}/>
                <input type={'number'}/>
            </div>

            <div className={filterOptionsStyles['rangeOptions']}>

            </div>

        </div>}

    </div>
}