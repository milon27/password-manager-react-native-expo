import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './AuthNav';
import DashDrawNav from './DashDrawNav';
import Splash from './../screens/splash/Splash';
import { DispatchContext, StateContext } from './../../utils/context/MainContext';
import AuthAction from './../../utils/context/actions/AuthAction';
import Helper from './../../utils/helpers/Helper';

export default function AppNavContainer() {

    const { auth, } = useContext(StateContext)
    const { authDispatch } = useContext(DispatchContext)
    const [loading, setLoading] = useState(true)


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
            }, 10);
        }
        load()
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
