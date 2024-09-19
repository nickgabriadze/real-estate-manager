import {Validation} from "../../types/validationOptions.ts";
import {createSlice} from "@reduxjs/toolkit";

export type AgentFormState = { [key: string]: [string | File, Validation] }


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
        },
        checkForInvalidInputsAgent: (state, _) => {
            const values = Object.values(state)
            const keys = Object.keys(state)
            let newState = {...state}
            for (let i = 0; i < keys.length; i++) {
                const currentValue = values[i]
                if (Array.isArray(currentValue)) {
                    const notValid = currentValue[1] !== 'valid'
                    if (notValid) {
                        newState[`${keys[i]}`] = [currentValue[0], 'invalidForm']
                    }

                }
            }
            return {...newState}
        },

        resetAgentInfo: (_, __) => {
            return {
                name: ['', false],
                surname: ['', false],
                email: ['', false],
                phone: ['', false],
                avatar: ['', false],
            }
        }
    }
})
export const {
    setAgentName, setAgentAvatar,
    setAgentSurname,
    setAgentEmail, setAgentPhone,
    resetAgentInfo, checkForInvalidInputsAgent
} = agentFormSlice.actions;
export default agentFormSlice.reducer