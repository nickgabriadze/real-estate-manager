import loadingListingPageStyles from '../styles/skeleton/loading.listingpage.module.css'

export default function LoadingListingPage() {

    return <div className={loadingListingPageStyles['listingPageSkeletonWrapper']}>

        <div className={loadingListingPageStyles['listingPageImageWrapper']}>
            <div className={loadingListingPageStyles['rentalSkeleton']}></div>
            <div className={loadingListingPageStyles['imageSkeleton']}></div>
            <div className={loadingListingPageStyles['dateSkeleton']}></div>
        </div>

        <div className={loadingListingPageStyles['detailsSkeletonWrapper']}>
            <div className={loadingListingPageStyles['priceSkeleton']}></div>
            <div className={loadingListingPageStyles['smallDetailsSkeleton']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className={loadingListingPageStyles['descriptionSkeleton']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className={loadingListingPageStyles['agentSkeletonWrapper']}>
                <div className={loadingListingPageStyles['agentCardInfoSkeleton']}>
                    <div className={loadingListingPageStyles['agentPictureSkeleton']}></div>
                    <div className={loadingListingPageStyles['agent']}>
                        <div></div>
                        <div></div>
                    </div>

                </div>

                <div className={loadingListingPageStyles['agentContactInfoSkeleton']}></div>

                <div className={loadingListingPageStyles['agentContactInfoSkeleton']}></div>

            </div>


            <div className={loadingListingPageStyles['deleteButtonSkeleton']}></div>
        </div>



    </div>
}