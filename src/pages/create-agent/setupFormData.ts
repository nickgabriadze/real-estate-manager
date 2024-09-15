import {AgentFormState} from "../../features/forms/agentFormReducer.ts";

export default function setupAgentFormData(agentDetails: AgentFormState) {

    const formData = new FormData()
    formData.append('name', String(agentDetails.name[0]))
    formData.append('surname', String(agentDetails.surname[0]))
    formData.append('phone', String(agentDetails.phone[0]))
    formData.append('email', String(agentDetails.email[0]))
    formData.append('avatar', agentDetails.avatar[0])

    return formData
}