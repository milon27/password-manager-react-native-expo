import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MModal from './MModal'
import Theme from './../../../utils/helpers/Theme';
import ListAction from './../../../utils/context/actions/ListAction';
import { DispatchContext } from './../../../utils/context/MainContext';
import { useNavigation } from '@react-navigation/native';
import URL from './../../../utils/helpers/URL';
import AreYouSureAlert from './AreYouSureAlert';


export default function PasswordModal({ open, setOpen, item }) {
    const nav = useNavigation()
    const { passDispatch } = useContext(DispatchContext)

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
            <Text style={styles.text}>Site: {item?.title} </Text>
            <Text style={styles.text}>URL: {item?.url} </Text>
            <Text style={styles.text}>Username: {item?.username} </Text>
            <Text style={styles.text}>Email: {item?.email}</Text>
        </MModal>
    )
}

const styles = StyleSheet.create({
    text: {
        color: Theme.COLOR_BLACK
    }
})
