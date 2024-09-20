import addListingStyles from './addlisting.module.css'
import LocationDetails from "./components/LocationDetails.tsx";
import HomeDetails from "./components/HomeDetails.tsx";
import AgentDetails from "./components/AgentDetails.tsx";
import DealDetails from "./components/DealDetails.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {FormEvent, useState} from "react";
import setupFormData from "./functions/setupFormData.ts";
import createListing from "../../apis/listing/createListing.tsx";
import {checkForInvalidInputs, resetListingInfo} from "../../features/forms/listingFormReducer.ts";
import addAgentStyles from "../create-agent/addagent.module.css";
import {Link} from "react-router-dom";

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
            && listingForm.price[1] === 'valid' && listingForm.zip_code[1] === 'valid'
                && listingForm.region[0] !== -1 && listingForm.city[0] !== - 1 && listingForm.agent_id[0] !== -1;
        dispatch(checkForInvalidInputs({}))

        if (allValid) {

            setLoading(true)
            const data = setupFormData(listingForm)
            const request = await createListing(data)

            if (request.status === 201) {
                setListingSuccess(true)
                sessionStorage.clear()
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


    return (<form
        name={'Listing Form'}
        className={addListingStyles['addListingWrapper']} onSubmit={handleListingForm}>
        <h1>ლისტინგის დამატება</h1>

        <div className={addListingStyles['listingFormInformationWrapper']}>
            <DealDetails/>
            <LocationDetails/>
            <HomeDetails/>
            <AgentDetails/>
        </div>

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
            <Link to={'/real-estate-manager/'}
                    onClick={() => {
                        dispatch(resetListingInfo({}))
                        sessionStorage.clear()
                    }}
            >გაუქმება
            </Link>
            <button type={'submit'}>დაამატე ლისტინგი</button>
        </div>
    </form>)

}


