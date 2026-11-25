import { useEffect, useRef, useState } from "react"

export const useDebounce = <T>(value: T, delay: number = 250) => {
    console.log('comp render')
    const [debounced, setDebounced] = useState<T>(value)
    const isIntialCall = useRef(true)

    useEffect(() => {
          // Leading execution
        if(isIntialCall.current === true){
            isIntialCall.current = false
            setDebounced(value)
        }

          // Trailing  execution
        const t = setTimeout(() => {
            setDebounced(value)
            isIntialCall.current = true
        }, delay)

        if(!value || value===''){
           clearTimeout(t)
           setDebounced(null)
        }

        return () => clearTimeout(t)
    }, [value])

    return debounced
}