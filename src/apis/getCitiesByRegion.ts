import {Cities} from "../types/cities.ts";
import axios from "axios";

export default function getCitiesByRegion(regionID: number): Promise<Cities> {
    const getCitiesAsync = async () => {
        const citiesRequest = await axios.get('https://api.real-estate-manager.redberryinternship.ge/api/cities');
        const citiesData: Cities = citiesRequest.data;


        const regionMatches: Cities = []

        for (const city of citiesData) {
            if (city.region_id === regionID) {
                regionMatches.push(city)
            }
        }

        return regionMatches
    }
    return getCitiesAsync()

}