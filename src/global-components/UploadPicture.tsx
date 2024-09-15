import uploadStyles from './styles/upload.module.css'
import AddCircleSVG from '/src-icons/add-circle.svg'
import {useEffect, useState} from "react";
import DeleteImageSVG from '/src-icons/delete-bin.svg'

export default function UploadPicture({label, required}: { label: string, required: boolean }) {
    const [file, setFile] = useState<File>()
    const fileSize = Number(file?.size) / (1024 ** 2)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        if (!isNaN(fileSize)) {
            if (fileSize > 1) {
                setError(true)
                setFile(undefined)
            } else {
                setError(false)
            }
        }

    }, [error, file]);

    const handleDeleteImage = () => {
        setTimeout(() => {
            setFile(undefined);
        }, 100);
    }

    return <div className={uploadStyles['uploadWrapper']}>
        <h5>{label} {required ? "*" : ''}</h5>

        <label htmlFor={'pictureUpload'} className={uploadStyles['uploadContainer']}
               style={error ? {border: '2px dotted var(--accent-color)'} : {}}
        >
            {file === undefined && <input type={'file'} id={'pictureUpload'}
                                          accept={"image/png, image/jpg, image/jpeg"}
                                          onChange={(e) => {
                                              if (e.target.files !== null) {
                                                  setFile(e.target.files[0])
                                              }
                                          }}/>}
            {!error && file ? <div className={uploadStyles['uploadedImage']}>
                    <img src={!error && URL.createObjectURL(file)} alt={'Uploaded image'} draggable={false}/>
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
        {error && <p style={{color: 'var(--accent-color)'}}>ფაილის ზომა არ უნდა აღემატებოდეს 1 მეგაბაიტს</p>}
    </div>
}