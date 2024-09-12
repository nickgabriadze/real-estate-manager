import filterStyles from './styles/filters.module.css'
import Region from "./filter-options/Region.tsx";
import Pricing from "./filter-options/Pricing.tsx";
import Area from "./filter-options/Area.tsx";
import Rooms from "./filter-options/Rooms.tsx";


export default function Filters() {

    return <section>
        <div className={filterStyles['filtersCreate']}>
            <div className={filterStyles['filterOptions']}>
                <Region/>
                <Pricing/>
                <Area/>
                <Rooms/>
            </div>

        </div>

        <div className={filterStyles['selectedFilters']}>


        </div>
    </section>
}