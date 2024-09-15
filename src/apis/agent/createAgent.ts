import axiosInstance from "../../axios.ts";

export default async function createAgent(agent: FormData){


    return await axiosInstance.post('/agents', agent, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}