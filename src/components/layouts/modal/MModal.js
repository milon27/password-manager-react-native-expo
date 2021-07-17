import React from 'react'
import { View, Text, Modal, StyleSheet, StatusBar } from 'react-native'
import MButton from '../form/MButton';
import Theme from '../../../utils/helpers/Theme';

export default function MModal({
    title, open, setOpen, onSubmit, submitText = "Done", children
}) {

    const onCancel = () => {
        setOpen(false)
    }



    return (

        <Modal visible={open} transparent>
            <StatusBar backgroundColor="rgba(0,0,0,0.6)" />
            <View style={styles.body}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>
                    <View>
                        {children}
                    </View>
                    <View style={styles.btns}>
                        <MButton style={styles.btn} title="Cancel" color={Theme.COLOR_BLACK} onPress={onCancel} />
                        <MButton style={styles.btn} title={submitText} color={Theme.COLOR_PRIMARY} onPress={onSubmit} />
                    </View>
                </View>
            </View>
        </Modal >

    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    modal: {
        backgroundColor: Theme.COLOR_BG,
        minWidth: 300,
        elevation: 20,
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 10,
        margin: 25,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        color: Theme.COLOR_BLACK,
        marginBottom: 10
    },
    btns: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    btn: {
        marginHorizontal: 8
    }
})