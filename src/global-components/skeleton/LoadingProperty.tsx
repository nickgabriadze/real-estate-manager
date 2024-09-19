import propertyLoadingStyles from '../styles/skeleton/loading.property.module.css'

export function LoadingProperty(){


    return <div className={propertyLoadingStyles['loadingPropertySkeletonWrapper']}>
            <div className={propertyLoadingStyles['imageWrapper']}>
                <div className={propertyLoadingStyles['rentalSkeleton']}></div>
                <div className={propertyLoadingStyles['imageSkeleton']}></div>
            </div>

        <div className={propertyLoadingStyles['detailsWrapper']}>
            <div className={propertyLoadingStyles['priceSkeleton']}></div>
            <div className={propertyLoadingStyles['locationSkeleton']}></div>
            <div className={propertyLoadingStyles['detailsSkeleton']}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
}