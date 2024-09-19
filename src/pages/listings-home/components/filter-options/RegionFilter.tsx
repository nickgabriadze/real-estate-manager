import filterOptionsStyles from '../styles/filters.options.module.css'
import filterStyles from '../styles/filters.module.css'
import React, {useEffect} from "react";
import UpArrowSVG from '/src-icons/up-arrow.svg'
import DownArrowSVG from '/src-icons/down-arrow.svg'
import {useNavigate} from "react-router-dom";
import useClickOutside from "../../../../hooks/useClickOutside.ts";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux.ts";
import {addRegionFilters, removeRegionFilters} from "../../../../features/filters/filterReducer.ts";
import {Region, Regions} from "../../../../types/regions.ts";
import CheckBox from "../../../../global-components/form/CheckBox.tsx";


export default function RegionFilter({visible, regionsData, isLoading, params}: {
    isLoading: boolean,
    params: URLSearchParams
    regionsData: Regions
    visible: {
        status: boolean,
        makeVisible: React.Dispatch<React.SetStateAction<"region" | "pricing" | "area" | "rooms" | "none">>
    }
}) {
    const navigate = useNavigate()
    const urlRegions = params.get('regions')?.split(',').map(n => parseInt(n))

    const regionDispatch = useAppDispatch()
    const regionClickOutsideRef = useClickOutside(() => visible.status && visible.makeVisible('none'))
    const filterRegionIDs = useAppSelector(s => s.filters.regionFilters)

    const handleRegion = (id: number, name: string) => {
        const filteredRegionsMappedToID = filterRegionIDs.map(r => r.id)
        if (filteredRegionsMappedToID.includes(id)) {
            regionDispatch(removeRegionFilters([...filterRegionIDs.filter(r => r.id !== id)]))

        } else {
            regionDispatch(addRegionFilters([...filterRegionIDs, {id, name}]))
        }
    }
    useEffect(() => {
        if (urlRegions) {
            regionDispatch(addRegionFilters([...regionsData.filter(r => urlRegions.includes(r.id))]))
        }
    }, [isLoading]);

    useEffect(() => {
        if (filterRegionIDs.length === 0) {
            if (!isLoading) {
                params.delete('regions')
            }
        } else {
            params.set('regions', filterRegionIDs.map(r => r.id).join(','));
        }
        navigate(`${location.pathname}?${params.toString()}`);

    }, [isLoading, filterRegionIDs.length])

    return (
        <div className={filterOptionsStyles['regionsWrapper']} ref={regionClickOutsideRef}>
            <button
                style={visible.status ? {background: '#F3F3F3'}: {}}
                className={`${filterOptionsStyles['filterOptionsButton']} ${filterStyles['filterOption']}`}
                onClick={() => visible.makeVisible(visible.status ? 'none' : 'region')}>
                <h3>რეგიონი</h3>
                <img src={visible.status ? UpArrowSVG : DownArrowSVG} alt={'Arrow icon'} width={12}/>
            </button>

            {visible.status && regionsData && !isLoading &&
                <div className={filterOptionsStyles['regions']}>
                    <h3>რეგიონის მიხედვით</h3>
                    <div className={filterOptionsStyles['mappedRegions']}>{regionsData.map((region: Region) => <button
                        key={region.id}
                        onClick={() => handleRegion(region.id, region.name)}
                        className={filterOptionsStyles['eachRegion']}>
                        <CheckBox checked={filterRegionIDs.map(r => r.id).includes(region.id)} />

                        <p>{region.name}</p>
                    </button>)}
                    </div>
                    <div>
                        <button className={filterStyles['dropdownSelectButton']}
                                onClick={() => visible.makeVisible(visible.status ? 'none' : 'region')}
                        >არჩევა
                        </button>
                    </div>
                </div>

            }
        </div>
    );
}
