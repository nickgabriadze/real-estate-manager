import {Validation} from "../../types/validationOptions.ts";
import {createSlice} from "@reduxjs/toolkit";

interface ListingForm {
    is_rental: 1 | 0,
    address: [string, Validation],
    zip_code: [string, Validation],
    region: number,
    city: number,
    price: [string, Validation],
    area: [string, Validation],
    bedrooms: [string, Validation],
    description: [string, Validation],
    agent_id: number,

}


const initialState:ListingForm = {
    is_rental: 0,
    address: ['', false],
    zip_code: ['', false],
    region: 1,
    city: 1,
    price: ['', false],
    area: ['', false],
    bedrooms: ['', false],
    description: ['', false],
    agent_id: 0,

}

const listingFormSlice = createSlice({
    name: "listingForm",
    initialState,
    reducers: {
        setRental: (state, action: {payload: 1 | 0}) =>  {
            return {...state, is_rental: action.payload}
        },
        setRegion:(state, action: {payload: number}) =>  {
            return {...state, region: action.payload}
        },
        setCity: (state, action: {payload: number}) =>  {
            return {...state, city: action.payload}
        },
        setAgentId: (state, action: {payload: number}) =>  {
            return {...state, agent_id: action.payload}
        },
        setAddress: (state, action: {payload: [string, Validation]}) =>  {
            return {...state, address: action.payload}
        },
        setDescription: (state, action: {payload: [string, Validation]}) =>  {
            return {...state, description: action.payload}
        },
        setArea: (state, action: {payload: [string, Validation]}) =>  {
            return {...state, area: action.payload}
        },
        setPrice: (state, action:{payload: [string, Validation]}) =>  {
            return {...state, price: action.payload}
        },
        setBedrooms: (state, action: {payload: [string, Validation]}) =>  {
            return {...state, bedrooms: action.payload}
        },
        setZipCode: (state, action: {payload: [string, Validation]}) =>  {
            return {...state, zip_code: action.payload}
        }


    }
})

export const {
    setArea,setAddress, setCity,
    setDescription,setBedrooms,setPrice,setRegion,
    setZipCode,setAgentId,setRental,

} = listingFormSlice.actions
export default listingFormSlice.reducer
