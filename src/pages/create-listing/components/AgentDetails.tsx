import addListingStyles from "../addlisting.module.css";
import {useQuery} from "@tanstack/react-query";
import getAgents from "../../../apis/agent/getAgents.ts";
import Select from "../../../global-components/Select.tsx";
import {useState} from "react";

export default function AgentDetails() {
    const {data} = useQuery({
        queryKey: ['agents'],
        queryFn: getAgents
    })
    const agents = data?.data ? data?.data.map((a) => {
        return {
            ...a,
            name: a.name.concat(` ${a.surname}`)
        }
    }) : []
    const [_, setSelectedAgent] = useState<number>(-1)

    return <div className={addListingStyles['agents']}>
        <h3>აგენტი</h3>
        <Select data={agents} label={'აირჩიე'} selectOption={setSelectedAgent}/>

    </div>
}