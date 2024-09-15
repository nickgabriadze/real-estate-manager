import { configureStore } from '@reduxjs/toolkit'
import filterReducer from "./features/filters/filterReducer.ts"
import agentFormReducer from "./features/forms/agentFormReducer.ts";
import listingFormReducer from "./features/forms/listingFormReducer.ts";

export const store = configureStore({
    reducer: {
        filters: filterReducer,
        listingForm: listingFormReducer,
        agentForm: agentFormReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['agentForm/setAgentAvatar', 'listingForm/setListingImage'],
                ignoredPaths: ['agentForm.avatar', 'listingForm.image'],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch