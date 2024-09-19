import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import getListing from "../../apis/listing/getListing.ts";
import RealEstateDetails from "./components/RealEstateDetails.tsx";
import LeftArrowSVG from '/src-icons/arrow-left.svg'
import listingPageStyles from './styles/listingpage.module.css';
import PageNotFound404 from "../../404.tsx";
import OtherListings from "./components/OtherListings.tsx";

export default function ListingPage(){
    const {id} = useParams()
    const navigate = useNavigate()
    const listing = useQuery({
        queryKey: [id, 'realEstate'],
        queryFn: () => getListing(Number(id))
    })

    return listing.data?.status === 404 ? <PageNotFound404 /> : <>
        <Outlet />
        <div className={listingPageStyles['listingPageWrapper']}>
        <button
            onClick={() => navigate('/')}
            title={'დაბრუნება საწყის გვერდზე'}><img src={LeftArrowSVG} width={18} alt={'Left arrow icon'}/></button>
        {!listing.isLoading && listing.data && <RealEstateDetails property={listing?.data?.data}/>}
        <OtherListings region_id={Number(listing.data?.data.city.region_id)} />
    </div>
        </>
}

