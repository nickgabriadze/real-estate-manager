import axiosInstance from "../axios.ts";
import {AxiosResponse} from "axios";
import {Listings} from "../types/listings.ts";

export default async function getListings():Promise<AxiosResponse<Listings>> {

    return await axiosInstance.get('/real-estates')
}