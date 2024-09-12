import textareaStyles from './styles/textarea.module.css'
import CheckmarkSVG from "/src-icons/checkmark.svg";


export default function Textarea({label, validator, required}: {label: string, validator: string, required: boolean}){

    return <div className={textareaStyles['textareaWrapper']}>
        <h5>{label} {required ? "*" : ''}</h5>
        <textarea required={required}/>
        {validator && <div>
            <img src={CheckmarkSVG} alt={'Checkmark icon'} width={12}/>
            <p>{validator}</p></div>}

    </div>
}