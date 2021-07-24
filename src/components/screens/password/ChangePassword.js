import React, { useRef, useState, useContext, useEffect } from 'react'
import { View, Text } from 'react-native'
import Input from '../../layouts/form/Input';
import Container from './../../layouts/Container';
import Helper from './../../../utils/helpers/Helper';
import Icon from './../../layouts/icon/Icon';
import DefineIcon from './../../layouts/icon/DefineIcon';
import MButton from './../../layouts/form/MButton';
import { DispatchContext, StateContext } from './../../../utils/context/MainContext';
import Theme from './../../../utils/helpers/Theme';
import AppAction from './../../../utils/context/actions/AppAction';
import ListAction from './../../../utils/context/actions/ListAction';
import { useIsFocused } from '@react-navigation/native';
import AxiosHelper from './../../../utils/helpers/AxiosHelper';

export default function ChangePassword() {
    const isFocused = useIsFocused();
    //context
    const { app, pass } = useContext(StateContext)
    const { appDispatch, passDispatch } = useContext(DispatchContext)
    //ref
    const oldRef = useRef(null)
    const newRef = useRef(null)
    const newCRef = useRef(null)
    //constants
    const N_OLD_PASSWORD = "old_password"
    const N_NEW_PASSWORD = "new_password"
    const N_NEW_C_PASSWORD = "new_c_password"

    const initValue = {
        [N_OLD_PASSWORD]: "",
        [N_NEW_PASSWORD]: "",
        [N_NEW_C_PASSWORD]: "",
    }
    //state
    const [uid, setUid] = useState("")
    const [input, setInput] = useState(initValue)
    const [error, setError] = useState(initValue)
    //effect
    useEffect(() => {
        // console.log("load password")
        const listAc = new ListAction(passDispatch)
        const token = listAc.getSource()
        const load = async () => {

            try {
                //load password..
                const uid = await Helper.getUserID()
                setUid(uid)
                const val = await listAc.getAll(`pass/get-all/${uid}/`, [])
                //console.log("change pass val =", val)
            } catch (e) {
                console.log("error ChangePassword.js->", e);
            }
        }
        if (isFocused) {
            load()
        }

        return () => {
            token.cancel()
        }
    }, [isFocused, pass.length])
    //method
    const onSubmit = async () => {

        //validation
        const errorArray = Helper.validateObject({
            [N_OLD_PASSWORD]: input[N_OLD_PASSWORD],
            [N_NEW_PASSWORD]: input[N_NEW_PASSWORD],
            [N_NEW_C_PASSWORD]: input[N_NEW_C_PASSWORD]
        })
        errorArray.forEach(item => {
            return setError((pre) => ({ ...pre, [item[0]]: `It's Required.` }))
        })
        if (errorArray.length > 0) {
            return
        }
        //check the old password is ok or not
        const oldpasshash = await Helper.getPassHash()
        if (Helper.getMasterPassHash(input[N_OLD_PASSWORD]) !== oldpasshash) {
            setError((pre) => ({ ...pre, [N_OLD_PASSWORD]: `Wrong Old Password` }))
            return
        }
        //ck the confirm pass & pass is same or not
        if (input[N_NEW_PASSWORD] !== input[N_NEW_C_PASSWORD]) {
            setError((pre) => ({ ...pre, [N_NEW_C_PASSWORD]: `Confirm Password is not same.` }))
            return
        }

        //decrypt all the passsword using the old pass
        //encrypt again with new password
        const resultArray = await Promise.all(
            pass.map(async (item) => {
                const plainpass = await Helper.decryptPass(item.password)
                const reEnc = Helper.encryptPassWithHas(plainpass, Helper.getMasterPassHash(input[N_NEW_PASSWORD]))

                item.password = reEnc
                return item
            })
        );

        //console.log(resultArray);

        let appac = new AppAction(appDispatch)

        appac.START_LOADING()

        const data = {
            arr: resultArray,
            user: {
                _id: uid,
                pass: input[N_NEW_PASSWORD]
            }
        }

        let val = await AxiosHelper.updateData(`pass/rest/all-pass`, data)
        console.log("after all update: ", val)

        appac.STOP_LOADING()

        if (val.success) {
            //update offline
            await Helper.setPassHash(input[N_NEW_PASSWORD])
            setInput(initValue)
            Helper.Toast("" + val.title)
        } else {
            Helper.Toast("" + val.title)
        }

    }

    return (
        <Container>
            <Input
                ref={oldRef}
                nextRef={newRef}
                autoCapitalize={'none'}
                value={input[N_OLD_PASSWORD]}
                error={error[N_OLD_PASSWORD]}
                icon={<Icon type={DefineIcon.Feather} size={17} name="lock" />}
                label="Enter Old Password"
                onChangeText={(text) => Helper.onChange({ name: N_OLD_PASSWORD, value: text, setInput, setError })}
            />

            <Input
                ref={newRef}
                nextRef={newCRef}
                autoCapitalize={'none'}
                value={input[N_NEW_PASSWORD]}
                error={error[N_NEW_PASSWORD]}
                icon={<Icon type={DefineIcon.Feather} size={17} name="lock" />}
                label="Enter New Password"
                onChangeText={(text) => Helper.onChange({ name: N_NEW_PASSWORD, value: text, setInput, setError })}
            />

            <Input
                ref={newCRef}
                autoCapitalize={'none'}
                value={input[N_NEW_C_PASSWORD]}
                error={error[N_NEW_C_PASSWORD]}
                icon={<Icon type={DefineIcon.Feather} size={17} name="lock" />}
                label="Confirm New Password"
                onChangeText={(text) => Helper.onChange({ name: N_NEW_C_PASSWORD, value: text, setInput, setError })}
            />

            <MButton style={{ elevation: 0 }} title="Change Master Password" loading={app?.loading} color={Theme.COLOR_PRIMARY} onPress={onSubmit} disabled={app?.loading} />
        </Container>
    )
}
