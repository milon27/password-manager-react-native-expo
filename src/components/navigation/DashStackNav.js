import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../screens/dashboard/HomeScreen';
import ContactDetail from './../screens/dashboard/ContactDetail';
import CreatePassword from './../screens/dashboard/CreatePassword';
import About from './../screens/dashboard/About';
import SignIn from './../screens/auth/SignIn';
import URL from './../../utils/helpers/URL';
import { useNavigation } from '@react-navigation/native';
import Theme from './../../utils/helpers/Theme';
import Icon from './../layouts/icon/Icon';
import DefineIcon from '../layouts/icon/DefineIcon';
import CreateCategory from './../screens/dashboard/CreateCategory';
import Fav from './../screens/favourite/Fav';
import AllCat from './../screens/category/AllCat';
import ChangePassword from './../screens/password/ChangePassword';
import { useFonts, LobsterTwo_400Regular } from '@expo-google-fonts/lobster-two';
import { Text } from 'react-native';

const dashStack = createStackNavigator()
/**
 * @description we will use it to navigate to different screen when the user is logged in.
 */
export default function DashStackNav() {
    const nav = useNavigation()

    let [fontsLoaded] = useFonts({
        LobsterTwo_400Regular
    });


    return (
        <dashStack.Navigator initialRouteName={URL.HOME_SCREEN}

            screenOptions={
                {
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        color: Theme.COLOR_BLACK
                    },
                    headerLeft: ({ canGoBack }) => (<Icon type={DefineIcon.FAIcon} size={28} style={{ paddingHorizontal: 25 }} name="angle-left" onPress={() => { canGoBack ? nav.goBack() : "" }} />),
                    headerStyle: {
                        backgroundColor: Theme.COLOR_BG,
                        elevation: 1,
                        shadowColor: Theme.COLOR_GRAY,
                        shadowOpacity: 1,
                    }
                }
            }//global header style
        >

            <dashStack.Screen name={URL.HOME_SCREEN} component={HomeScreen}
                options={
                    {
                        title: "Passwordz",
                        headerTitleStyle: {
                            fontFamily: !fontsLoaded ? "" : 'LobsterTwo_400Regular', fontSize: 28
                        },
                        // align-left
                        headerLeft: () => (<Icon size={28} type={DefineIcon.Feather} style={{ paddingHorizontal: 25 }} name="settings" onPress={() => { nav.toggleDrawer() }} />),
                        headerRight: () => {
                            return <Icon size={28} type={DefineIcon.Feather} style={{ paddingHorizontal: 25 }} name="bookmark" onPress={() => { nav.navigate(URL.FAV_PASSWORD) }} />
                        }
                    }
                }//home header style
            />
            <dashStack.Screen name={URL.CONTACT_DETAIL} component={ContactDetail} />
            <dashStack.Screen name={URL.CREATE_PASSWORD} component={CreatePassword} />
            <dashStack.Screen name={URL.ALL_CATEGORY} component={AllCat} />
            <dashStack.Screen name={URL.CREATE_CATEGORY} component={CreateCategory} />
            <dashStack.Screen name={URL.FAV_PASSWORD} component={Fav} />
            <dashStack.Screen name={URL.CHANGE_PASSWORD} component={ChangePassword} />
            <dashStack.Screen name={URL.ABOUT} component={About} />
            <dashStack.Screen name={URL.SIGN_IN} component={SignIn} />
        </dashStack.Navigator >
    )
}
