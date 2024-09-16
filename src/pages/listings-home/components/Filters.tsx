import filterStyles from './styles/filters.module.css'
import RegionFilter from "./filter-options/RegionFilter.tsx";
import Pricing from "./filter-options/Pricing.tsx";
import Area from "./filter-options/Area.tsx";
import Rooms from "./filter-options/Rooms.tsx";
import AddIconWhiteSVG from '/src-icons/add-white.svg'
import AddIconOrangeSVG from '/src-icons/add-orange.svg'
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {useQuery} from "@tanstack/react-query";
import getRegions from "../../../apis/location/getRegions.ts";
import RemoveSVG from '/src-icons/remove.svg'
import {removeRegionFilters, removeRoomFilters, resetAll} from "../../../features/filters/filterReducer.ts";


export default function Filters() {
    const [optionOpen, setOptionOpen] = useState<
        "region" | "pricing" | "area" | "rooms" | "none"
    >("none")
    const filterDispatch = useAppDispatch()
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search)
    const {data, isLoading} = useQuery({queryKey: ['regions'], queryFn: getRegions,})
    const filters = useAppSelector(s => s.filters)
    const filtersAvailable = filters.regionFilters.length + filters.areaFilter.length + filters.priceFilter.length + filters.roomFilters.length !== 0

    return <section className={filterStyles['filterWrapper']}>
        <div className={filterStyles['filtersCreate']}>
            <div className={filterStyles['filterOptions']}>
                <RegionFilter params={urlParams} regionsData={data?.data ? data.data : []} isLoading={isLoading}
                              visible={{status: optionOpen === 'region', makeVisible: setOptionOpen}}/>
                <Pricing/>
                <Area/>
                <Rooms params={urlParams} visible={{status: optionOpen === 'rooms', makeVisible: setOptionOpen}}/>
            </div>

            <div className={filterStyles['create']}>
                <Link to={'/add-listing'}><img src={AddIconWhiteSVG} width={12} alt={'Add icon'}/><p>ლისტინგის
                    დამატება</p></Link>
                <Link to={'/add-agent'}><img src={AddIconOrangeSVG} width={12} alt={'Add icon'}/><p>აგენტის
                    დამატება</p></Link>

            </div>
        </div>

        {filtersAvailable && <div className={filterStyles['selectedFilters']}>
            {filters.regionFilters.map((eachRegionFilter) =>
                <div key={eachRegionFilter.id}
                     onClick={() => filterDispatch(removeRegionFilters(filters.regionFilters.filter(r => r.id !== eachRegionFilter.id)))}
                >
                    <p>{eachRegionFilter.name}</p>
                    <img src={RemoveSVG} width={12} alt={'Remove icon'}/>
                </div>
            )}

            {filters.roomFilters.map((eachRoom) =>
                <div key={eachRoom}
                onClick={() => filterDispatch(removeRoomFilters([...filters.roomFilters.filter(r => r !== eachRoom)]))}
                >
                    <p>{eachRoom}</p>
                    <img src={RemoveSVG} width={12} alt={'Remove icon'}/>
                </div>)
            }
            <button onClick={() => filterDispatch(resetAll({}))}>გასუფთავება</button>
        </div>}
    </section>
}