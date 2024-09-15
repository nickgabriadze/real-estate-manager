import axiosInstance from "../../axios.ts";

export default async function createListing(data: FormData){

    return await axiosInstance.post('/real-estates', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}