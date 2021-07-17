import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Theme from './../../../utils/helpers/Theme';
import { StatusBar } from 'expo-status-bar';

export default function Splash() {
    return (
        <View style={styles.container}>
            <StatusBar style={Theme.STATUS_BAR_ALT} />

            {/* <StatusBar backgroundColor={Theme.COLOR_PRIMARY} /> */}
            <View style={styles.logo_container}>
                <Image
                    height={75}
                    width={75}
                    source={require('../../../assets/img/logo.png')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.text}>Password</Text>
            <Text style={styles.text}>Manager</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Theme.COLOR_PRIMARY
    },
    text: {
        color: Theme.COLOR_WHITE,
        fontSize: 35,
        textAlign: "center"
    },
    logo: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,

    },
    logo_container: {
        margin: 15,
        padding: 8,
        alignSelf: "center",
        borderRadius: 75 / 2,
        backgroundColor: "white"
    },
})
