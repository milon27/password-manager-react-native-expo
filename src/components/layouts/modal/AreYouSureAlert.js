import React from 'react'
import { Alert } from 'react-native'

export default function AreYouSureAlert(msg, dothis) {
    return Alert.alert(
        "Are your sure?",
        msg || "Are you sure you want to perform this action?",
        [
            // The "Yes" button
            {
                text: "Yes",
                onPress: () => {
                    dothis()
                    console.log("okkkk");
                },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
                text: "No",
            },
        ]
    );
}
