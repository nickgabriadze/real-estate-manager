import Filters from "./components/Filters.tsx";
import {Outlet} from "react-router-dom";

export default function Listings(){

    return <>

        <Outlet />
        <Filters />
    </>
}