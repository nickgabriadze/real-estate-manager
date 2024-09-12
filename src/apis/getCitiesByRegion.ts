import axiosInstance from "../axios.ts";
import {Cities} from "../types/cities.ts";

export default function getCitiesByRegion(regionID: number): Promise<Cities> {
    const getCitiesAsync = async () => {
        const citiesRequest = await axiosInstance.get('/cities');
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