import {useEffect, useState} from "react";

export default function useWindowWidth(){
    const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

    useEffect(() => {

        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return width
}