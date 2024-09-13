import Filters from "./components/Filters.tsx";
import {Outlet} from "react-router-dom";
import Properties from "./components/homes/Properties.tsx";
import listingStyles from './components/styles/listings.module.css';

export default function Listings() {

    return <>
        <Outlet/>

        <div className={listingStyles['listingsPageWrapper']}>
            <Filters/>
            <Properties/>
        </div>
    </>
}