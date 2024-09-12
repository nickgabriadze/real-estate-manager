import filterOptionsStyles from '../styles/filters.options.module.css'
import UpArrowSVG from "/src-icons/up-arrow.svg";
import DownArrowSVG from "/src-icons/down-arrow.svg";
import React from "react";


export default function Rooms({visible}: {
    visible: {
        status: boolean,
        makeVisible: React.Dispatch<React.SetStateAction<"region" | "pricing" | "area" | "rooms" | "none">>
    }
}) {

    return (
        <div className={filterOptionsStyles['roomsWrapper']}>
            <button className={filterOptionsStyles['filterOptionsButton']} onClick={() => visible.makeVisible(visible.status ? 'none' : 'rooms')}>
                <h3>ოთახების რაოდენობა</h3>
                <img src={visible.status ? UpArrowSVG : DownArrowSVG} alt={'Arrow icon'} width={12}/>
            </button>
        </div>
    );
}
