import {Listings} from "../../types/listings.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState: Listings = []


const listingsSlice = createSlice({
    name: "listings",
    initialState,
    reducers: {
        addListingsBulk: (_, action: { payload: Listings }) => {
            return action.payload
        }
    }
})

export const {addListingsBulk} = listingsSlice.actions

export default listingsSlice.reducer