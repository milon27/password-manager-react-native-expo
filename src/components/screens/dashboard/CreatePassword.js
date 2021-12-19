import React, { useState, useEffect, useContext, useRef } from 'react'
import { Text, View, StyleSheet, Switch, ScrollView } from 'react-native'
import Icon from '../../layouts/icon/Icon';
import Container from '../../layouts/Container';
import DefineIcon from '../../layouts/icon/DefineIcon';
import Helper from '../../../utils/helpers/Helper';
import { DispatchContext, StateContext } from '../../../utils/context/MainContext';
import Input from './../../layouts/form/Input';
import MButton from './../../layouts/form/MButton';
import Theme from './../../../utils/helpers/Theme';
import DropDownPicker from 'react-native-dropdown-picker'
import AxiosHelper from './../../../utils/helpers/AxiosHelper';
import AppAction from './../../../utils/context/actions/AppAction';
import { StatusBar } from 'expo-status-bar';
import NavLink from './../../layouts/form/NavLink';
import URL from './../../../utils/helpers/URL';
import { useIsFocused } from '@react-navigation/native';

export default function CreatePassword({ route: { params }, navigation }) {

    const item = params?.item;

    const isF = useIsFocused()

    const { app } = useContext(StateContext)
    const { appDispatch } = useContext(DispatchContext)

    const [value, setValue] = useState(null);//single : null, multi: []
    const [open, setOpen] = useState(false);

    const titleRef = useRef(null)
    const urlRef = useRef(null)
    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const passRef = useRef(null)

    const N_TITLE = "title"
    const N_URL = "url"
    const N_PASSWORD = "password"
    const N_EMAIL = "email"
    const N_USERNAME = "username"
    const N_OTHER = "other"
    const N_CAT = "category"
    const N_IS_FAV = "is_fav"

    const init = item ? {
        [N_TITLE]: item[N_TITLE] || "",
        [N_URL]: item[N_URL] || "",
        [N_EMAIL]: item[N_EMAIL] || "",
        [N_USERNAME]: item[N_USERNAME] || "",
        [N_PASSWORD]: "",
        [N_OTHER]: item[N_OTHER] || "",
        [N_IS_FAV]: item[N_IS_FAV] || false,
    } : {
        [N_TITLE]: "",
        [N_URL]: "",
        [N_EMAIL]: "",
        [N_USERNAME]: "",
        [N_PASSWORD]: "",
        [N_OTHER]: "",
        [N_IS_FAV]: false,
    }
    const clear_init = {
        [N_TITLE]: "",
        [N_URL]: "",
        [N_EMAIL]: "",
        [N_USERNAME]: "",
        [N_PASSWORD]: "",
        [N_OTHER]: "",
        [N_IS_FAV]: false,
    }

    const error_init = {
        [N_TITLE]: "",
        [N_PASSWORD]: "",
    }
    const [cat, setCat] = useState([])
    const [input, setInput] = useState(init)
    const [error, setError] = useState(error_init)

    //load cat
    useEffect(() => {
        const token = AxiosHelper.getSource()
        const load = async () => {
            try {
                //set old value if we have
                if (item) {
                    navigation.setOptions({
                        title: `Update Password`,
                    })
                    const pass = await Helper.decryptPass(item[N_PASSWORD])
                    setInput({ ...input, [N_PASSWORD]: pass })
                    //console.log("all cat of the current item-", item[N_CAT])//get 1st one.
                    setValue(item[N_CAT][0]);//set old category. or selected item.
                }

                const data = await AxiosHelper.getData(`pass/get-all-cat/`, token)
                if (data.success) {
                    //console.log("pass/get-all-cat/: ", data.object)//[]
                    setCat(data.object)//set the cat list in dropdown
                }
            } catch (e) {
                console.log("error Create Password.js->", e);
            }
        }
        if (isF) {
            load()
        }

        return () => {
            token.cancel()
        }
    }, [isF, cat.length])

    // local method
    const onSubmit = async () => {

        //validation
        const errorArray = Helper.validateObject({
            [N_TITLE]: input[N_TITLE],
            [N_PASSWORD]: input[N_PASSWORD]
        })
        errorArray.forEach(item => {
            return setError((pre) => ({ ...pre, [item[0]]: `Enter ${item[0]}` }))
        })
        if (errorArray.length > 0) {
            return
        }

        if (value.length < 1) {
            Helper.Toast("Select Category")
            return
        }

        let appac = new AppAction(appDispatch)

        const data = {
            ...input,
            [N_PASSWORD]: await Helper.encryptPass(input[N_PASSWORD]),
            [N_CAT]: value
        }

        //console.log("before sending to server :  ", data)
        appac.START_LOADING()

        let val = {}
        if (item) {
            //do update
            // console.log("update: ", data)
            val = await AxiosHelper.updateData(`pass/${item?._id}`, data)
            console.log("updatePass response after update: ", val)
        } else {
            val = await AxiosHelper.addData('pass/create', data)
            console.log("CreatePass response form server: ", val)
        }


        appac.STOP_LOADING()
        if (val.success) {
            setInput(clear_init)
            setValue(null)
            Helper.Toast("" + val.desc)
        } else {
            Helper.Toast("" + val.desc)
        }

    }

    return (
        <ScrollView style={{ backgroundColor: Theme.COLOR_BG }}>

            <Container style={{ paddingVertical: 30 }}>
                <StatusBar style={Theme.STATUS_BAR} />

                <Input value={input[N_TITLE]} error={error[N_TITLE]}
                    ref={titleRef}
                    icon={<Icon type={DefineIcon.Feather} size={17} name="feather" />}
                    label="Enter Password Title"
                    onChangeText={(text) => Helper.onChange({ name: N_TITLE, value: text, setInput, setError, required: true })}
                    nextRef={urlRef}
                />
                <Input autoCapitalize={'none'} value={input[N_URL]} error={error[N_URL]}
                    ref={urlRef}
                    nextRef={usernameRef}
                    icon={<Icon type={DefineIcon.Feather} size={17} name="link" />}
                    label="Enter Site URL"
                    onChangeText={(text) => Helper.onChange({ name: N_URL, value: text, setInput, setError })}
                />

                <Input
                    ref={usernameRef}
                    nextRef={emailRef}
                    autoCapitalize={'none'} value={input[N_USERNAME]} error={error[N_USERNAME]}
                    icon={<Icon type={DefineIcon.Feather} size={17} name="user" />}
                    label="Enter Site Username"
                    onChangeText={(text) => Helper.onChange({ name: N_USERNAME, value: text, setInput, setError })}
                />

                <Input
                    ref={emailRef}
                    nextRef={passRef}
                    autoCapitalize={'none'}
                    type="email-address"
                    value={input[N_EMAIL]}
                    error={error[N_EMAIL]}
                    icon={<Icon type={DefineIcon.MaterialIcon} size={17} name="alternate-email" />}
                    label="Enter Email"
                    onChangeText={(text) => Helper.onChange({ name: N_EMAIL, value: text, setInput, setError })}
                />

                <Input
                    ref={passRef}
                    autoCapitalize={'none'}
                    value={input[N_PASSWORD]}
                    error={error[N_PASSWORD]}
                    icon={<Icon type={DefineIcon.Feather} size={17} name="lock" />}
                    label="Enter Site Password / PIN"
                    onChangeText={(text) => Helper.onChange({ name: N_PASSWORD, value: text, setInput, setError, required: true })}
                />

                <View style={styles.justifyRow}>
                    <Text style={{ color: Theme.COLOR_GRAY }}>Add To Fabourite</Text>
                    <Switch
                        thumbColor={input[N_IS_FAV] ? Theme.COLOR_PRIMARY : "#fff"}
                        style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                        value={input[N_IS_FAV]}
                        onValueChange={(text) => Helper.onChange({ name: N_IS_FAV, value: text, setInput: setInput, setError: setError })} />
                </View>

                <DropDownPicker
                    style={styles.dropDown}
                    placeholder="Select A Category"
                    placeholderStyle={{
                        color: Theme.COLOR_GRAY
                    }}
                    textStyle={
                        {
                            color: Theme.COLOR_GRAY
                        }
                    }

                    theme={Theme.STATUS_BAR_ALT.toUpperCase()}

                    multiple={false}
                    open={open}
                    setOpen={setOpen}
                    value={value}
                    setValue={setValue}

                    items={cat.length > 0 ? cat.map(item => {
                        return {
                            label: item?.title, value: item._id
                        }
                    }) : []}
                    zIndex={1000}
                    listMode="SCROLLVIEW"
                    zIndexInverse={3000}
                />

                <Input
                    autoCapitalize={'none'} value={input[N_OTHER]} error={error[N_OTHER]}
                    icon={<Icon type={DefineIcon.Feather} size={17} name="credit-card" />}
                    label="Other Important Information"
                    onChangeText={(text) => Helper.onChange({ name: N_OTHER, value: text, setInput, setError })}
                />


                <MButton style={{ elevation: 0 }} title={item ? "Update Now" : "Create New"} loading={app?.loading} color={Theme.COLOR_PRIMARY} onPress={onSubmit} disabled={app?.loading} />
                {/* while loading.. it should be disabled */}
                <NavLink title="Don't have Category? Create New Now" url={URL.CREATE_CATEGORY}></NavLink>
            </Container>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 120,
        borderRadius: 120
    },
    text: {
        textAlign: "center",
        marginVertical: 15,
        fontSize: 17
    },
    selectImg: {
        alignSelf: "center"
    },
    justifyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 5
    },
    dropDown: {
        borderColor: Theme.COLOR_GRAY,
        backgroundColor: Theme.COLOR_BG,
        marginVertical: 8,
        color: Theme.COLOR_BLACK
    }
})
