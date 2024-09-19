import {Listing} from "../../../../../types/listings.ts";
import homeListingStyles from '../../styles/homes.property.module.css';
import LocationSVG from '/src-icons/listing/location.svg'
import BedroomSVG from '/src-icons/listing/bedroom.svg'
import AreaSVG from '/src-icons/listing/area.svg'
import ZipCodeSVG from '/src-icons/listing/zipcode.svg'
import {Link} from "react-router-dom";

export default function Property({home}: { home: Listing }) {

    return <Link to={`/listings/${home.id}`} className={homeListingStyles['homeListingWrapper']}>
        <div className={homeListingStyles['homePicture']}>
            <p className={'isRental'}>{home.is_rental === 1 ? "ქირავდება" : "იყიდება"}</p>
            <img src={home.image} width={384} height={300} alt={"Home interior picture"}/>
        </div>

        <div className={homeListingStyles['homeDetails']}>
            <div className={homeListingStyles['priceLocation']}>
                <h3>{home.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')} ₾</h3>
                <div>
                    <img src={LocationSVG} width={20} alt={'Location icon'}/>
                    <p>{home.city.name}, {home.address.length > 20 ? home.address.substring(0, 15).concat('...') : home.address}</p>
                </div>
            </div>

            <div className={homeListingStyles['interiorInfo']}>
                <div>
                    <img src={BedroomSVG} width={20} alt={'Bedroom icon'}/>
                    <p>{home.bedrooms}</p>
                </div>

                <div>
                    <img src={AreaSVG} width={20} alt={'Area icon'}/>
                    <p>{home.area} <span>მ<sup>2</sup></span></p>
                </div>

                <div>
                    <img src={ZipCodeSVG} width={20} alt={'Zipcode icon'}/>
                    <p>{home.zip_code}</p>
                </div>
            </div>
        </div>
    </Link>

}