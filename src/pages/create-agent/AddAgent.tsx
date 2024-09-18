import addAgentStyles from './addagent.module.css'
import UploadPicture from "../../global-components/UploadPicture.tsx";
import Input from "../../global-components/Input.tsx";
import addListingStyles from "../create-listing/addlisting.module.css";
import useClickOutside from "../../hooks/useClickOutside.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {
    resetAgentInfo,
    setAgentAvatar,
    setAgentEmail,
    setAgentName,
    setAgentPhone,
    setAgentSurname
} from "../../features/forms/agentFormReducer.ts";
import createAgent from "../../apis/agent/createAgent.ts";
import {FormEvent, useState} from "react";
import setupAgentFormData from "./setupFormData.ts";


export default function AddAgent() {
    const navigate = useNavigate();
    const handleClickOutside = () => {
        navigate(-1)
    }

    const dispatch = useAppDispatch()
    const agentDetails = useAppSelector(s => s.agentForm)
    const agentFormClickOutsideRef = useClickOutside(handleClickOutside)
    const [agentSuccess, setAgentSuccess] = useState<boolean | 'none'>('none')
    const [loading, setLoading] = useState<boolean>(false);
    const [formError, setFormError] = useState<boolean>(false)
    const handleFormRequest = async (e: FormEvent) => {
        e.preventDefault()
        const allValid = agentDetails.name[1] === 'valid' && agentDetails.surname[1] === 'valid'
            && agentDetails.phone[1] === 'valid' && agentDetails.avatar[1] === 'valid' &&
            agentDetails.email[1] === 'valid'

        if (allValid && !loading) {
            setLoading(true)
            const formData = setupAgentFormData(agentDetails)
            const request = await createAgent(formData);
            if (request.status === 201) {
                setAgentSuccess(true)
                dispatch(resetAgentInfo({}))
                setLoading(false)
            } else {
                setAgentSuccess(false)
                setLoading(false)
            }

            setTimeout(() => setAgentSuccess('none'), 5000)
        } else {
            if (!formError) {
                setFormError(true)
                setTimeout(() => setFormError(false), 3000)
            }
        }
    }
    return <section className={addAgentStyles['agentFormWrapper']} ref={agentFormClickOutsideRef}>
        <h1>აგენტის დამატება</h1>

        <form onSubmit={handleFormRequest}>
            <div className={addAgentStyles['inputInformation']}>
                <Input label={"სახელი"}
                       value={agentDetails.name}
                       setValue={setAgentName}
                       validator={"მინიმუმ ორი სიმბოლო"}
                       validationType={'MIN2CHARACTERS'}
                       required={true}/>
                <Input label={"გვარი"}
                       value={agentDetails.surname}
                       setValue={setAgentSurname}
                       validator={"მინიმუმ ორი სიმბოლო"}
                       validationType={'MIN2CHARACTERS'}
                       required={true}/>
                <Input label={"ელ-ფოსტა"}
                       value={agentDetails.email}
                       setValue={setAgentEmail}
                       validationType={'REDBERRYEMAIL'}
                       validator={"გამოიყენეთ @redberry.ge ფოსტა"} required={true}/>
                <Input label={"ტელეფონის ნომერი"}
                       value={agentDetails.phone}
                       setValue={setAgentPhone}
                       validationType={"PHONE"}
                       validator={"მხოლოდ რიცხვები"} required={true}/>

            </div>
            <UploadPicture value={agentDetails.avatar} setValue={setAgentAvatar} label={'ატვირთეთ ფოტო'}
                           required={true}/>


            {loading &&
                <div className={addAgentStyles['agentAdd']}><p className={addAgentStyles['loading']}>მოთხოვნა მიღებულია,
                    გთხვოთ დაელოდოთ</p></div>}
            {formError && <div className={addAgentStyles['agentAdd']}>
                <p className={addAgentStyles['agentError']} style={{fontWeight: '600'}}>გთხოვთ შეავსოთ ყველა ველი
                    მოთხოვნის შესაბამისად!</p>
            </div>}
            {agentSuccess !== 'none' && <div className={addAgentStyles['agentAdd']}>
                {agentSuccess && <p className={addAgentStyles['agentSuccess']}>აგენტი წარმატებით დაემატა!</p>}
                {!agentSuccess &&
                    <p className={addAgentStyles['agentError']}>აგენტის დამატება ვერ მოხერხდა, ცადეთ მოგვიანებით</p>}
            </div>}
            <div className={addListingStyles['formButtons']}>
                <button type={'button'}
                        onClick={() => {
                            dispatch(resetAgentInfo({}))
                            navigate(-1)
                        }}
                >გაუქმება
                </button>
                <button type={'submit'}>დაამატე აგენტი</button>
            </div>

        </form>
    </section>
}