import {useQuery} from "@tanstack/react-query";
import getListings from "../../../../apis/getListings.ts";
import Property from "./components/Property.tsx";
import homeStyles from '../styles/homes.module.css';
import {useAppSelector} from "../../../../hooks/redux.ts";


export default function Properties() {
    const homes = useQuery({
        queryKey: ['homeListings'],
        queryFn: getListings
    })
    const regionFilters = useAppSelector(s => s.filters.regionFilters).map((r) => r.id);


    const listings = homes.data?.data ? homes.data?.data : [];

    return <section className={homeStyles['listingsWrapper']}>{listings?.filter((l) => regionFilters.includes(l.city.region_id)).map(
        eachListing => <div key={eachListing.id}><Property home={eachListing}/></div>)
    }</section>

}