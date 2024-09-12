import selectStyles from './styles/select.module.css'


export default function Select({data, label, selectOption}: { data: any[], label: string, selectOption: any }) {


    return <div className={selectStyles['selectWrapper']}>
        <h5>{label}</h5>
        <select name={label}
                onChange={(e) => selectOption(parseInt(e.target.value))}>
            {data.map((dataEntry) => <option value={dataEntry.id}
                                             key={dataEntry.id}>{dataEntry.name}</option>)}
        </select>
    </div>
}