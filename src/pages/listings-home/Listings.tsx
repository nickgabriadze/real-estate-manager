import Filters from "./components/Filters.tsx";
import {Outlet} from "react-router-dom";
import Homes from "./components/homes/Homes.tsx";

export default function Listings() {

    return <>

            <Outlet/>
            <Filters/>
            <Homes />
    </>
}