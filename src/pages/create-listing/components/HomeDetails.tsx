import addListingStyles from '../addlisting.module.css'
import Input from "../../../global-components/Input.tsx";
import Textarea from "../../../global-components/Textarea.tsx";
import UploadPicture from "../../../global-components/UploadPicture.tsx";
import {setArea, setBedrooms, setDescription, setPrice} from "../../../features/forms/listingFormReducer..ts";
import {useAppSelector} from "../../../hooks/redux.ts";


export default function HomeDetails() {
    const {price, bedrooms, area, description} = useAppSelector(s => s.listingForm)

    return <div className={addListingStyles['homeDetails']}>
        <h3>ბინის დეტალები</h3>

        <div className={addListingStyles['homeDetailInputs']}>
            <Input
                value={price}
                validationType={'ONLYNUMBERS'}
                setValue={setPrice}
                label={'ფასი'} type={'text'} required={false} validator={'მხოლოდ რიცხვები'}/>
            <Input
                value={area}
                setValue={setArea}
                validationType={'ONLYNUMBERS'}
                label={'ფართობი'} type={'text'} required={false} validator={'მხოლოდ რიცხვები'}/>
            <Input
                value={bedrooms}
                setValue={setBedrooms}
                validationType={'ONLYNUMBERS'}
                label={'საძინებლების რაოდენობა'} type={'text'} required={true} validator={'მხოლოდ რიცხვები'}/>
        </div>

        <Textarea
            value={description}
            setValue={setDescription}
            validationType={"MIN5WORDS"}
            label={"აღწერა"} validator={"მინიმუმ 5 სიტყვა"} required={true}/>
        <UploadPicture label={'ატვირთეთ ფოტო'} required={true} />
    </div>

}