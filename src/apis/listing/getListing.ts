import axiosInstance from "../../axios.ts";
import {AxiosResponse} from "axios";
import {Listing} from "../../types/listings.ts";

export default async function getListing(id: number):Promise<AxiosResponse<Listing>> {
    try {
        return await axiosInstance.get(`/real-estates/${id}`);
    } catch (error:any) {
        return error
    }

}