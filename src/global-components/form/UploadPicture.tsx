import uploadStyles from '../styles/form/upload.module.css'
import AddCircleSVG from '/src-icons/add-circle.svg'
import {useEffect, useState} from "react";
import DeleteImageSVG from '/src-icons/delete-bin.svg'
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../hooks/redux.ts";
import getBase64Image from "./functions/getBase64Image.ts";
import base64ToFile from "./functions/base64ToFile.ts";

export default function UploadPicture({label,block, value, setValue, required}: {
    label: string,
    block: boolean,
    value: any,
    setValue: ActionCreatorWithPayload<any>,
    required: boolean
}) {
    const dispatch = useAppDispatch()
    const fileSize = Number(value[0]?.size) / (1024 ** 2)
    const sessionStorageValue = sessionStorage.getItem('image');

    useEffect(() => {
        if(sessionStorageValue && !block){
            const asFile = base64ToFile(String(sessionStorageValue))
            const validFileType = handleFileType(asFile.type)
            if(validFileType){
                dispatch(setValue([asFile, 'valid']))
            }
        }
    }, [sessionStorageValue])


    const handleFileType = (fileType: string) => {
        return fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/jpg'
    }
    const [invalidFileType, setInvalidFileType] = useState<boolean>(handleFileType(value[0].type))

    useEffect(() => {
        if (!isNaN(fileSize)) {
            if (handleFileType(value[0].type)) {
                if (fileSize > 1) {
                    dispatch(setValue(['', 'none']))
                } else {
                    setInvalidFileType(false)
                    !block && getBase64Image(value[0])
                    dispatch(setValue([value[0], 'valid']))
                }
            }else{
                setInvalidFileType(true)
                dispatch(setValue(['', false]))

            }
        }

    }, [value[0]]);

    const handleDeleteImage = () => {
        setTimeout(() => {
            dispatch(setValue(['', false]));
            sessionStorage.removeItem('image')
        }, 100);
    }


    return <div className={uploadStyles['uploadWrapper']}>
        <p>{label} {required ? "*" : ''}</p>

        <label htmlFor={'pictureUpload'} className={uploadStyles['uploadContainer']}
               style={value[1] === 'none' || value[1] === 'invalidForm' || invalidFileType ? {border: '2px dotted var(--accent-color)'} : {}}
        >
            {value[1] !== 'valid' && <input type={'file'} id={'pictureUpload'}
                                            autoComplete={'off'}
                                            accept={"image/png, image/jpg, image/jpeg"}
                                            onChange={(e) => {
                                                if (e.target.files !== null) {
                                                        dispatch(setValue([(e.target.files[0]), 'valid']))
                                                }
                                            }}/>}
            {value[1] === 'valid' && value[0] ? <div className={uploadStyles['uploadedImage']}>
                    <img src={value[1] === 'valid' ? URL.createObjectURL(value[0]) : ''} alt={'Uploaded image'}
                         draggable={false}/>
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
        {value[1] === 'none' &&
            <p style={{color: 'var(--accent-color)'}}>ფაილის ზომა არ უნდა აღემატებოდეს 1 მეგაბაიტს!</p>}
        {invalidFileType && value[1] !== 'none' && value[1] !== 'invalidForm' &&
            <p style={{color: 'var(--accent-color)'}}>ფაილის ფორმატი არასწორია. ატვირთეთ მხოლოდ JPEG/JPG ან PNG!</p>}
    </div>
}