import axiosInstance from "../axios.ts";

export default async function getListings(){

    return await axiosInstance.get('/real-estates')
}