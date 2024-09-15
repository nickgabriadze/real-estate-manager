import similarListingsStyle from '../styles/listingpage.others.module.css'
import LeftArrowSVG from "/src-icons/arrow-left.svg";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {useQuery} from "@tanstack/react-query";
import getListings from "../../../apis/listing/getListings.ts";
import {useEffect, useState} from "react";
import {addListingsBulk} from "../../../features/listings/listingReducer.ts";
import Property from "../../listings-home/components/homes/components/Property.tsx";
import {useParams} from "react-router-dom";


export default function OtherListings({region_id}: { region_id: number }) {
    const {id} = useParams()
    const listings = useAppSelector(s => s.listings)
    const similarListings = listings.filter(l => l.city.region_id === region_id && l.id !== Number(id))
    const dispatch = useAppDispatch()
    const [carouselIndex, setCarouselIndex] = useState<[number, number]>([0, 3])

    const {data, isLoading} = useQuery({
        queryKey: ['realEstate', listings.length],
        queryFn: () => getListings(),
        enabled: listings.length === 0
    })

    useEffect(() => {
        if (listings.length === 0 && !isLoading && data?.data) {
            dispatch(addListingsBulk(data?.data))
        }
    }, [listings.length, isLoading]);
    return similarListings.length > 0 && <div className={similarListingsStyle['othersWrapper']}>
        <h3>ბინები მსგავს ლოკაციაზე</h3>

        <div className={similarListingsStyle['propertiesWrapper']}>
            <button className={similarListingsStyle['leftArrow']}
                    onClick={() => {
                        if (carouselIndex[0] - 4 >= 0) {
                            setCarouselIndex((prev) => [prev[0] - 4, prev[0] - 1])
                        } else {
                            setCarouselIndex([0, Math.min(3, similarListings.length - 1)]);
                        }
                    }}
            ><img src={LeftArrowSVG} width={30} alt={'Left arrow icon'}/></button>
            <div className={similarListingsStyle['list']}>
                {similarListings.slice(carouselIndex[0], carouselIndex[1] + 1).map(eachListing => <Property
                    key={eachListing.id}
                    home={eachListing}/>)}
            </div>
            <button className={similarListingsStyle['rightArrow']}
                    onClick={() => {
                        if (carouselIndex[1] + 4 < similarListings.length) {
                            setCarouselIndex((prev) => [prev[1], prev[1] + 4])
                        } else {
                            const remainder = similarListings.length - carouselIndex[1]
                            setCarouselIndex(prev => [prev[1] + remainder - 1, prev[1] + remainder])
                        }
                    }}
            ><img src={LeftArrowSVG} width={30} alt={'Right arrow icon'}/></button>

        </div>
    </div>
}