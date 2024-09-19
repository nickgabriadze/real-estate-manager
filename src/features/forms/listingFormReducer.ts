import {Validation} from "../../types/validationOptions.ts";
import {createSlice} from "@reduxjs/toolkit";

export interface LForm {
    [key: string]: (1 | 0) | [string | File | number, Validation]
}

export interface ListingForm extends LForm {
    'is_rental': 1 | 0,
    'address': [string, Validation],
    'zip_code': [string, Validation],
    'region': [number, Validation],
    'city': [number, Validation],
    'price': [string, Validation],
    'area': [string, Validation],
    'bedrooms': [string, Validation],
    'description': [string, Validation],
    'agent_id': [number, Validation],
    'image': [string | File, Validation]
}


const initialState: ListingForm = {
    is_rental: 0,
    address: ['', false],
    zip_code: ['', false],
    region: [-1, false],
    city: [-1, false],
    price: ['', false],
    area: ['', false],
    bedrooms: ['', false],
    description: ['', false],
    agent_id: [-1, false],
    image: ['', false]
}

const listingFormSlice = createSlice({
    name: "listingForm",
    initialState,
    reducers: {
        setRental: (state, action: { payload: 1 | 0 }) => {
            return {...state, is_rental: action.payload}
        },
        setRegion: (state, action: { payload: [number, Validation] }) => {
            return {...state, region: action.payload}
        },
        setCity: (state, action: { payload: [number, Validation] }) => {
            return {...state, city: action.payload}
        },
        setAgentId: (state, action: { payload: [number, Validation] }) => {
            return {...state, agent_id: action.payload}
        },
        setAddress: (state, action: { payload: [string, Validation] }) => {
            return {...state, address: action.payload}
        },
        setDescription: (state, action: { payload: [string, Validation] }) => {
            return {...state, description: action.payload}
        },
        setArea: (state, action: { payload: [string, Validation] }) => {
            return {...state, area: action.payload}
        },
        setPrice: (state, action: { payload: [string, Validation] }) => {
            return {...state, price: action.payload}
        },
        setBedrooms: (state, action: { payload: [string, Validation] }) => {
            return {...state, bedrooms: action.payload}
        },
        setZipCode: (state, action: { payload: [string, Validation] }) => {
            return {...state, zip_code: action.payload}
        },

        setListingImage: (state, action: { payload: [string | File, Validation] }) => {
            return {...state, image: action.payload}
        },

        resetListingInfo: (_, __) => {
            return {
                ...initialState
            }
        },

        checkForInvalidInputs: (state, _) => {
            const values = Object.values(state)
            const keys = Object.keys(state)
            let newState = {...state}
            for (let i = 1; i < keys.length; i++) {
                const currentValue = values[i]
                if (Array.isArray(currentValue)) {
                    const notValid = currentValue[1] !== 'valid'
                    if (notValid) {
                        newState[`${keys[i]}`] = [currentValue[0], 'invalidForm']
                    }

                }
            }
            return {...newState}
        }
    }
})

export const {
    setArea, setAddress, setCity,
    setDescription, setBedrooms, setPrice, setRegion,
    setZipCode, setAgentId, setRental,
    setListingImage, resetListingInfo, checkForInvalidInputs
} = listingFormSlice.actions
export default listingFormSlice.reducer
