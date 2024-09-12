import axiosInstance from "../axios.ts";
import {AxiosResponse} from "axios";
import {Regions} from "../types/regions.ts";

export default async function getRegions():Promise<AxiosResponse<Regions>>{

    return await axiosInstance.get('/regions')
}