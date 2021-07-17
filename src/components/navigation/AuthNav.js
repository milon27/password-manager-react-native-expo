import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './../screens/auth/SignIn';
import SignUp from './../screens/auth/SignUp';
import URL from './../../utils/helpers/URL';

const authStack = createStackNavigator()
/**
 * @description we will use it to navigate to different screen when the user is not logged in.
 */
export default function AuthNav() {
    return (//headerMode="none"
        <authStack.Navigator screenOptions={{ headerShown: false }}>
            <authStack.Screen name={URL.SIGN_IN} component={SignIn}></authStack.Screen>
            <authStack.Screen name={URL.SIGN_UP} component={SignUp}></authStack.Screen>
        </authStack.Navigator>
    )
}
