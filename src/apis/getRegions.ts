import axios, {AxiosResponse} from "axios";
import {Regions} from "../types/regions.ts";

export default async function getRegions():Promise<AxiosResponse<Regions>>{

    return await axios.get('https://api.real-estate-manager.redberryinternship.ge/api/regions')
}