import RedBerrySVG from '/redberry-icon.svg'
import appStyles from './app.module.css'
import {Route, Routes} from "react-router-dom";
import Listings from "./pages/listings-home/Listings.tsx";

export default function App(){


    return <section className={appStyles['applicationWrapper']}>

            <header>
                <div><img src={RedBerrySVG} width={150} height={24} alt={'RedBerry icon'} /></div>
            </header>

        <Routes>
            <Route index element={<Listings />}/>
        </Routes>

    </section>
}

