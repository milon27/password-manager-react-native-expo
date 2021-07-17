import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import Container from './../../layouts/Container';
import Theme from './../../../utils/helpers/Theme';
import Icon from '../../layouts/icon/Icon';
import DefineIcon from './../../layouts/icon/DefineIcon';
import SingleRow from './SingleRow';
import Helper from './../../../utils/helpers/Helper';
import MButton from './../../layouts/form/MButton';
import { useNavigation } from '@react-navigation/native';
import URL from './../../../utils/helpers/URL';
import OfflineListAction from './../../../utils/context/actions/OfflineListAction';
import Define from '../../../utils/helpers/Define';
import { DispatchContext } from '../../../utils/context/MainContext';

export default function ContactDetail({ route: { params } }) {
    const { navigate, setOptions } = useNavigation()

    const { contact_listDispatch } = useContext(DispatchContext)

    useEffect(() => {
        setOptions({
            title: "" + params.name,
            headerRight: () => {
                // hearto,heart
                return <Icon size={28} type={DefineIcon.AntDesign} style={{ paddingHorizontal: 25 }} name={params?.is_fav ? "heart" : "hearto"} onPress={() => { }} />
            }
        })
    }, [])


    const deleteNow = () => {
        new OfflineListAction(contact_listDispatch).deleteItem(Define.CONTACTS, params.id)
        navigate(URL.HOME_SCREEN)
    }


    return (
        <Container style={{
            position: "relative",
            height: "100%"
        }}>

            <View >
                <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    {params?.pic ? <Image style={styles.img} width={100} height={100} source={{ uri: params?.pic }} /> : <View style={[styles.img, { backgroundColor: Helper?.ramdomColor() || Theme.COLOR_GRAY }]}>
                        <Text style={{ color: Theme.COLOR_WHITE, fontSize: 30 }}>{params?.name.slice(0, 2)}</Text>
                    </View>}
                </View>
                <View style={[styles.borderBottm, styles.nameBox]}>
                    <Text style={[styles.name]} >{params.name}</Text>
                    <Icon size={28} name="trash" type={DefineIcon.FAIcon} onPress={deleteNow} />
                </View>


                {/* call icon */}
                <View style={[styles.borderBottm, { flexDirection: "row", justifyContent: "space-around", alignItems: "center" }]}>

                    <TouchableOpacity
                        onPress={() => { Linking.openURL(`tel:${params.phone_code}${params.phone}`) }}
                        style={styles.iconbox}>
                        <Icon size={28} name="phone" type={DefineIcon.AntDesign} />
                        <Text style={{ color: Theme.COLOR_PRIMARY }}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { Linking.openURL(`sms://:${params.phone_code}${params.phone}`) }}
                        style={styles.iconbox}>
                        <Icon size={28} name="chatbox-outline" type={DefineIcon.Ionicon} />
                        <Text style={{ color: Theme.COLOR_PRIMARY }}>Text</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { Linking.openURL(`https://meet.google.com/`) }}
                        style={styles.iconbox}>
                        <Icon size={28} name="video" type={DefineIcon.Feather} />
                        <Text style={{ color: Theme.COLOR_PRIMARY }}>Video</Text>
                    </TouchableOpacity>
                </View>
                {/* phone number box icon */}
                <View>
                    <SingleRow item={params} hideMore={true} />
                </View>
            </View>

            <View style={styles.edit}>
                <MButton
                    onPress={
                        () => {
                            navigate(URL.CREATE_PASSWORD, params)
                        }
                    }
                    color={Theme.COLOR_PRIMARY} title="Edit Contact"
                />

            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    img: {
        height: 100,
        width: 100,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    nameBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    name: {
        color: Theme.COLOR_BLACK,
        fontSize: 30,
    },
    iconbox: {
        justifyContent: "center",
        alignItems: "center"
    },
    borderBottm: {
        borderBottomColor: Theme.COLOR_GRAY,
        borderBottomWidth: 0.5,
        paddingVertical: 15
    },
    edit: {
        position: "absolute",
        bottom: 0,
        right: 0,
    }
})