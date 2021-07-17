import React, { useState, useContext } from 'react'
import { StyleSheet } from 'react-native'
import Container from './../../layouts/Container';
import Input from './../../layouts/form/Input';
import Icon from './../../layouts/icon/Icon';
import DefineIcon from './../../layouts/icon/DefineIcon';
import Helper from './../../../utils/helpers/Helper';
import MButton from './../../layouts/form/MButton';
import { StateContext } from './../../../utils/context/MainContext';
import Theme from './../../../utils/helpers/Theme';
import AxiosHelper from './../../../utils/helpers/AxiosHelper';
import { StatusBar } from 'expo-status-bar';
export default function CreateCategory() {
    const { app } = useContext(StateContext)
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")

    const onSubmit = async () => {
        if (!title) {
            setError("Enter category title.")
            return
        }
        const userId = await Helper.getUserID()
        let val = await AxiosHelper.addData('pass/create-cat', { title, user: userId })
        console.log("CreateCategory", val)
        if (val.success) {
            setTitle("")
            Helper.Toast("" + val.title)
        } else {
            Helper.Toast("" + val.title)
        }
    }

    return (
        <Container style={styles.container}>
            <StatusBar style={Theme.STATUS_BAR} />
            <Input value={title} error={error}
                icon={<Icon type={DefineIcon.Feather} size={17} name="paperclip" />}
                label="Enter Category Name"
                onChangeText={(text) => setTitle(text)}
            />
            <MButton title="Create New" loading={app?.loading} color={Theme.COLOR_PRIMARY} onPress={onSubmit} disabled={app?.loading} />
            {/* while loading.. it should be disabled */}
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    }
})
