import React from 'react'
import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native'
import Theme from '../../utils/helpers/Theme'

export default function Container({ barStyle = "dark-content", bgColor, children, style }) {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar barStyle={barStyle} backgroundColor={bgColor || Theme.COLOR_BG} />
            <View style={style}>
                {children}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: Theme.COLOR_BG
    }
})
