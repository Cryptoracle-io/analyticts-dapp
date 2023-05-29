import { useEffect, useState } from "react";

// export function useLocalStorage (key, initValue){
    
//     const [storedValue, setStoredValue] = useState(() => {
//         try{
//             const item = window.localStorage.getItem(key)
//             console.log("ITEM",item)
//             return item ? item : initValue
//         } catch (error) {
//             return initValue
//         }
//     })

//     const setValue = (value) => {
//         try {
//             setStoredValue(value)
//             window.localStorage.setItem(key, JSON.stringify(value))
//         }catch (error){
//             console.error();
//         }
//     }
//     return [storedValue,setValue]
// }

export function useLocalStorage (key, initValue){
    
    const [state, setState] = useState(() => {
        let value
        try{
             value = JSON.parse(window.localStorage.getItem(key) || initValue)
             //console.log("valueLS",value)
            return value ? JSON.parse(value) : initValue
        } catch (error) {
            value = initValue
        }
        //console.log("valueLS",value)
        return value
    })
    useEffect(
        () => {
            window.localStorage.setItem(key, state)
        },
        [state]
    )
    return state
}