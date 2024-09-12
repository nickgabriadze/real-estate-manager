import addAgentStyles from './addagent.module.css'
import UploadPicture from "../../global-components/UploadPicture.tsx";
import Input from "../../global-components/Input.tsx";
import addListingStyles from "../create-listing/addlisting.module.css";
import useClickOutside from "../../hooks/useClickOutside.ts";
import {useNavigate} from "react-router-dom";


export default function AddAgent() {
    const navigate = useNavigate();
    const handleClickOutside = () => {
            navigate(-1)
    }
    const agentFormClickOutsideRef = useClickOutside(handleClickOutside)
    return <section className={addAgentStyles['agentFormWrapper']} ref={agentFormClickOutsideRef}>
            <h1>აგენტის დამატება</h1>

        <form>
            <div className={addAgentStyles['inputInformation']}>
                <Input label={"სახელი"} validator={"მინიმუმ ორი სიმბოლო"} type={"text"} required={true}/>
                <Input label={"გვარი"} validator={"მინიმუმ ორი სიმბოლო"} type={"text"} required={false}/>
                <Input label={"ელ-ფოსტა"} validator={"გამოიყენეთ @redberry.ge ფოსტა"} type={"email"} required={true}/>
                <Input label={"ტელეფონის ნომერი"} validator={"მხოლოდ რიცხვები"} type={"number"} required={true}/>

            </div>
            <UploadPicture label={'ატვირთეთ ფოტო'} required={true}/>

            <div className={addListingStyles['formButtons']}>
                <button type={'reset'}>გაუქმება</button>
                <button type={'submit'}>დაამატე აგენტი</button>
            </div>
        </form>
    </section>
}