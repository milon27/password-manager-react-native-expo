import React from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity, Linking } from 'react-native'
import Theme from './../../../utils/helpers/Theme';
import Helper from './../../../utils/helpers/Helper';

export default function SingleCat({ item, setSelect }) {

    return <View style={styles.item_container}>
        <TouchableOpacity onPress={() => {
            if (item.title !== "No Category")
                setSelect(item?._id)
            Helper.Toast(item.title)
        }}>
            <Text style={{ color: Theme.COLOR_BG }}>{item.title}</Text>
        </TouchableOpacity>
    </View >
}

const styles = StyleSheet.create({
    item_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 5,
        backgroundColor: Theme.COLOR_PRIMARY,
        borderRadius: 30,
    },

})
