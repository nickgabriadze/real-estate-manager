import axiosInstance from "../../axios.ts";
import {AxiosResponse} from "axios";
import {Agents} from "../../types/agents.ts";

export default async function getAgents():Promise<AxiosResponse<Agents>>{


    return await axiosInstance.get('/agents');
}