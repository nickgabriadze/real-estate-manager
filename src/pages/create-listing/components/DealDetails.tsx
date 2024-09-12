import addListingStyles from "../addlisting.module.css";
import {useState} from "react";

export default function DealDetails() {
    const [dealType, setDealType] = useState<'sell' | 'rent'>('sell')

    return (
        <div className={addListingStyles['dealType']}>
            <h3>გარიგების ტიპი</h3>
            <div className={addListingStyles['dealOptionWrapper']}>
                <div className={addListingStyles['dealOption']}>
                    <input type={'radio'} name={'deal'} checked={dealType === 'sell' && true}
                           onChange={() => setDealType('sell')}
                           required/>
                    <p>იყიდება</p>
                </div>

                <div className={addListingStyles['dealOption']}>
                    <input type={'radio'} name={'deal'}
                           onChange={() => setDealType('rent')}
                           checked={dealType === 'rent' && true} required/>
                    <p>ქირავდება</p>

                </div>
            </div>
        </div>
    )
}