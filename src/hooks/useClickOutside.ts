import {useEffect, useRef} from "react";

export default function useClickOutside(handler: () => void) {

    const currentRef = useRef<any>(null);
    useEffect(() => {
        const handleClickOutside = (event: any) =>
        {
            if (!currentRef.current?.contains(event.target)) {
                handler()
            }
        }

        window.addEventListener('mousedown', handleClickOutside)

        return () => window.removeEventListener('mousedown', handleClickOutside)
    }, [handler])

    return currentRef
}