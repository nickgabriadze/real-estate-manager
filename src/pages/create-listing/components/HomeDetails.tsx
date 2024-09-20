import addListingStyles from '../addlisting.module.css'
import Input from "../../../global-components/form/Input.tsx";
import Textarea from "../../../global-components/form/Textarea.tsx";
import UploadPicture from "../../../global-components/form/UploadPicture.tsx";
import {setArea, setBedrooms, setDescription, setListingImage, setPrice} from "../../../features/forms/listingFormReducer.ts";
import {useAppSelector} from "../../../hooks/redux.ts";


export default function HomeDetails() {
    const {price, bedrooms, area, description, image} = useAppSelector(s => s.listingForm)

    return <div className={addListingStyles['homeDetails']}>
        <h3>ბინის დეტალები</h3>

        <div className={addListingStyles['homeDetailInputs']}>
            <Input
                value={price}
                name={'price'}
                validationType={'ONLYNUMBERS'}
                setValue={setPrice}
                block={false}
                label={'ფასი'} required={true} validator={'მხოლოდ რიცხვები'}/>
            <Input
                value={area}
                name={'area'}
                block={false}
                setValue={setArea}
                validationType={'ONLYNUMBERS'}
                label={'ფართობი'} required={true} validator={'მხოლოდ რიცხვები'}/>
            <Input
                value={bedrooms}
                setValue={setBedrooms}
                name={'bedrooms'}
                block={false}
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
            block={false}
            setValue={setListingImage}
            label={'ატვირთეთ ფოტო'} required={true} />
    </div>

}