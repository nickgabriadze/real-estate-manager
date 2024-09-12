import addListingStyles from "../addlisting.module.css";
import Select from "../../../global-components/Select.tsx";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import getRegions from "../../../apis/getRegions.ts";
import getCitiesByRegion from "../../../apis/getCitiesByRegion.ts";
import Input from "../../../global-components/Input.tsx";

export default function LocationDetails() {


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
                <Input label={'მისამართი'} type={'text'} required={true} validator={'მინიმუმ ორი სიმბოლო'}/>
                <Input label={'საფოსტო ინდექსი'} type={'number'} required={true} validator={'მხოლოდ რიცხვები'}/>
            </div>
            <div className={addListingStyles['detailsLocationSelect']}>
                <Select data={isLoading ? [{id: -1, name: 'რეგიონი'}] : regions} label={'რეგიონი'}
                        selectOption={setSelectedRegionID}
                />

                <Select data={cities} label={'ქალაქი'} selectOption={setSelectedCity}/>
            </div>
        </div>)
}