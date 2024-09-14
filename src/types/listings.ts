import {City} from "./cities.ts";
import {Region} from "./regions.ts";
import {Agent} from "./agents.ts";

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
    created_at: string
    city: City & { region: Region },
    description: string,
    agent_id :number,
    agent: Agent

}

export type Listings = Listing[]