import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Theme from './../../utils/helpers/Theme';
import AppAction from './../../utils/context/actions/AppAction';
import { useContext } from 'react';
import { DispatchContext } from '../../utils/context/MainContext';

export default function ResponseLayout({ response }) {

    const { appDispatch } = useContext(DispatchContext)

    useEffect(() => {
        setTimeout(() => {
            new AppAction(appDispatch).REMOVE_RESPONSE()
        }, 4000);
    }, [response?.title])

    if (!response.title) {
        return <React.Fragment />
    }

    return (
        <View style={[styles.container, { backgroundColor: response.type }]}>
            <Text style={styles.text}>{response?.title}</Text>
            <Text style={styles.text}>{response?.desc}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        paddingHorizontal: 10,
        elevation: 4,
        paddingVertical: 20
    },
    text: {
        color: Theme.COLOR_WHITE,
        fontSize: 18
    }
})
