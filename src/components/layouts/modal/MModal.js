import React from 'react'
import { View, Text, Modal, StyleSheet, StatusBar } from 'react-native'
import MButton from '../form/MButton';
import Theme from '../../../utils/helpers/Theme';
import DefineIcon from './../icon/DefineIcon';
import Icon from './../icon/Icon';

export default function MModal({
    title, open, setOpen, onSubmit, onCancel, submitText = "Done", cancelText = "Cancel", children
}) {

    const onCancelLocal = () => {
        setOpen(false)
    }



    return (

        <Modal visible={open} transparent>
            <StatusBar backgroundColor="rgba(0,0,0,0.6)" />
            <View style={styles.body}>
                <View style={styles.modal}>
                    <View style={styles.head}>
                        <Text style={styles.title}>{title}</Text>
                        <Icon type={DefineIcon.EntypoIcon} onPress={onCancelLocal} size={30} name="cross" />
                    </View>

                    <View>
                        {children}
                    </View>
                    <View style={styles.btns}>
                        <MButton style={styles.btn} title={cancelText} color={Theme.COLOR_BLACK} onPress={onCancel || onCancelLocal} />
                        <MButton style={styles.btn} title={submitText} color={Theme.COLOR_PRIMARY} onPress={onSubmit} />
                    </View>
                </View>
            </View>
        </Modal >

    )
}

const styles = StyleSheet.create({
    head: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
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
        justifyContent: "space-between",
    },
    btn: {
        marginHorizontal: 8
    }
})