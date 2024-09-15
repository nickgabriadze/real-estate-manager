import addListingStyles from '../addlisting.module.css'
import Input from "../../../global-components/Input.tsx";
import Textarea from "../../../global-components/Textarea.tsx";
import UploadPicture from "../../../global-components/UploadPicture.tsx";
import {setArea, setBedrooms, setDescription, setListingImage, setPrice} from "../../../features/forms/listingFormReducer.ts";
import {useAppSelector} from "../../../hooks/redux.ts";


export default function HomeDetails() {
    const {price, bedrooms, area, description, image} = useAppSelector(s => s.listingForm)

    return <div className={addListingStyles['homeDetails']}>
        <h3>ბინის დეტალები</h3>

        <div className={addListingStyles['homeDetailInputs']}>
            <Input
                value={price}
                validationType={'ONLYNUMBERS'}
                setValue={setPrice}
                label={'ფასი'} required={false} validator={'მხოლოდ რიცხვები'}/>
            <Input
                value={area}
                setValue={setArea}
                validationType={'ONLYNUMBERS'}
                label={'ფართობი'} required={false} validator={'მხოლოდ რიცხვები'}/>
            <Input
                value={bedrooms}
                setValue={setBedrooms}
                validationType={'ONLYNUMBERS'}
                label={'საძინებლების რაოდენობა'}
                required={true} validator={'მხოლოდ რიცხვები'}/>
        </div>

        <Textarea
            value={description}
            setValue={setDescription}
            validationType={"MIN5WORDS"}
            label={"აღწერა"} validator={"მინიმუმ 5 სიტყვა"} required={true}/>
        <UploadPicture
            value={image}
            setValue={setListingImage}
            label={'ატვირთეთ ფოტო'} required={true} />
    </div>

}