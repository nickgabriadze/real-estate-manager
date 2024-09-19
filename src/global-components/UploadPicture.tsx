import uploadStyles from './styles/upload.module.css'
import AddCircleSVG from '/src-icons/add-circle.svg'
import {useEffect} from "react";
import DeleteImageSVG from '/src-icons/delete-bin.svg'
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "../hooks/redux.ts";

export default function UploadPicture({label, value, setValue, required}: {
    label: string,
    value: any,
    setValue: ActionCreatorWithPayload<any>,
    required: boolean
}) {
    const dispatch = useAppDispatch()
    const fileSize = Number(value[0]?.size) / (1024 ** 2)

    useEffect(() => {
        if (!isNaN(fileSize)) {
            if (fileSize > 1) {
                dispatch(setValue(['', 'none']))
            } else {
                dispatch(setValue([value[0], 'valid']))
            }
        }

    }, [value[1], value[0]]);

    const handleDeleteImage = () => {
        setTimeout(() => {
            dispatch(setValue(['', false]));
        }, 100);
    }

    return <div className={uploadStyles['uploadWrapper']}>
        <label>{label} {required ? "*" : ''}</label>

        <label htmlFor={'pictureUpload'} className={uploadStyles['uploadContainer']}
               style={value[1] === 'none' || value[1] === 'invalidForm' ? {border: '2px dotted var(--accent-color)'} : {}}
        >
            {value[1] !== 'valid' && <input type={'file'} id={'pictureUpload'}
                                          accept={"image/png, image/jpg, image/jpeg"}
                                          onChange={(e) => {
                                              if (e.target.files !== null) {
                                                  dispatch(setValue([(e.target.files[0]), 'valid']))
                                              }
                                          }}/>}
            {value[1] === 'valid' && value[0] ? <div className={uploadStyles['uploadedImage']}>
                    <img src={value[1] === 'valid' ? URL.createObjectURL(value[0]): ''} alt={'Uploaded image'} draggable={false}/>
                    <button
                        onClick={() => {

                            handleDeleteImage()
                        }}
                        type={'button'}
                        title={"წაშალეთ ფაილი"}
                        className={uploadStyles['deleteBtn']}
                    ><img draggable={false}
                          src={DeleteImageSVG} width={30} alt={'Delete icon'}/>
                    </button>
                </div> :
                <img src={AddCircleSVG} alt={'Plus in a circle icon'} width={32}/>}
        </label>
        {value[1] === 'none' && <p style={{color: 'var(--accent-color)'}}>ფაილის ზომა არ უნდა აღემატებოდეს 1 მეგაბაიტს</p>}
    </div>
}