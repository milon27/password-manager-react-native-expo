import React, { useContext, useState, useEffect, useRef } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Container from '../../layouts/Container';
import Theme from '../../../utils/helpers/Theme';
import SingleRow from './SingleRow';
import AxiosHelper from './../../../utils/helpers/AxiosHelper';
import SingleCat from './SingleCat';
import { DispatchContext, StateContext } from './../../../utils/context/MainContext';
import ListAction from './../../../utils/context/actions/ListAction';
import Helper from './../../../utils/helpers/Helper';
import AppAction from './../../../utils/context/actions/AppAction';
import Icon from './../../layouts/icon/Icon';
import DefineIcon from './../../layouts/icon/DefineIcon';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import URL from './../../../utils/helpers/URL';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {

    const scrollY = new Animated.Value(0)
    // const diffClamp=Diff
    const translateY = scrollY.interpolate({
        inputRange: [0, 60],
        outputRange: [0, 70]
    })

    const nav = useNavigation()
    const isFocused = useIsFocused();
    const addIcon = useRef(null)

    const [cat, setCat] = useState([])
    const [select, setSelect] = useState(cat[0]?._id)
    const { app, pass } = useContext(StateContext)
    const { appDispatch, passDispatch } = useContext(DispatchContext)


    //load category at once

    useEffect(() => {
        // console.log("load category")
        const token = AxiosHelper.getSource()
        const load = async () => {
            try {
                const uid = await Helper.getUserID()
                const data = await AxiosHelper.getData(`pass/get-all-cat/${uid}/`, token)
                if (data.success) {
                    // console.log("data:", data)
                    setCat(old => {
                        return [{
                            _id: "all_cat",
                            title: "All"
                        }, ...data.object]
                    })
                    //set all_cat as id
                    setSelect(cat[0]?._id)
                }
            } catch (e) {
                console.log("error HomeScreen.js->", e);
            }
        }
        if (isFocused) {
            load()
        }
        return () => {
            token.cancel()
        }
    }, [isFocused, cat.length])

    useEffect(() => {
        // console.log("load password")
        const listAc = new ListAction(passDispatch)
        const token = listAc.getSource()
        const load = async () => {
            const appac = new AppAction(appDispatch)
            try {
                //load password..
                appac.START_LOADING()
                const uid = await Helper.getUserID()
                if (select === "all_cat") {
                    await listAc.getAll(`pass/get-all/${uid}/`, [])
                } else {
                    await listAc.getAll(`pass/get-all/${uid}/${select}`, [])
                }
                // const val =
                //console.log("home pass val =", val)
                appac.STOP_LOADING()
            } catch (e) {
                appac.STOP_LOADING()
                console.log("error HomeScreen.js->", e);
            }
        }
        if (isFocused && select) {
            load()
        }

        return () => {
            token.cancel()
        }
    }, [isFocused, select, pass.length])


    const renderItem = ({ item }) => {
        return <SingleRow item={item} />
    }

    const renderCategory = ({ item }) => {
        return <SingleCat setSelect={setSelect} item={item} select={select} />
    }

    return (
        <>

            <Container style={{ padding: 8 }}>
                <StatusBar style={Theme.STATUS_BAR} />
                <FlatList
                    horizontal={true}
                    data={cat}
                    renderItem={renderCategory}
                    keyExtractor={item => (String(item._id))}
                    ListEmptyComponent={<SingleCat item={{ title: "No Category" }} />}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />

                {app.loading ? <ActivityIndicator
                    style={{ paddingTop: 12 }}
                    color={Theme.COLOR_PRIMARY}
                /> : <></>}

                <FlatList
                    style={{ paddingTop: 12, marginBottom: 60 }}
                    data={pass}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text style={{ color: Theme.COLOR_BLACK, padding: 10, textAlign: "center" }}>No Password Found In this Category!</Text>}
                    keyExtractor={item => (String(item._id))}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    // onScrollEndDrag={() => {
                    //     // addIcon.current.hide = true
                    //     console.log("end...");
                    // }}
                    // onScrollBeginDrag={() => {
                    //     console.log("top...");
                    // }}
                    onScroll={(e) => {
                        let yvalue = e.nativeEvent.contentOffset.y
                        scrollY.setValue(yvalue)
                        // if (yvalue > 20) {
                        //     //hide

                        // } else {
                        //     //show
                        // }
                    }}

                />
            </Container>


            <TouchableOpacity ref={addIcon} onPress={async () => {
                nav.navigate(URL.CREATE_PASSWORD)
            }} style={styles.buttonCallout} >
                <Animated.View style={{
                    transform: [
                        { translateX: translateY }
                    ]
                }}>
                    <Icon size={65} style={styles.icon} name="add-circle" type={DefineIcon.Ionicon} />
                </Animated.View>
            </TouchableOpacity>




        </>
    )
}

const styles = StyleSheet.create({
    buttonCallout: {
        position: 'absolute',
        bottom: 10,
        right: 25
    },
    icon: {
        color: Theme.COLOR_PRIMARY
    }
})