import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import getListing from "../../apis/getListing.ts";
import RealEstateDetails from "./components/RealEstateDetails.tsx";
// import OtherListings from "./components/OtherListings.tsx";
import LeftArrowSVG from '/src-icons/arrow-left.svg'
import listingPageStyles from './styles/listingpage.module.css';

export default function ListingPage(){
    const {id} = useParams()
    const navigate = useNavigate()
    const listing = useQuery({
        queryKey: [id, 'realEstate'],
        queryFn: () => getListing(Number(id))
    })


    return <>
        <Outlet />
        <div className={listingPageStyles['listingPageWrapper']}>
        <button
            onClick={() => navigate(-1)}
            title={'Go Back'}><img src={LeftArrowSVG} width={18} alt={'Left arrow icon'}/></button>
        {!listing.isLoading && listing.data && <RealEstateDetails property={listing?.data?.data}/>}
        {/*<OtherListings />*/}
    </div>
        </>
}

