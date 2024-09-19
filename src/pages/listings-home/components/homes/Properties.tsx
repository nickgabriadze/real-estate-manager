import {useQuery} from "@tanstack/react-query";
import getListings from "../../../../apis/listing/getListings.ts";
import Property from "./components/Property.tsx";
import homeStyles from '../styles/homes.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux.ts";
import {setTotalAvailableRooms} from "../../../../features/filters/filterReducer.ts";
import {useEffect} from "react";
import {addListingsBulk} from "../../../../features/listings/listingReducer.ts";
import {LoadingProperty} from "../../../../global-components/skeleton/LoadingProperty.tsx";


export default function Properties() {

    const homes = useQuery({
        queryKey: ['homeListings'],
        queryFn: getListings,
    })
    const regionFilters = useAppSelector(s => s.filters.regionFilters).map((r) => r.id);
    const roomFilters = useAppSelector(s => s.filters.roomFilters)
    const areaFilters = useAppSelector(s => s.filters.areaFilter)
    const priceFilters = useAppSelector(s => s.filters.priceFilter)
    const dispatch = useAppDispatch()

    const listings = homes.data?.data ? homes.data.data : []

    useEffect(() => {
        if (!homes.isLoading && homes.data?.data) {
            dispatch(setTotalAvailableRooms(Array.from(new Set(homes.data.data.map(l => l.bedrooms)))))
            dispatch(addListingsBulk(homes.data.data))
        }
    }, [homes.isLoading]);

    const filters = useAppSelector(s => s.filters)
    const filtersAvailable = filters.regionFilters.length + filters.areaFilter.length + filters.priceFilter.length + filters.roomFilters.length !== 0

    const filtered = listings?.filter((l) => regionFilters.includes(l.city.region_id) || roomFilters.includes(l.bedrooms)
        || (priceFilters.length === 2 && l.price > priceFilters[0] && l.price < priceFilters[1])
        || (areaFilters.length === 2 && l.area > areaFilters[0] && l.area < areaFilters[1])
    )


    return homes.isLoading ?
        <div className={homeStyles['listingsWrapper']}>{Array.from({length: 30}).map((_, i) => <LoadingProperty
            key={i}/>)}</div> : filtered.length === 0 && filtersAvailable ?
            <p style={{'color': '#021526CC', fontWeight: '600'}}>აღნიშნული მონაცემებით განცხადება არ იძებნება</p> :
            <section
                className={homeStyles['listingsWrapper']}>{filtersAvailable ? filtered.map(
                    eachListing => <div key={eachListing.id}><Property home={eachListing}/></div>) :
                listings.map(
                    eachListing => <div key={eachListing.id}><Property home={eachListing}/></div>
                )
            }</section>

}