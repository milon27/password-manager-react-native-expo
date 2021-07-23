import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import URL from './../../utils/helpers/URL';
import Icon from './../layouts/icon/Icon';
import DefineIcon from '../layouts/icon/DefineIcon';
import LogOutModal from '../layouts/modal/LogOutModal';
import Theme from './../../utils/helpers/Theme';

export default function DrawerContent({ navigation: nav }) {
    const [open, setOpen] = useState(false)


    const logoutNow = () => {
        nav.toggleDrawer()
        setOpen(true)
    }

    const items = [
        { title: "Home", icon: <Icon type={DefineIcon.Feather} name="home" />, onPress: () => { nav.navigate(URL.HOME_SCREEN) } },
        { title: "Create Password", icon: <Icon type={DefineIcon.Feather} name="lock" />, onPress: () => { nav.navigate(URL.CREATE_PASSWORD) } },
        { title: "All Category", icon: <Icon type={DefineIcon.Feather} name="list" />, onPress: () => { nav.navigate(URL.ALL_CATEGORY) } },
        { title: "Create Category", icon: <Icon type={DefineIcon.Feather} name="paperclip" />, onPress: () => { nav.navigate(URL.CREATE_CATEGORY) } },
        { title: "About", icon: <Icon type={DefineIcon.AntDesign} name="customerservice" />, onPress: () => { nav.navigate(URL.ABOUT) } },
        { title: "Log Out", icon: <Icon type={DefineIcon.Feather} name="log-out" />, onPress: logoutNow }
    ]



    return (
        <View style={styles.container}>

            <LogOutModal open={open} setOpen={setOpen} />

            <View style={styles.logo_container}>
                <Image
                    height={50}
                    width={50}
                    source={require('../../assets/img/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={{ paddingTop: 20 }}>
                {items.map(item => {
                    return (<TouchableOpacity key={item.title} style={styles.item} onPress={item.onPress}>
                        {item.icon}<Text style={styles.title}>{item.title}</Text>
                    </TouchableOpacity>)
                })}
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
    },
    logo_container: {
        marginTop: 20,
        alignSelf: "flex-start",
        borderRadius: 50,
        backgroundColor: Theme.COLOR_PRIMARY,
        padding: 10
    },
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: Theme.COLOR_BG
    },
    item: {
        flexDirection: "row",
        marginVertical: 10,
    },
    title: {
        color: Theme.COLOR_BLACK,
        fontSize: 17,
        paddingLeft: 10
    }
})