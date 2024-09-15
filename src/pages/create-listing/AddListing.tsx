import addListingStyles from './addlisting.module.css'
import LocationDetails from "./components/LocationDetails.tsx";
import HomeDetails from "./components/HomeDetails.tsx";
import AgentDetails from "./components/AgentDetails.tsx";
import DealDetails from "./components/DealDetails.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {FormEvent, useState} from "react";
import setupFormData from "./setupFormData.ts";
import createListing from "../../apis/listing/createListing.tsx";
import {resetListingInfo} from "../../features/forms/listingFormReducer.ts";
import addAgentStyles from "../create-agent/addagent.module.css";

export default function AddListing() {
    const listingForm = useAppSelector(s => s.listingForm)
    const [listingSuccess, setListingSuccess] = useState<boolean | 'none'>('none')
    const [loading, setLoading] = useState<boolean>(false);
    const [formError, setFormError] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const handleListingForm = async (e: FormEvent) => {
        e.preventDefault()
        const allValid = listingForm.address[1] === 'valid' && listingForm.description[1] === 'valid' &&
            listingForm.bedrooms[1] === 'valid' && listingForm.area[1] === 'valid' && listingForm.image[1] === 'valid'
            && listingForm.price[1] === 'valid' && listingForm.zip_code[1] === 'valid';

        if (allValid) {

            setLoading(true)
            const data = setupFormData(listingForm)
            const request = await createListing(data)

            if (request.status === 201) {
                setListingSuccess(true)
                dispatch(resetListingInfo({}))
                setLoading(false)
            } else {
                setListingSuccess(false)
                setLoading(false)
            }
            setTimeout(() => setListingSuccess('none'), 5000)
        } else {
            if (!formError) {
                setFormError(true)
                setTimeout(() => setFormError(false), 3000)
            }
        }
    }


    return (<form className={addListingStyles['addListingWrapper']} onSubmit={handleListingForm}>
        <h1>ლისტინგის დამატება</h1>


        <DealDetails/>
        <LocationDetails/>
        <HomeDetails/>
        <AgentDetails/>


        {loading &&
            <div className={addAgentStyles['agentAdd']}><p className={addAgentStyles['loading']}>მოთხოვნა მიღებულია,
                გთხვოთ დაელოდოთ</p></div>}
        {formError && <div className={addAgentStyles['agentAdd']}>
            <p className={addAgentStyles['agentError']} style={{fontWeight: '600'}}>გთხოვთ შეავსოთ ყველა ველი
                მოთხოვნის შესაბამისად!</p>
        </div>}
        {listingSuccess !== 'none' && <div className={addAgentStyles['agentAdd']}>
            {listingSuccess && <p className={addAgentStyles['agentSuccess']}>ლისტინგი წარმატებით დაემატა!</p>}
            {!listingSuccess &&
                <p className={addAgentStyles['agentError']}>ლისტინგის დამატება ვერ მოხერხდა, ცადეთ მოგვიანებით</p>}
        </div>}
        <div className={addListingStyles['formButtons']}>
            <button type={'reset'}
                    onClick={() => dispatch(resetListingInfo({}))}
            >გაუქმება
            </button>
            <button type={'submit'}>დაამატე ლისტინგი</button>
        </div>
    </form>)

}


