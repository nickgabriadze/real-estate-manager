import RedBerrySVG from '/redberry-icon.svg'
import appStyles from './app.module.css'
import {Link, Route, Routes, useLocation} from "react-router-dom";
import Listings from "./pages/listings-home/Listings.tsx";
import AddListing from './pages/create-listing/AddListing.tsx'
import AddAgent from "./pages/create-agent/AddAgent.tsx";
import addAgentStyles from "./pages/create-agent/addagent.module.css";

export default function App() {
    const location = useLocation()
    return <section className={appStyles['applicationWrapper']}>

        <header>
            <Link to={'/'}><img src={RedBerrySVG} width={150} height={24} alt={'RedBerry icon'}/></Link>
        </header>
        <hr/>

        {location.pathname === '/add-agent' && <div className={addAgentStyles['outline']}></div>}
        <Routes>
            <Route path={'/'} element={<Listings/>}>
                <Route path={'add-agent'} element={<AddAgent/>}/>
            </Route>
            <Route path={'/add-listing'} element={<AddListing/>}/>
        </Routes>

    </section>
}

