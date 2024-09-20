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
    const [carouselIndex, setCarouselIndex] = useState<[number, number]>([0, incrementor - 1])
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
        setCarouselIndex(() => [0, incrementor - 1])
    }, [incrementor, id]);
    const carouselListings = (incDec: 0 | 1) => {
        if (incDec === 1) {
            if (carouselIndex[1] + 1 < similarListings.length) {
                if (carouselIndex[0] + 1 >= similarListings.length) {
                    setCarouselIndex([0, incrementor - 1])
                } else {
                    setCarouselIndex([carouselIndex[0] + 1, carouselIndex[1] + 1])
                }
            } else {
                setCarouselIndex([incrementor - 1, 0])
            }


        }
        if (incDec === 0) {
            if (carouselIndex[0] - 1 >= 0) {
                if (carouselIndex[1] - 1 < 0) {
                    setCarouselIndex([similarListings.length - incrementor, similarListings.length - 1])
                } else {
                    setCarouselIndex([carouselIndex[0] - 1, carouselIndex[1] - 1])
                }
            } else {
                setCarouselIndex([similarListings.length - 1, similarListings.length - incrementor])
            }


        }
    }


    const handleCarousel = () => {
        const [startIndex, endIndex] = carouselIndex
        if (startIndex <= endIndex) {
            return similarListings.slice(startIndex, endIndex + 1)

        } else {
            return similarListings.slice(endIndex, startIndex + 1)
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