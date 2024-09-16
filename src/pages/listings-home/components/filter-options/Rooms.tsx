import filterOptionsStyles from '../styles/filters.options.module.css'
import UpArrowSVG from "/src-icons/up-arrow.svg";
import DownArrowSVG from "/src-icons/down-arrow.svg";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux.ts";
import filterStyles from "../styles/filters.module.css";
import {addRoomFilters, removeRoomFilters} from "../../../../features/filters/filterReducer.ts";
import useClickOutside from "../../../../hooks/useClickOutside.ts";
import {useNavigate} from "react-router-dom";


export default function Rooms({visible, params}: {
    params: URLSearchParams
    visible: {
        status: boolean,
        makeVisible: React.Dispatch<React.SetStateAction<"region" | "pricing" | "area" | "rooms" | "none">>
    }
}) {
    const urlRooms = params.get('rooms')?.split(',').map(n => parseInt(n))
    const navigate = useNavigate()
    const roomDispatch = useAppDispatch()
    const {totalAvailableRooms, roomFilters, } = useAppSelector(s => s.filters);
    const totalRoomsSorted = totalAvailableRooms.map(Number).sort((a,b) => a - b)
    const handleRoom = (n:number) => {
        if(roomFilters.includes(n)){
            roomDispatch(removeRoomFilters([...roomFilters.filter(r => r !== n)]))

        }else{
            roomDispatch(addRoomFilters([...roomFilters, n]))

        }
    }


    const roomsClickOutsideRef = useClickOutside(() => visible.status && visible.makeVisible('none'))

    useEffect(() => {
        if(urlRooms){
            roomDispatch(addRoomFilters( urlRooms))
        }
    }, []);

    useEffect(() => {
        if (roomFilters.length === 0) {
                params.delete('rooms')
        } else {
            params.set('rooms', roomFilters.join(','));
        }
        navigate(`${location.pathname}?${params.toString()}`);

    }, [roomFilters.length])
    return (
        <div className={filterOptionsStyles['roomsWrapper']} ref={roomsClickOutsideRef}>
            <button className={`${filterOptionsStyles['filterOptionsButton']} ${filterStyles['filterOption']}`}
                    style={visible.status ? {background: '#F3F3F3'}: {}}
                    onClick={() => visible.makeVisible(visible.status ? 'none' : 'rooms')}>
                <h3>საძინებლების რაოდენობა</h3>
                <img src={visible.status ? UpArrowSVG : DownArrowSVG} alt={'Arrow icon'} width={12}/>
            </button>

            {visible.status && <div className={filterOptionsStyles['roomOptions']}>
                <h3>საძინებლების რაოდენობა</h3>
                <div className={filterOptionsStyles['rooms']}>
                    {totalRoomsSorted.map((room) => <button
                        onClick={() => handleRoom(room)}
                        style={roomFilters.includes(room) ? {border: '1px solid var(--accent-color)', color: 'var(--accent-color)'}: {}}
                        className={filterOptionsStyles['room']} key={room}>{room}</button>)}
                </div>
                <div>
                    <button className={filterStyles['dropdownSelectButton']}
                            onClick={() => visible.makeVisible(visible.status ? 'none' : 'region')}
                    >არჩევა
                    </button>
                </div>
            </div>}

        </div>
    );
}
