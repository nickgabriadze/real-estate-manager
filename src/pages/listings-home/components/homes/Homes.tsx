import {useQuery} from "@tanstack/react-query";
import getListings from "../../../../apis/getListings.ts";
import HomeListing from "./components/Listing.tsx";
import homeStyles from '../styles/homes.module.css';


export default function Homes() {
    const homes = useQuery({
        queryKey: ['homeListings'],
        queryFn: getListings
    })

    const listings = homes.data?.data ? homes.data?.data : [];

    return <section className={homeStyles['listingsWrapper']}>{listings?.map(
        eachListing => <div key={eachListing.id}><HomeListing home={eachListing}/></div>)
    }</section>

}