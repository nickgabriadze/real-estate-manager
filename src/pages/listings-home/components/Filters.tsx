import filterStyles from './styles/filters.module.css'
import Region from "./filter-options/Region.tsx";
import Pricing from "./filter-options/Pricing.tsx";
import Area from "./filter-options/Area.tsx";
import Rooms from "./filter-options/Rooms.tsx";
import AddIconWhiteSVG from '/src-icons/add-white.svg'
import AddIconOrangeSVG from '/src-icons/add-orange.svg'
import {useState} from "react";
import {Link} from "react-router-dom";


export default function Filters() {
    const [optionOpen, setOptionOpen] = useState<
        "region" | "pricing" | "area" | "rooms" | "none"
    >("none")


    return <section className={filterStyles['filterWrapper']}>
        <div className={filterStyles['filtersCreate']}>
            <div className={filterStyles['filterOptions']}>
                <Region visible={{status: optionOpen === 'region', makeVisible: setOptionOpen}}/>
                <Pricing />
                <Area/>
                <Rooms visible={{status: optionOpen === 'rooms', makeVisible: setOptionOpen}}/>
            </div>

            <div className={filterStyles['create']}>
                <Link to={'/add-listing'}><img src={AddIconWhiteSVG} width={12} alt={'Add icon'}/><h4>ლისტინგის დამატება</h4></Link>
                <Link to={'/add-agent'}><img src={AddIconOrangeSVG} width={12} alt={'Add icon'}/><h4>აგენტის დამატება</h4></Link>

            </div>
        </div>

        <div className={filterStyles['selectedFilters']}>


        </div>
    </section>
}