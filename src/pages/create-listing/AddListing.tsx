import addListingStyles from './addlisting.module.css'
import LocationDetails from "./components/LocationDetails.tsx";
import HomeDetails from "./components/HomeDetails.tsx";
import AgentDetails from "./components/AgentDetails.tsx";
import DealDetails from "./components/DealDetails.tsx";

export default function AddListing() {



    return (
        <form className={addListingStyles['addListingWrapper']}>
            <h1>ლისტინგის დამატება</h1>


            <DealDetails />
            <LocationDetails/>
            <HomeDetails/>
            <AgentDetails />


            <div className={addListingStyles['formButtons']}>
                <button type={'reset'}>გაუქმება</button>
                <button type={'submit'}>დაამატე ლისტინგი</button>
            </div>
        </form>
    );
}

