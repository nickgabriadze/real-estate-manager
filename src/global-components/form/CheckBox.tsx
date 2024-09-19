import CheckBoxMarkSVG from '/src-icons/checkbox-mark.svg'
import checkboxStyles from '../styles/form/checkbox.module.css'

export default function CheckBox({checked}: {checked:boolean}) {


    return !checked ? <div className={checkboxStyles['notChecked']}></div> :
        <div className={checkboxStyles['checked']}><img src={CheckBoxMarkSVG} width={20} height={20} alt={'Checkmark icon'}/></div>
}