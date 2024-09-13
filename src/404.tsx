import {Link} from "react-router-dom";

export default function PageNotFound404() {


    return <div className='not-found'>
        <div>
            <span>404</span> <span>|</span> <span> სამწუხაროდ, მოცემული გვერდი ვერ მოიძებნა</span>
        </div>
        <div>
            <Link to={'/'}>მთავარ გვერდზე
                დაბრუნება</Link>
        </div>
    </div>
}