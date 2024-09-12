import {useQuery} from "@tanstack/react-query";
import getRegions from "../../../../apis/getRegions.ts";
import filterOptionsStyles from '../styles/filters.options.module.css'
import filterStyles from '../styles/filters.module.css'
import {useState} from "react";
import UpArrowSVG from '/src-icons/up-arrow.svg'
import DownArrowSVG from '/src-icons/down-arrow.svg'
import {useNavigate} from "react-router-dom";

export default function Region() {

    const {data, isLoading} = useQuery({queryKey: ['selectedRegions'], queryFn: getRegions,})
    const [open, setOpen] = useState<boolean>(false);
    const regions = data?.data
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search)
    const urlRegions = searchParams.get('regions')?.split(',').map(n => parseInt(n))
    const [selectedRegions, setSelectedRegions] = useState<number[]>(urlRegions == undefined ? [] : urlRegions)

    const handleRegion = (id: number) => {

        const updatedRegions = selectedRegions.includes(id)
            ? selectedRegions.filter(r_id => r_id !== id)  // Uncheck region
            : [...selectedRegions, id];

        setSelectedRegions(updatedRegions);
        const searchParams = new URLSearchParams(location.search);

        searchParams.set('regions', updatedRegions.join(','));

        navigate(`${location.pathname}?${searchParams.toString()}`);
    }

    return (
        <div className={filterOptionsStyles['regionsWrapper']}>
            <button onClick={() => setOpen(!open)}>
                <h3>რეგიონი</h3>
                <img src={open ? UpArrowSVG : DownArrowSVG} alt={'Arrow icon'} width={24}/>
            </button>

            {open && regions && !isLoading &&
                <div className={filterOptionsStyles['regions']}>
                    <h3>რეგიონის მიხედვით</h3>
                    <div className={filterOptionsStyles['mappedRegions']}>{regions.map((region) => <div
                            key={region.id}
                            className={filterOptionsStyles['eachRegion']}>
                            <input type={'checkbox'}
                                   checked={selectedRegions.includes(region.id)}
                                   onChange={() => handleRegion(region.id)}/>
                            <p>{region.name}</p>
                        </div>)}
                    </div>
                    <div>
                        <button className={filterStyles['dropdownSelectButton']}>არჩევა</button>
                    </div>
                </div>

            }
        </div>
    );
}
