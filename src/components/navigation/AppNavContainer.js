import React, { useContext, useState, useEffect, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './AuthNav';
import DashDrawNav from './DashDrawNav';
import Splash from './../screens/splash/Splash';
import { DispatchContext, StateContext } from './../../utils/context/MainContext';
import AuthAction from './../../utils/context/actions/AuthAction';
import Helper from './../../utils/helpers/Helper';
import { AppState } from 'react-native';
import useAsyncStorage from './../../utils/helpers/hooks/useAsyncstorage';

export default function AppNavContainer() {

    const { auth, } = useContext(StateContext)
    const { authDispatch } = useContext(DispatchContext)
    const [loading, setLoading] = useState(true)

    const [offline, setOffline] = useAsyncStorage("OFFLINE_TIME", new Date().getTime())




    //app state
    const _handleAppStateChange = async (nextAppState) => {
        //appState.current.match(/inactive|background/) &&
        if (
            nextAppState === 'active'
        ) {
            const ctime = new Date().getTime()
            if (Math.abs(ctime - offline) > 30000) {
                //if (auth?.logged_in) {
                console.log("it was background for more than 30 seconds");
                await new AuthAction(authDispatch).Logout()
                //do logout
                Helper.Toast("logged out for inactivity.")
                // }
            } else {
                console.log("Diff=", Math.abs(ctime - offline));
            }
        } else {
            const ctime = new Date().getTime()
            console.log("App is in background!", ctime);
            //set time in localstorage. when app goes to backgroud
            setOffline(ctime)
        }
    }

    useEffect(() => {
        const load = async () => {
            //start the loading
            //setLoading(true)
            //ck is logged in
            const authAc = new AuthAction(authDispatch)

            const ck = await authAc.IsLoggedIn()
            //console.log("AppNavContainer:isLoggedin=", ck)
            if (ck) {
                //ck in localstorage
                const u = await Helper.getUser()
                // console.log("test: ", u)
                if (!u) {
                    //not logged in
                    await authAc.Logout()
                }
            }

            //stop the loading

            setTimeout(() => {
                setLoading(false)
            }, 300);
        }
        load()

        //state change listener
        AppState.addEventListener('change', _handleAppStateChange)

        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
        }

    }, [])



    if (loading === true) {
        return <Splash />
    }

    return (
        <>
            <NavigationContainer>
                {auth?.logged_in === true ? <DashDrawNav /> : <AuthNav />}
                {/* <DashDrawNav /> */}
            </NavigationContainer >
        </>
    )
}
