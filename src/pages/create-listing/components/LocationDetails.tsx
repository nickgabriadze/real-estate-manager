import addListingStyles from "../addlisting.module.css";
import Select from "../../../global-components/Select.tsx";
import {useQuery} from "@tanstack/react-query";
import getRegions from "../../../apis/location/getRegions.ts";
import getCitiesByRegion from "../../../apis/location/getCitiesByRegion.ts";
import Input from "../../../global-components/Input.tsx";
import {useAppSelector} from "../../../hooks/redux.ts";
import {setAddress, setCity, setRegion, setZipCode} from "../../../features/forms/listingFormReducer.ts";

export default function LocationDetails() {
    const {address, zip_code, region, city} = useAppSelector(s => s.listingForm)
    const {data, isLoading} = useQuery({queryKey: ['regions'], queryFn: getRegions})
    const citiesData = useQuery({
        queryKey: ['getCitiesByRegion', region],
        queryFn: () => getCitiesByRegion(region)
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
                    label={'საფოსტო ინდექსი'} required={true} validator={'მხოლოდ რიცხვები'}/>
            </div>
            <div className={addListingStyles['detailsLocationSelect']}>
                <Select
                    value={region}
                    setValue={setRegion}
                    loading={isLoading} data={isLoading ? [{id: -1, name: 'რეგიონი'}] : regions} label={'რეგიონი'}
                />

                <Select loading={isLoading}
                        value={city}
                        forCity={region}
                        setValue={setCity}
                        data={isLoading ? [{id: -1, name: 'ქალაქი'}] : cities}
                        label={'ქალაქი'}/>
            </div>
        </div>)
}