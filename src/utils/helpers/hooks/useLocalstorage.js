import React, { useState } from 'react'
/**
 * const [user,setUser]=useLocalStorage('user',{})
 * const [user,setUser]=useLocalStorage('user',()=>{})
 */

const PREFIX = "contacts-"
export default function useLocalstorage(key, initValue) {

    const prefixed_key = PREFIX + key

    const [user, setUser] = useState(() => {
        if (localStorage.getItem(prefixed_key) != null) {
            console.log("not null");
            return JSON.parse(localStorage.getItem(prefixed_key))
        }
        if (typeof initValue === 'function') {
            console.log("function");
            return initValue()
        } else {
            console.log("not function");
            return initValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixed_key, JSON.stringify(initValue))
    }, [prefixed_key, state])

    return [user, setUser]
}
