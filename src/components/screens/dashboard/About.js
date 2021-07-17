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
        </Container>
    )
}
