import React, { useState } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import Theme from './../../../utils/helpers/Theme';
import Helper from './../../../utils/helpers/Helper';
import DefineIcon from './../../layouts/icon/DefineIcon';
import Icon from '../../layouts/icon/Icon';
import Clipboard from 'expo-clipboard';
import PasswordModal from './../../layouts/modal/PasswordModal';
import AreYouSureModal from './../../layouts/modal/AreYouSureModal';

export default function SingleRow({ item }) {
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const onPress = () => {
        setOpen(true)
    }

    const onLongPress = () => {
        //setOpen1(true)
    }
    const onDelete = () => {
        //setOpen(false)
    }

    return <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={styles.item_container}>
        {/* {console.log("row -> ", item)} */}

        <PasswordModal setOpen={setOpen} open={open} item={item} />
        <AreYouSureModal setOpen={setOpen1} open={open1} submitText="Delete Password" onSubmit={onDelete} />

        <View style={{ flexDirection: "row", alignItems: "center" }}>

            {/* {item?.url ? <Image style={styles.img} width={45} height={45} source={{ uri: "https://s2.googleusercontent.com/s2/favicons?domain_url=" + item?.url + "".toLowerCase() }} /> : } */}
            <Icon style={{ margin: 10 }} size={35} name="globe" type={DefineIcon.OcticonIcon} />
            {/* <View style={[styles.img, { backgroundColor: Helper?.ramdomColor() || Theme.COLOR_GRAY }]}>
                <Text style={{ color: Theme.COLOR_WHITE }}>{item?.title.slice(0, 2)}</Text>
            </View> */}

            <View>
                <Text style={{ color: Theme.COLOR_BLACK, fontWeight: "bold" }}>{item?.url}</Text>
                <Text style={{ color: Theme.COLOR_BLACK, fontSize: 12 }}>{item?.email}</Text>
            </View>
        </View>
        <View style={styles.icons}>
            <TouchableOpacity onPress={async () => {
                const pp = await Helper.decryptPass(item?.password)
                Clipboard.setString(pp);
                Helper.Toast("Password Copied To Clipboard")
            }}>
                <Icon style={{ margin: 10 }} size={22} name="copy" type={DefineIcon.Feather} />
            </TouchableOpacity>
        </View>
    </TouchableOpacity >
}

const styles = StyleSheet.create({
    item_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    img: {
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
        marginRight: 10
    },
    icons: {
        flexDirection: "row"
    }
})
