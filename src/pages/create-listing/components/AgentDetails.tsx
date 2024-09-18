import addListingStyles from "../addlisting.module.css";
import {useQuery} from "@tanstack/react-query";
import getAgents from "../../../apis/agent/getAgents.ts";
import Select from "../../../global-components/Select.tsx";
import {useAppSelector} from "../../../hooks/redux.ts";
import {setAgentId} from "../../../features/forms/listingFormReducer.ts";

export default function AgentDetails() {
    const {agent_id} = useAppSelector(s => s.listingForm)
    const {data, isLoading} = useQuery({
        queryKey: ['agents'],
        queryFn: getAgents
    })
    const agents = data?.data ? data?.data.map((a) => {
        return {
            ...a,
            name: a.name.concat(` ${a.surname}`)
        }
    }) : []



    return <div className={addListingStyles['agents']}>
        <h3>აგენტი</h3>
        <Select
            value={agent_id}
            setValue={setAgentId}
            loading={isLoading}
            forAgent={true}
            name={'agent_id'}
            data={isLoading ? [{name: 'აგენტი', id: -1}] : agents} label={'აირჩიე'}/>

    </div>
}