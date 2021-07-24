import React from 'react'
import { Text, View, Linking } from 'react-native'
import Container from '../../layouts/Container';
import Theme from './../../../utils/helpers/Theme';

export default function About() {
    const onpress = () => {
        Linking.openURL("https://milon27.web.app/")
    }
    return (
        <Container style={{ justifyContent: "center" }}>
            <Text selectable={true} selectionColor='orange' style={{ color: Theme.COLOR_BLACK, textAlign: "center" }}>Developed By: milon27 </Text>
            <Text onPress={onpress} selectable={true} selectionColor='orange' style={{ color: Theme.COLOR_BLACK, textAlign: "center" }}>Visit: https://milon27.web.app/ </Text>

            <Text selectable={true} selectionColor='orange' style={{ color: Theme.COLOR_BLACK, textAlign: "center", marginTop: 30 }}>

                We use 256-bit AES encryption to protect the contents,
                Your data is encrypted and decrypted at the device level. Data stored in our server is kept secret, even from us. Your master password, and the keys used to encrypt and decrypt data, are never sent to our servers, and are never accessible by us.
            </Text>
        </Container>
    )
}
