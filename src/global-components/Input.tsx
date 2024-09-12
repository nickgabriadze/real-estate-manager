import inputStyles from './styles/input.module.css'
import CheckmarkSVG from '/src-icons/checkmark.svg'


export default function Input({label, validator, type, required}: {
    label: string;
    validator: string,
    type: string,
    required: boolean
}) {

    return <div className={inputStyles['inputWrapper']}>
        <label htmlFor={label}>{label} {required ? "*" : ''}</label>
        <input id={label} type={type} required={required}/>
        {validator && <div>
            <img src={CheckmarkSVG} alt={'Checkmark icon'} width={12}/>
            <p>{validator}</p></div>}
    </div>
}