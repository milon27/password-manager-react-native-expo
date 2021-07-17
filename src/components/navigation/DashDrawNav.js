import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DashStackNav from './DashStackNav';
import URL from './../../utils/helpers/URL';
import DrawerContent from './DrawerContent';

const drawer = createDrawerNavigator()

/**
 * @description we will use it to navigate from drawer nav bar.
 */

export default function DashDrawNav() {

    return (
        <drawer.Navigator
            drawerType="front"
            drawerContent={(props) => { return <DrawerContent {...props} /> }}
        >
            <drawer.Screen name={URL.HOME_NAV} component={DashStackNav}></drawer.Screen>
        </drawer.Navigator >
    )
}
