import {ListingForm} from "../../features/forms/listingFormReducer.ts";

export default function setupFormData(listingForm: ListingForm){
    const formData = new FormData()


    formData.append('is_rental', String(listingForm.is_rental))
    formData.append('address', listingForm.address[0])
    formData.append('zip_code', listingForm.zip_code[0])
    formData.append('region_id', String(listingForm.region))
    formData.append('city_id', String(listingForm.city))
    formData.append('price', String(listingForm.price[0]))
    formData.append('area', String(listingForm.area[0]))
    formData.append('bedrooms', String(listingForm.bedrooms[0]))
    formData.append('description', String(listingForm.description[0]))
    formData.append('agent_id', String(listingForm.agent_id))
    formData.append('image', listingForm.image[0])

    return formData
}