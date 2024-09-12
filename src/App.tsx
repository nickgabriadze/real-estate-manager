import RedBerrySVG from '/redberry-icon.svg'
import appStyles from './app.module.css'
import {Link, Route, Routes} from "react-router-dom";
import Listings from "./pages/listings-home/Listings.tsx";
import AddListing from './pages/create-listing/AddListing.tsx'

export default function App() {


    return <section className={appStyles['applicationWrapper']}>

        <header>
            <Link to={'/'}><img src={RedBerrySVG} width={150} height={24} alt={'RedBerry icon'}/></Link>
        </header>
        <hr/>

        <Routes>
            <Route index element={<Listings/>}/>
            <Route path={'/add-listing'} element={<AddListing />} />
        </Routes>

    </section>
}

