import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MModal from './MModal'
import Theme from './../../../utils/helpers/Theme';
import ListAction from './../../../utils/context/actions/ListAction';
import { DispatchContext } from './../../../utils/context/MainContext';

export default function PasswordModal({ open, setOpen, item }) {

    const { passDispatch } = useContext(DispatchContext)

    const onSubmit = async () => {
        setOpen(false)
        const la = new ListAction(passDispatch)
        const val = await la.deleteData('pass/' + item?._id, item?._id)
        console.log("del: ", val)
    }
    return (
        <MModal title="Password Details" open={open || false} setOpen={setOpen} onSubmit={onSubmit} submitText="Delete Password">
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
