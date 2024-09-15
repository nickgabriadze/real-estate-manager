import {Validation} from "../../types/validationOptions.ts";
import {createSlice} from "@reduxjs/toolkit";

type AgentFormState = { [key: string]: [string, Validation] }


const initialState: AgentFormState = {
    name: ['', false],
    surname: ['', false],
    email: ['', false],
    phone: ['', false],
    avatar: ['', false],
}

const agentFormSlice = createSlice({
    name: "agentForm",
    initialState,
    reducers: {
        setAgentName: (state, action: { payload: [string, Validation] }) => {
            console.log(action.payload)
            return {...state, name: action.payload}
        },

        setAgentSurname: (state, action: { payload: [string, Validation] }) => {
            return {...state, surname: action.payload}
        },

        setAgentEmail: (state, action: { payload: [string, Validation] }) => {
            return {...state, email: action.payload}
        },

        setAgentPhone: (state, action: { payload: [string, Validation] }) => {
            return {...state, phone: action.payload}
        },

        setAgentAvatar: (state, action: { payload: [string, Validation] }) => {
            return {...state, avatar: action.payload}
        }

    }
})
export const {
    setAgentName, setAgentAvatar,
    setAgentSurname,
    setAgentEmail, setAgentPhone
} = agentFormSlice.actions;
export default agentFormSlice.reducer