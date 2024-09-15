import addAgentStyles from './addagent.module.css'
import UploadPicture from "../../global-components/UploadPicture.tsx";
import Input from "../../global-components/Input.tsx";
import addListingStyles from "../create-listing/addlisting.module.css";
import useClickOutside from "../../hooks/useClickOutside.ts";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux.ts";
import {setAgentEmail, setAgentName, setAgentPhone, setAgentSurname} from "../../features/forms/agentFormReducer.ts";


export default function AddAgent() {
    const navigate = useNavigate();
    const handleClickOutside = () => {
        navigate(-1)
    }


    const agentDetails = useAppSelector(s => s.agentForm)
    const agentFormClickOutsideRef = useClickOutside(handleClickOutside)
    return <section className={addAgentStyles['agentFormWrapper']} ref={agentFormClickOutsideRef}>
        <h1>აგენტის დამატება</h1>

        <form>
            <div className={addAgentStyles['inputInformation']}>
                <Input label={"სახელი"}
                       value={agentDetails.name}
                       setValue={setAgentName}
                       validator={"მინიმუმ ორი სიმბოლო"}
                       validationType={'MIN2CHARACTERS'}
                       type={"text"} required={true}/>
                <Input label={"გვარი"}
                       value={agentDetails.surname}
                       setValue={setAgentSurname}
                       validator={"მინიმუმ ორი სიმბოლო"}
                       validationType={'MIN2CHARACTERS'}
                       type={"text"} required={true}/>
                <Input label={"ელ-ფოსტა"}
                       value={agentDetails.email}
                       setValue={setAgentEmail}
                       validationType={'REDBERRYEMAIL'}
                       validator={"გამოიყენეთ @redberry.ge ფოსტა"} type={"email"} required={true}/>
                <Input label={"ტელეფონის ნომერი"}
                       value={agentDetails.phone}
                       setValue={setAgentPhone}
                       validationType={"PHONE"}
                       validator={"მხოლოდ რიცხვები"} type={"text"} required={true}/>

            </div>
            <UploadPicture label={'ატვირთეთ ფოტო'} required={true}/>

            <div className={addListingStyles['formButtons']}>
                <button type={'reset'}>გაუქმება</button>
                <button type={'submit'}>დაამატე აგენტი</button>
            </div>
        </form>
    </section>
}