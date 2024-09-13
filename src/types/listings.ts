import {City} from "./cities.ts";
import {Region} from "./regions.ts";

export type Listing = {
    id: number,
    address: string,
    zip_code: string,
    price: number,
    area: number,
    bedrooms: number,
    is_rental: 0 | 1,
    image: string,
    city_id: number,
    city: City & { region: Region }
}

export type Listings = Listing[]