import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './AuthNav';
import DashDrawNav from './DashDrawNav';
import Splash from './../screens/splash/Splash';
import { DispatchContext, StateContext } from './../../utils/context/MainContext';
import AuthAction from './../../utils/context/actions/AuthAction';
import Helper from './../../utils/helpers/Helper';
import UserInactivity from 'react-native-user-inactivity';

export default function AppNavContainer() {

    const { auth, } = useContext(StateContext)
    const { authDispatch } = useContext(DispatchContext)
    const [active, setactive] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            //start the loading
            //setLoading(true)
            //ck is logged in
            const authAc = new AuthAction(authDispatch)
            const ck = await authAc.IsLoggedIn()
            console.log("AppNavContainer:isLoggedin=", ck)
            if (ck) {
                //ck in localstorage
                const u = await Helper.getUser()
                //console.log("test: ", u)
                //const u2 = await Helper.getPass()
                //console.log("passsss:", u2)
                if (!u) {
                    //not logged in
                    await authAc.Logout()
                }
            }


            //stop the loading

            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
        load()


        const ckactivity = async () => {
            if (!active) {
                await new AuthAction(authDispatch).Logout()
                //do logout
                Helper.Toast("logged out for inactivity.")
            }
        }
        ckactivity()

    }, [active])



    if (loading === true) {
        return <Splash />
    }

    return (
        <>
            {/* <UserInactivity
                isActive={active}
                timeForInactivity={30000}
                onAction={(a) => {
                    setactive(a)
                }}
            > */}
            <NavigationContainer>
                {auth?.logged_in ? <DashDrawNav /> : <AuthNav />}
                {/* <DashDrawNav /> */}
            </NavigationContainer >
            {/* </UserInactivity> */}
        </>
    )
}
