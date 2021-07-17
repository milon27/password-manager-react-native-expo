import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, Keyboard } from 'react-native';
import Input from '../../layouts/form/Input';
import Container from './../../layouts/Container';
import URL from '../../../utils/helpers/URL';
import NavLink from '../../layouts/form/NavLink';
import MButton from '../../layouts/form/MButton';
import Theme from './../../../utils/helpers/Theme';
import Helper from './../../../utils/helpers/Helper';
import { StateContext, DispatchContext } from './../../../utils/context/MainContext';
import ResponseLayout from '../../layouts/ResponseLayout';
import AppAction from './../../../utils/context/actions/AppAction';
import AuthAction from './../../../utils/context/actions/AuthAction';
import Response from './../../../utils/helpers/Response';
import DefineIcon from '../../layouts/icon/DefineIcon';
import Icon from './../../layouts/icon/Icon';
import { StatusBar } from 'expo-status-bar';

export default function SignIn() {
    //global state
    const { app } = useContext(StateContext)
    const { authDispatch, appDispatch } = useContext(DispatchContext)

    //local state
    const N_EMAIL = "email"
    const N_PASSWORD = "password"

    const init = {
        [N_EMAIL]: "",
        [N_PASSWORD]: ""
    }
    const initTest = {
        [N_EMAIL]: "",
        [N_PASSWORD]: ""
    }

    const [input, setInput] = useState(init)
    const [error, setError] = useState(init)

    //use e
    useEffect(() => {
        const g = async () => {
            const ue = await Helper.getUserEmail()
            setInput({ ...input, [N_EMAIL]: ue })
        }
        g()
    }, [])
    //local method

    const onSubmit = async () => {
        //validation
        const errorArray = Helper.validateObject(input)//should pass an object with key:value
        errorArray.forEach(item => {
            return setError((pre) => ({ ...pre, [item[0]]: `Enter ${item[0]}` }))
        })
        if (errorArray.length > 0) {
            return
        }
        //hide keyboard
        Keyboard && Keyboard.dismiss()
        //setLoading(true)
        new AppAction(appDispatch).START_LOADING()
        try {
            await new AuthAction(authDispatch).login(input.email.toLowerCase(), input.password)
            //setLoading(false)
            new AppAction(appDispatch).STOP_LOADING()
        } catch (e) {
            console.log(e);
            //setLoading(false)
            new AppAction(appDispatch).STOP_LOADING()
            new AppAction(appDispatch).SET_RESPONSE(Response(false, e.message, "try again.", Theme.COLOR_DANGER, e))
        }

    }



    return (

        <Container style={styles.container}>

            <Icon style={styles.icon} type={DefineIcon.Feather} size={45} name="lock" />

            <Text style={styles.title}>Hey, Login Now</Text>

            <StatusBar style={Theme.STATUS_BAR} />

            <ResponseLayout response={app.response} />

            <Input autoCapitalize={'none'} icon={<Icon type={DefineIcon.MaterialIcon} size={17} name="alternate-email" />} value={input.email} error={error?.email} onChangeText={(text) => Helper.onChange({ name: N_EMAIL, value: text, setInput: setInput, setError: setError })} label="Enter Your Email" />

            <Input icon={<Icon type={DefineIcon.Feather} size={17} name="lock" />} value={input.password} error={error?.password} onChangeText={(text) => Helper.onChange({ name: N_PASSWORD, value: text, setInput: setInput, setError: setError })} type="password" label="Enter Password" />


            <MButton title="Login Now" loading={app?.loading} color={Theme.COLOR_PRIMARY} onPress={onSubmit} disabled={app?.loading} />
            {/* while loading.. it should be disabled */}
            {/* <NavLink title="Forget Password?" url={URL.SIGN_IN}></NavLink> */}

            <NavLink title="Don't have account? Create New Now" url={URL.SIGN_UP}></NavLink>

        </Container>
    );
}

const styles = StyleSheet.create({
    small_title: {
        textAlign: "center",
        marginVertical: 5,
        paddingBottom: 5,
        textDecorationLine: "underline",
        textDecorationStyle: "solid"
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        color: Theme.COLOR_PRIMARY,
        fontSize: 25,
        marginVertical: 15,
        padding: 7
    },
    icon: {
        textAlign: "center",
        color: Theme.COLOR_PRIMARY,
    },
    container: {
        justifyContent: "center"
    }
})