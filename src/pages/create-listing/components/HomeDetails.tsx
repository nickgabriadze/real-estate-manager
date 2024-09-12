import addListingStyles from '../addlisting.module.css'
import Input from "../../../global-components/Input.tsx";
import Textarea from "../../../global-components/Textarea.tsx";
import UploadPicture from "../../../global-components/UploadPicture.tsx";


export default function HomeDetails() {


    return <div className={addListingStyles['homeDetails']}>
        <h3>ბინის დეტალები</h3>

        <div className={addListingStyles['homeDetailInputs']}>
            <Input label={'ფასი'} type={'number'} required={false} validator={'მხოლოდ რიცხვები'}/>
            <Input label={'ფართობი'} type={'number'} required={false} validator={'მხოლოდ რიცხვები'}/>
            <Input label={'საძინებლების რაოდენობა'} type={'number'} required={true} validator={'მხოლოდ რიცხვები'}/>
        </div>

        <Textarea label={"აღწერა"} validator={"მინიმუმ 5 სიტყვა"} required={true}/>
        <UploadPicture label={'ატვირთეთ ფოტო'} required={true} />
    </div>

}