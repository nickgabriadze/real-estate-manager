import addListingStyles from "../addlisting.module.css";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {setRental} from "../../../features/forms/listingFormReducer.ts";
import {useEffect} from "react";

export default function DealDetails() {
    const {is_rental} = useAppSelector(s => s.listingForm)
    const sessionIsRental = Number(sessionStorage.getItem('is_rental'))
    useEffect(() => {
        if(!isNaN(sessionIsRental) && sessionIsRental === 1 || sessionIsRental === 0){
            dispatch(setRental(sessionIsRental))
        }
    }, [sessionIsRental]);
    const dispatch = useAppDispatch()
    return (
        <div className={addListingStyles['dealType']}>
            <h3>გარიგების ტიპი</h3>
            <div className={addListingStyles['dealOptionWrapper']}>
                <div className={addListingStyles['dealOption']}>
                    <input type={'radio'} name={'deal'} checked={is_rental === 0}
                           onChange={() => {
                               if(is_rental === 1) {
                                   dispatch(setRental(0))
                                   sessionStorage.setItem('is_rental', '0')
                               }
                           }}
                           required/>
                    <p>იყიდება</p>
                </div>

                <div className={addListingStyles['dealOption']}>
                    <input type={'radio'} name={'deal'}
                           onChange={() => {
                               if(is_rental === 0) {
                                   dispatch(setRental(1))
                                   sessionStorage.setItem('is_rental', '1')

                               }
                           }}
                           checked={is_rental === 1} required/>
                    <p>ქირავდება</p>

                </div>
            </div>
        </div>
    )
}