import addListingStyles from "../addlisting.module.css";
import Select from "../../../global-components/Select.tsx";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import getRegions from "../../../apis/location/getRegions.ts";
import getCitiesByRegion from "../../../apis/location/getCitiesByRegion.ts";
import Input from "../../../global-components/Input.tsx";
import {useAppSelector} from "../../../hooks/redux.ts";
import {setAddress, setZipCode} from "../../../features/forms/listingFormReducer..ts";

export default function LocationDetails() {
    const {address, zip_code} = useAppSelector( s=> s.listingForm)
    const [selectedRegionID, setSelectedRegionID] = useState<number>(1)
    const [_, setSelectedCity] = useState<number>(1)
    const {data, isLoading} = useQuery({queryKey: ['regions'], queryFn: getRegions})
    const citiesData = useQuery({
        queryKey: ['getCitiesByRegion', selectedRegionID],
        queryFn: () => getCitiesByRegion(selectedRegionID)
    })

    const regions = data?.data ? data?.data : []
    const cities = citiesData.data ? citiesData.data : []


    return (
        <div className={addListingStyles['location']}>
            <h3>მდებარეობა</h3>
            <div className={addListingStyles['detailInputs']}>
                <Input label={'მისამართი'}
                       value={address}
                       validationType={'MIN2CHARACTERS'}
                       setValue={setAddress}
                        required={true} validator={'მინიმუმ ორი სიმბოლო'}/>
                <Input
                    value={zip_code}
                    setValue={setZipCode}
                    validationType={"ONLYNUMBERS"}
                    label={'საფოსტო ინდექსი'}  required={true} validator={'მხოლოდ რიცხვები'}/>
            </div>
            <div className={addListingStyles['detailsLocationSelect']}>
                <Select data={isLoading ? [{id: -1, name: 'რეგიონი'}] : regions} label={'რეგიონი'}
                        selectOption={setSelectedRegionID}
                />

                <Select data={cities} label={'ქალაქი'} selectOption={setSelectedCity}/>
            </div>
        </div>)
}