import axiosInstance from "../../axios.ts";

export default async function deleteListing(id: number){

    return await axiosInstance.delete(`/real-estates/${id}`)
}