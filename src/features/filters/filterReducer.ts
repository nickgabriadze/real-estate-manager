import {createSlice } from "@reduxjs/toolkit";
import {Region} from "../../types/regions.ts";

interface FilterState {
    regionFilters: Region[],
    priceFilter: [number, number] | [],
    roomFilters: number[],
    areaFilter: [number, number] | []
}

type MinMax = {
    payload: {
        min: number,
        max: number
    }
}

const initialState: FilterState = {
    regionFilters: [],
    priceFilter: [],
    roomFilters: [],
    areaFilter: [],
}


const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        addRegionFilters: (state, action: { payload: Region[] }) => {
            return {
                ...state,
                regionFilters: [...action.payload]
            }
        },

        removeRegionFilters: (state, action: { payload: Region[] }) => {
            return {
                ...state,
                regionFilters: [...action.payload]
            }
        },

        setPriceFilter: (state, action: MinMax) => {
            return {
                ...state,
                priceFilter: [action.payload.min, action.payload.max],
            }
        },

        resetPriceFilter: (state, _) => {
            return {
                ...state,
                priceFilter: []
            }
        },

        addRoomFilters: (state, action: { payload: number }) => {
            return {
                ...state,
                roomFilters: [...state.roomFilters, action.payload]
            }
        },

        removeRoomFilters: (state, action: { payload: number }) => {
            return {
                ...state,
                roomFilters: [...state.roomFilters.filter(n => n !== action.payload)]
            }
        },

        setAreaFilter: (state, action: MinMax) => {
            return {
                ...state,
                areaFilter: [action.payload.min, action.payload.max]
            }
        },
        resetAreaFilter: (state, _) => {
            return {
                ...state,
                areaFilter: []
            }
        },

        resetAll: (_, __) => {
            return {
                regionFilters: [],
                areaFilter: [],
                roomFilters: [],
                priceFilter: []

            }
        }
    }

})

export const {addRegionFilters, removeRegionFilters, resetAll} = filterSlice.actions
export default filterSlice.reducer