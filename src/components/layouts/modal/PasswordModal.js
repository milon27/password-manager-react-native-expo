import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MModal from './MModal'
import Theme from './../../../utils/helpers/Theme';
import ListAction from './../../../utils/context/actions/ListAction';
import { DispatchContext } from './../../../utils/context/MainContext';
import { useNavigation } from '@react-navigation/native';
import URL from './../../../utils/helpers/URL';
import AreYouSureAlert from './AreYouSureAlert';
import Helper from './../../../utils/helpers/Helper';
import { useIsFocused } from '@react-navigation/native';


export default function PasswordModal({ open, setOpen, item }) {
    const nav = useNavigation()
    const { passDispatch } = useContext(DispatchContext)
    const isFocused = useIsFocused();
    //local
    const [pass, setPass] = useState("")

    useEffect(() => {
        let mounted = true
        const load = async () => {
            try {
                const password = await Helper.decryptPass(item?.password)
                setPass(password)
            } catch (e) {
                console.log("model: ", e);
            }
        }
        if (isFocused && mounted) {
            load()
        }
        return () => {
            mounted = false
        }

    }, [isFocused])

    const onSubmit = () => {
        setOpen(false)
        AreYouSureAlert("Are you sure you want to delete this password?", async () => {
            const la = new ListAction(passDispatch)
            const val = await la.deleteData('pass/' + item?._id, item?._id)
            console.log("delete password res : ", val)
        })
    }
    const onEdit = async () => {
        setOpen(false)
        nav.navigate(URL.CREATE_PASSWORD, { item })
    }
    return (
        <MModal title="Password Details" open={open || false} setOpen={setOpen} onSubmit={onSubmit} submitText="Delete Password" cancelText="Edit" onCancel={onEdit}>
            <Text style={styles.text}>Title: {item?.title} </Text>

            {item?.url.length > 0 ? <Text selectable={true} style={styles.text}>URL: {item?.url} </Text> : null}

            {item?.username.length > 0 ? <Text selectable={true} style={styles.text}>Username: {item?.username} </Text> : null}

            {item?.email.length > 0 ? <Text selectable={true} style={styles.text}>Email: {item?.email}</Text> : null}
            <Text selectable={true} style={styles.text}>Password: {pass}</Text>

            {item?.other.length > 0 ? <Text selectable={true} style={styles.text}>Other Info: {item?.other}</Text> : null}

        </MModal>
    )
}

const styles = StyleSheet.create({
    text: {
        color: Theme.COLOR_BLACK
    }
})
