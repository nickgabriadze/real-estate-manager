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
    }, [listings.length, isLoading, region_id, id]);

    useEffect(() => {
        setCarouselIndex(() => [0, incrementor])
    }, [incrementor, id]);
    const carouselListings = (incDec: 0 | 1) => {
        if (incDec === 1) {
            if (carouselIndex[1] + 1 <= similarListings.length) {
                setCarouselIndex([carouselIndex[0] + 1, carouselIndex[1] + 1])
            } else {
                setCarouselIndex(prev => [prev[0] + 1, 0])
            }

            if (carouselIndex[0] + 1 > similarListings.length) {
                setCarouselIndex(prev => [0, prev[1]])
            }
        }
        if (incDec === 0) {
            if (carouselIndex[0] - 1 >= 0) {
                setCarouselIndex([carouselIndex[0] - 1, carouselIndex[1] - 1])
            } else {
                setCarouselIndex(prev => [similarListings.length, prev[1] - 1])
            }

            if (carouselIndex[1] - 1 < 0) {
                setCarouselIndex(prev => [prev[0], similarListings.length])

            }
        }
    }

    console.log(carouselIndex)
    const handleCarousel = () => {
        const [startIndex, endIndex] = carouselIndex
        const wrapperDiff = incrementor - 1 === startIndex - endIndex

        if (startIndex <= endIndex) {
            if (wrapperDiff) {
                return similarListings.slice(startIndex, endIndex - 1)
            } else {
                return similarListings.slice(startIndex, endIndex)
            }

        } else {
            if (wrapperDiff) {
                return similarListings.slice(endIndex, startIndex + 1)
            } else {
                return similarListings.slice(endIndex, startIndex)
            }
        }
    }

    return similarListings.length > 0 && <div className={similarListingsStyle['othersWrapper']}>
        <h3>ბინები მსგავს ლოკაციაზე</h3>

        <div className={similarListingsStyle['propertiesWrapper']}>
            <button
                className={`${similarListingsStyle['leftArrow']} ${similarListings.length <= incrementor && similarListingsStyle['arrowDisabled']}`}
                onClick={() => similarListings.length > incrementor && carouselListings(0)}
            ><img src={LeftArrowSVG} width={30} alt={'Left arrow icon'}/></button>
            <div className={similarListingsStyle['list']}
                 style={{gridTemplateColumns: `repeat(${incrementor}, minmax(${windowWidth * 0.8 / 350}px, 1fr))`}}>
                {handleCarousel().map(eachListing => <Property
                    key={eachListing.id}
                    home={eachListing}/>)}
            </div>
            <button
                className={`${similarListingsStyle['rightArrow']}  ${similarListings.length <= incrementor && similarListingsStyle['arrowDisabled']}`}
                onClick={() => similarListings.length > incrementor && carouselListings(1)}
            ><img src={LeftArrowSVG} width={30} alt={'Right arrow icon'}/></button>

        </div>
    </div>
}