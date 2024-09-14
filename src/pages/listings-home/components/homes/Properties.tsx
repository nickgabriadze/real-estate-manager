import {useQuery} from "@tanstack/react-query";
import getListings from "../../../../apis/getListings.ts";
import Property from "./components/Property.tsx";
import homeStyles from '../styles/homes.module.css';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux.ts";
import {setTotalAvailableRooms} from "../../../../features/filters/filterReducer.ts";
import {useEffect} from "react";


export default function Properties() {
    const homes = useQuery({
        queryKey: ['homeListings'],
        queryFn: getListings
    })
    const regionFilters = useAppSelector(s => s.filters.regionFilters).map((r) => r.id);
    const roomFilters = useAppSelector(s => s.filters.roomFilters)
    const filterDispatch = useAppDispatch()

    const listings = homes.data?.data ? homes.data?.data : [];

    useEffect(() => {
            filterDispatch(setTotalAvailableRooms(Array.from(new Set(listings.map(l => l.bedrooms)))))
    }, [homes.isLoading]);

    const filters = useAppSelector(s => s.filters)
    const filtersAvailable = filters.regionFilters.length + filters.areaFilter.length + filters.priceFilter.length + filters.roomFilters.length !== 0


    return <section
        className={homeStyles['listingsWrapper']}>{filtersAvailable ? listings?.filter((l) => regionFilters.includes(l.city.region_id) || roomFilters.includes(l.bedrooms) ).map(
            eachListing => <div key={eachListing.id}><Property home={eachListing}/></div>) :
        listings.map(
            eachListing => <div key={eachListing.id}><Property home={eachListing}/></div>
        )
    }</section>

}