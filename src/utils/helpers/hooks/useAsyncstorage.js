import React, { useState } from 'react'
//import { AsyncStorage } from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
/**
 * const [user,setUser]=useAsyncStorage('user',{})
 * const [user,setUser]=useAsyncStorage('user',()=>{})
 */

const PREFIX = "contacts-"
export default function useAsyncStorage(key, initValue) {

    const prefixed_key = PREFIX + key

    const [user, setUser] = useState(async () => {
        if (await AsyncStorage.getItem(prefixed_key) != null) {
            console.log("not null");
            return JSON.parse(await AsyncStorage.getItem(prefixed_key))
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
        const load = async () => {
            await AsyncStorage.setItem(prefixed_key, JSON.stringify(initValue))
        }
        load()
    }, [prefixed_key, state])

    return [user, setUser]
}
