import {Listing} from "../../../types/listings.ts";
import propertyStyles from '../styles/listingpage.property.module.css'
import BedroomSVG from "/src-icons/listing/bedroom.svg";
import AreaSVG from "/src-icons/listing/area.svg";
import LocationSVG from "/src-icons/listing/location.svg";
import ZipCodeSVG from "/src-icons/listing/zipcode.svg";
import AgentCard from "./AgentCard.tsx";
import {Link} from "react-router-dom";

export default function RealEstateDetails({property}: { property: Listing }) {

    const formattedDate = new Date(property.created_at)
    const month = formattedDate.getMonth() > 9 ? `0${formattedDate.getMonth()}` : `${formattedDate.getMonth()}`
    const day = formattedDate.getDay() > 9 ? `0${formattedDate.getDate()}` : `${formattedDate.getDate()}`
    const year = formattedDate.getFullYear()

    const propertyDescription = property.description.length > 255 ? property.description.slice(0, 255).toString().concat('...') : property.description

    return <div className={propertyStyles['propertyWrapper']}>

        <div className={propertyStyles['imageWrapper']}>
            <div className={propertyStyles['image']}>
                <img src={property.image} alt={'Property image'}/>
                <p className={'isRentalListingPage'}>{property.is_rental === 1 ? 'ქირავდება' : 'იყიდება'}</p>
            </div>

            <p className={propertyStyles['publishedDate']}>გამოქვეყნების თარიღი <span>{`${day}/${month}/${year}`}</span>
            </p>
        </div>

        <div className={propertyStyles['detailsWrapper']}>
            <div className={propertyStyles['details']}>
                <h1>{property.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1, ')} ₾</h1>

                <div className={propertyStyles['interior']}>
                    <div>
                        <img src={LocationSVG} width={18} alt={'Location icon'} draggable={false}/>
                        <p>{property.city.name}, {property.address}</p>
                    </div>
                    <div>
                        <img src={AreaSVG} width={16} alt={'Area icon'} draggable={false}/>
                        <p>ფართი {property.area} <span>მ<sup>2</sup></span></p>
                    </div>
                    <div>
                        <img src={BedroomSVG} width={18} alt={'Bedroom icon'} draggable={false}/>
                        <p>საძინებელი {property.bedrooms}</p>
                    </div>
                    <div>
                        <img src={ZipCodeSVG} width={18} alt={'Zipcode icon'} draggable={false}/>
                        <p>საფოსტო ინდექსი {property.zip_code}</p>
                    </div>
                </div>
                <div className={propertyStyles['description']}><p>{propertyDescription}</p></div>

            </div>
            <div className={propertyStyles['agentSection']}>
                <AgentCard agent={property.agent}/>
                <Link className={propertyStyles['deleteListing']} to={`/listings/${property.id}/delete`}>ლისტინგის წაშლა</Link>
            </div>
        </div>


    </div>

}