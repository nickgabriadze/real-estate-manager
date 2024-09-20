import filterStyles from './styles/filters.module.css'
import RegionFilter from "./filter-options/RegionFilter.tsx";
import Rooms from "./filter-options/Rooms.tsx";
import Range from "./filter-options/Range.tsx";
import AddIconWhiteSVG from '/src-icons/add-white.svg'
import AddIconOrangeSVG from '/src-icons/add-orange.svg'
import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {useQuery} from "@tanstack/react-query";
import getRegions from "../../../apis/location/getRegions.ts";
import RemoveSVG from '/src-icons/remove.svg'
import {
    removeRegionFilters,
    removeRoomFilters,
    resetAll, resetAreaFilter, resetPriceFilter, setAreaFilter,
    setPriceFilter
} from "../../../features/filters/filterReducer.ts";


export default function Filters() {
    const [optionOpen, setOptionOpen] = useState<
        "region" | "pricing" | "area" | "rooms" | "none"
    >("none")
    const navigate = useNavigate()
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

                <Range
                    type={'pricing'}
                    setValue={setPriceFilter}
                    values={[50000, 100000, 150000, 200000, 300000]}
                    visible={{status: optionOpen === 'pricing', makeVisible: setOptionOpen}}
                    params={urlParams}/>
                <Range
                       values={[50, 100, 150, 200, 300]}
                       setValue={setAreaFilter}
                       type={'area'}
                       visible={{status: optionOpen === 'area', makeVisible: setOptionOpen}}
                       params={urlParams}/>

                <Rooms params={urlParams} visible={{status: optionOpen === 'rooms', makeVisible: setOptionOpen}}/>
            </div>

            <div className={filterStyles['create']}>
                <Link to={'/real-estate-manager/add-listing'}><img src={AddIconWhiteSVG} width={12} alt={'Add icon'}/><p>ლისტინგის
                    დამატება</p></Link>
                <Link to={'/real-estate-manager/add-agent'}><img src={AddIconOrangeSVG} width={12} alt={'Add icon'}/><p>აგენტის
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

            {filters.areaFilter.length === 2 &&
                <div
                    onClick={() => {
                        urlParams.delete('area_from')
                        urlParams.delete('area_to')
                        filterDispatch(resetAreaFilter({}))
                        navigate(`${location.pathname}?${urlParams.toString()}`);
                    }}
                >
                    <p>{filters.areaFilter[0]} <span>მ<sup>2</sup></span> - {filters.areaFilter[1]} <span>მ<sup>2</sup></span>
                    </p>
                    <img src={RemoveSVG} width={12} alt={'Remove icon'}/>
                </div>
            }

            {filters.priceFilter.length === 2 &&
                <div
                    onClick={() => {
                        urlParams.delete('pricing_from')
                        urlParams.delete('pricing_to')
                        filterDispatch(resetPriceFilter({}))
                        navigate(`${location.pathname}?${urlParams.toString()}`);
                    }}
                >
                    <p>{filters.priceFilter[0]}₾ - {filters.priceFilter[1]}₾</p>
                    <img src={RemoveSVG} width={12} alt={'Remove icon'}/>
                </div>
            }
            <button onClick={() => {

                filterDispatch(resetAll({}))
                navigate('/')
            }}>გასუფთავება
            </button>
        </div>}
    </section>
}