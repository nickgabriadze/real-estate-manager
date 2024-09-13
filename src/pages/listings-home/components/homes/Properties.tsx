import {useQuery} from "@tanstack/react-query";
import getListings from "../../../../apis/getListings.ts";
import Property from "./components/Property.tsx";
import homeStyles from '../styles/homes.module.css';


export default function Properties() {
    const homes = useQuery({
        queryKey: ['homeListings'],
        queryFn: getListings
    })

    const listings = homes.data?.data ? homes.data?.data : [];

    return <section className={homeStyles['listingsWrapper']}>{listings?.map(
        eachListing => <div key={eachListing.id}><Property home={eachListing}/></div>)
    }</section>

}