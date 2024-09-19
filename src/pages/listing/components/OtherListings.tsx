import similarListingsStyle from '../styles/listingpage.others.module.css'
import LeftArrowSVG from "/src-icons/arrow-left.svg";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {useQuery} from "@tanstack/react-query";
import getListings from "../../../apis/listing/getListings.ts";
import {useEffect, useState} from "react";
import {addListingsBulk} from "../../../features/listings/listingReducer.ts";
import Property from "../../listings-home/components/homes/components/Property.tsx";
import {useParams} from "react-router-dom";
import useWindowWidth from "../../../hooks/useWindowWitdth.ts";


export default function OtherListings({region_id}: { region_id: number }) {
    const {id} = useParams()
    const listings = useAppSelector(s => s.listings)
    const similarListings = listings.filter(l => l.city.region_id === region_id && l.id !== Number(id))
    const dispatch = useAppDispatch()
    const windowWidth = useWindowWidth()
    const incrementor = Math.max(1, (Math.floor((windowWidth * 0.8) / 350)))

    const [carouselIndex, setCarouselIndex] = useState<[number, number]>([0, incrementor])
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

    useEffect(() => {
        setCarouselIndex(() => [0, incrementor])
    }, [incrementor, id]);

    return similarListings.length > 0 && <div className={similarListingsStyle['othersWrapper']}>
        <h3>ბინები მსგავს ლოკაციაზე</h3>

        <div className={similarListingsStyle['propertiesWrapper']}>
            <button
                className={`${similarListingsStyle['leftArrow']} ${carouselIndex[0] === 0 && similarListingsStyle['arrowDisabled']}`}
                onClick={() => {
                    if (carouselIndex[0] === 0) return;
                    else {
                        if (carouselIndex[0] - incrementor >= 0) {
                            setCarouselIndex((prev) => [prev[0] - incrementor, prev[0]])
                        } else {

                            setCarouselIndex([0, incrementor]);
                        }
                    }
                }}
            ><img src={LeftArrowSVG} width={30} alt={'Left arrow icon'}/></button>
            <div className={similarListingsStyle['list']} style={{gridTemplateColumns: `repeat(${incrementor}, minmax(380px, 1fr))`}}>
                {similarListings.slice(carouselIndex[0], carouselIndex[1]).map(eachListing => <Property
                    key={eachListing.id}
                    home={eachListing}/>)}
            </div>
            <button
                className={`${similarListingsStyle['rightArrow']} ${carouselIndex[1] >= similarListings.length && similarListingsStyle['arrowDisabled']}`}
                onClick={() => {
                    if (carouselIndex[1] >= similarListings.length) return;
                    else {
                        if (carouselIndex[1] + incrementor <= similarListings.length) {
                            setCarouselIndex((prev) => [prev[1], prev[1] + incrementor])
                        } else {
                            const diff = similarListings.length - carouselIndex[1]
                            setCarouselIndex(prev => [prev[1], prev[1] + diff])
                        }
                    }
                }}
            ><img src={LeftArrowSVG} width={30} alt={'Right arrow icon'}/></button>

        </div>
    </div>
}