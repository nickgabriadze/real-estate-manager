import RedBerrySVG from '/redberry-icon.svg'
import appStyles from './app.module.css'
import {Link, Route, Routes, useLocation} from "react-router-dom";
import Listings from "./pages/listings-home/Listings.tsx";
import AddListing from './pages/create-listing/AddListing.tsx'
import AddAgent from "./pages/create-agent/AddAgent.tsx";
import PageNotFound404 from "./404.tsx";
import ListingPage from "./pages/listing/ListingPage.tsx";
import DeleteListingModal from "./pages/listing/components/DeleteListingModal.tsx";

export default function App() {
    const location = useLocation()
    const addingAgent = location.pathname.toString().includes('/add-agent')
    const deletingListing = location.pathname.toString().includes('/delete')
    return <section className={appStyles['applicationWrapper']}>

        <header>
            <Link to={'/'}><img src={RedBerrySVG} width={150} height={24} alt={'RedBerry icon'}/></Link>
        </header>
        <hr/>

        {(addingAgent || deletingListing) && <div className={'outline'}></div>}
        <Routes>
            <Route path={'/'} element={<Listings />} />

            <Route path={'/add-agent'} element={<AddAgent/>}/>

            <Route path={'/listings/:id'} element={<ListingPage />}>
                <Route path={'delete'} element={<DeleteListingModal />} />
            </Route>
            <Route path={'/add-listing'} element={<AddListing/>}/>

            <Route path={'*'} element={<PageNotFound404 />} />
        </Routes>

    </section>
}

