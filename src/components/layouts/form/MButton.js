import React, { useState } from 'react'
import { Pressable, Text, StyleSheet, ActivityIndicator, View } from 'react-native'
import Theme from './../../../utils/helpers/Theme';
//todo: add loading..
export default function MButton({ title, style, color, loading, onPress, disabled, ...props }) {


    return (
        <View style={style}>
            <Pressable
                onPress={onPress}
                android_ripple={{ color: Theme.COLOR_ACCENT }}
                style={({ pressed }) => [{ backgroundColor: pressed ? loading ? Theme.COLOR_GRAY : Theme.COLOR_ACCENT : color }, styles.btn_container, { backgroundColor: loading ? Theme.COLOR_GRAY : color }]}
                disabled={disabled}
                {...props}
            >
                {loading ? <ActivityIndicator color={Theme.COLOR_WHITE} /> : <Text style={styles.btn_text}>{title}</Text>}
            </Pressable >
        </View>
    )
}


const styles = StyleSheet.create({
    btn_container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 15,
        height: 45,
        elevation: 4,
        zIndex: 2
    },
    btn_text: {
        paddingHorizontal: 10,
        fontSize: 15,
        color: Theme.COLOR_WHITE,
    }
})
