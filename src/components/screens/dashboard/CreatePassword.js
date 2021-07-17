import React, { useState, useEffect, useContext } from 'react'
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


export default function CreatePassword({ route: { params } }) {

    const item = params?.item;

    const { app } = useContext(StateContext)
    const { appDispatch } = useContext(DispatchContext)

    const [value, setValue] = useState([]);
    const [open, setOpen] = useState(false);

    const N_TITLE = "title"
    const N_URL = "url"
    const N_PASSWORD = "password"
    const N_EMAIL = "email"
    const N_USERNAME = "username"
    const N_USER = "user"
    const N_CAT = "category"
    const N_IS_FAV = "is_fav"

    const init = item ? {
        [N_TITLE]: item[N_TITLE] || "",
        [N_URL]: item[N_URL] || "",
        [N_EMAIL]: item[N_EMAIL] || "",
        [N_USERNAME]: item[N_USERNAME] || "",
        [N_PASSWORD]: "",
        [N_USER]: item[N_USER] || "",
        [N_IS_FAV]: item[N_IS_FAV] || false,
    } : {
        [N_TITLE]: "",
        [N_URL]: "",
        [N_EMAIL]: "",
        [N_USERNAME]: "",
        [N_PASSWORD]: "",
        [N_USER]: "",
        [N_IS_FAV]: false,
    }
    const clear_init = {
        [N_TITLE]: "",
        [N_URL]: "",
        [N_EMAIL]: "",
        [N_USERNAME]: "",
        [N_PASSWORD]: "",
        [N_USER]: "",
        [N_IS_FAV]: false,
    }

    const error_init = {
        [N_TITLE]: "",
        [N_URL]: "",
        [N_EMAIL]: "",
        [N_USERNAME]: "",
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
                const uid = await Helper.getUserID()
                const data = await AxiosHelper.getData(`pass/get-all-cat/${uid}/`, token)
                if (data.success) {
                    //console.log("cat: ", data.object)
                    setCat(data.object)
                }
            } catch (e) {
                console.log("error Create Password.js->", e);
            }
        }
        load()

        return () => {
            token.cancel()
        }
    }, [cat.length])

    // local method
    const onSubmit = async () => {

        //validation
        const errorArray = Helper.validateObject({
            [N_TITLE]: input[N_TITLE],
            [N_URL]: input[N_URL],
            [N_EMAIL]: input[N_EMAIL],
            [N_USERNAME]: input[N_USERNAME],
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
            [N_USER]: await Helper.getUserID(),
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
            setValue([])
            Helper.Toast("" + val.title)
        } else {
            Helper.Toast("" + val.title)
        }

    }

    return (
        <ScrollView style={{ backgroundColor: Theme.COLOR_BG }}>

            <Container style={{ paddingTop: 30 }}>
                <StatusBar style={Theme.STATUS_BAR} />
                <Input value={input[N_TITLE]} error={error[N_TITLE]}

                    icon={<Icon type={DefineIcon.Feather} size={17} name="feather" />}
                    label="Enter Password Title"
                    onChangeText={(text) => Helper.onChange({ name: N_TITLE, value: text, setInput, setError })}
                />
                <Input autoCapitalize={'none'} value={input[N_URL]} error={error[N_URL]}

                    icon={<Icon type={DefineIcon.Feather} size={17} name="link" />}
                    label="Enter Site URL"
                    onChangeText={(text) => Helper.onChange({ name: N_URL, value: text, setInput, setError })}
                />

                <Input autoCapitalize={'none'} value={input[N_USERNAME]} error={error[N_USERNAME]}
                    icon={<Icon type={DefineIcon.Feather} size={17} name="user" />}
                    label="Enter Site Username"

                    onChangeText={(text) => Helper.onChange({ name: N_USERNAME, value: text, setInput, setError })}
                />

                <Input autoCapitalize={'none'} type="email-address" value={input[N_EMAIL]} error={error[N_EMAIL]}

                    icon={<Icon type={DefineIcon.MaterialIcon} size={17} name="alternate-email" />}
                    label="Enter Email"
                    onChangeText={(text) => Helper.onChange({ name: N_EMAIL, value: text, setInput, setError })}
                />

                <Input autoCapitalize={'none'} value={input[N_PASSWORD]} error={error[N_PASSWORD]}
                    icon={<Icon type={DefineIcon.Feather} size={17} name="lock" />}
                    label="Enter Site Password"

                    onChangeText={(text) => Helper.onChange({ name: N_PASSWORD, value: text, setInput, setError })}
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
                    placeholder="Select Category (Max-3)"
                    placeholderStyle={{
                        color: Theme.COLOR_GRAY
                    }}
                    textStyle={
                        {
                            color: Theme.COLOR_GRAY
                        }
                    }

                    theme={Theme.STATUS_BAR_ALT.toUpperCase()}

                    multiple={true}
                    min={0}
                    max={3}
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



                <MButton style={{ elevation: 0 }} title={item ? "Update Now" : "Create New"} loading={app?.loading} color={Theme.COLOR_PRIMARY} onPress={onSubmit} disabled={app?.loading} />
                {/* while loading.. it should be disabled */}
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
