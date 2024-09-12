import uploadStyles from './styles/upload.module.css'
import AddCircleSVG from '/src-icons/add-circle.svg'

export default function UploadPicture({label, required}: { label: string, required: boolean }) {


    return <div className={uploadStyles['uploadWrapper']}>
        <h5>{label} {required ? "*" : ''}</h5>

        <label htmlFor={'pictureUpload'} className={uploadStyles['uploadContainer']}>
            <input type={'file'} id={'pictureUpload'} onChange={(e) => console.log(e) }/>
            <img src={AddCircleSVG} alt={'Plus in a circle icon'} width={32}/>
        </label>
    </div>
}