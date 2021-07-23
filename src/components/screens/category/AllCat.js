import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import Container from './../../layouts/Container';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from "@react-navigation/native";
import Theme from './../../../utils/helpers/Theme';
import AxiosHelper from './../../../utils/helpers/AxiosHelper';
import Helper from './../../../utils/helpers/Helper';
import Icon from './../../layouts/icon/Icon';
import DefineIcon from './../../layouts/icon/DefineIcon';
import AreYouSureAlert from './../../layouts/modal/AreYouSureAlert';

export default function AllCat() {
    const isFocused = useIsFocused();
    const [cat, setCat] = useState([])

    useEffect(() => {
        // console.log("load category")
        const token = AxiosHelper.getSource()
        const load = async () => {
            try {
                const uid = await Helper.getUserID()
                const data = await AxiosHelper.getData(`pass/get-all-cat/${uid}/`, token)
                if (data.success) {
                    // console.log("data:", data)
                    setCat(data.object)
                }
            } catch (e) {
                console.log("error HomeScreen.js->", e);
            }
        }
        if (isFocused) {
            load()
        }
        return () => {
            token.cancel()
        }
    }, [isFocused, cat.length])

    const renderCategory = ({ item }) => {
        const onDelete = () => {
            console.log(item?._id);

            AreYouSureAlert("Are you sure you want to delete this category?", async () => {
                const { success } = await AxiosHelper.deleteData(`pass/del-cat/${item?._id}`)
                //console.log("success: ", success);
                if (success) {
                    setCat(old => {
                        return old.filter((itm) => {
                            return itm?._id !== item?._id
                        })
                    })
                }
            })
        }

        return <TouchableOpacity onPress={onDelete} style={styles.item_container}>
            <Text style={{ color: Theme.COLOR_BLACK, fontSize: 18 }}>{item?.title}</Text>
            <Icon size={25} name="delete-outline" type={DefineIcon.MaterialIcon} />
        </TouchableOpacity>
    }

    return (
        <Container style={{ padding: 8 }}>
            <StatusBar style={Theme.STATUS_BAR} />
            <FlatList
                style={{ paddingTop: 12 }}
                data={cat}
                renderItem={renderCategory}
                ListEmptyComponent={<Text style={{ color: Theme.COLOR_BLACK, padding: 10, textAlign: "center" }}>No Cateogy Found!</Text>}
                keyExtractor={item => (String(item._id))}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    item_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
    }
})
