import {useNavigate, useParams} from "react-router-dom";
import deleteModalStyles from '../styles/listingpage.delete.module.css'
import RemoveSVG from '/src-icons/remove.svg'
import useClickOutside from "../../../hooks/useClickOutside.ts";
import deleteListing from "../../../apis/listing/deleteListing.ts";
import {useState} from "react";

export default function DeleteListingModal() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [deleted, setDeleted] = useState<boolean>(false)
    const modalUseClickOutside = useClickOutside(() => navigate(-1))

    return <div className={deleteModalStyles['deleteModalWrapper']} ref={modalUseClickOutside}>
        {!deleted && <button className={deleteModalStyles['cancel']}
                             onClick={() => navigate(-1)}>
            <img src={RemoveSVG} width={24} alt={'Cancel icon'}/>

        </button>}
        {!deleted && <p>გსურთ წაშალოთ ლისტინგი?</p>}
        {deleted ?
            <h5 className={deleteModalStyles['deletedListing']}>ლისტინგი წარმატებით წაიშალა, რამდენიმე წამში დაბრუნდებით
                მთავარ გვერდზე</h5> : <div className={deleteModalStyles['buttons']}>
                <button onClick={() => navigate(-1)}>გაუქმება</button>
                <button onClick={async () => {
                    const requestToDelete = await deleteListing(Number(id))
                    if(requestToDelete.status === 200) {
                        setDeleted(true)
                        setTimeout(() => navigate('/'), 2000)

                    }
                }}>დადასტურება
                </button>

            </div>}
    </div>
}