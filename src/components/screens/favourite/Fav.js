import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { useIsFocused } from "@react-navigation/native";
import { StateContext, DispatchContext } from './../../../utils/context/MainContext';
import SingleRow from './../dashboard/SingleRow';
import Theme from '../../../utils/helpers/Theme';
import Container from './../../layouts/Container';
import ListAction from './../../../utils/context/actions/ListAction';
import AppAction from './../../../utils/context/actions/AppAction';
import { StatusBar } from 'expo-status-bar';

export default function Fav() {

    const isFocused = useIsFocused();
    const { app, pass } = useContext(StateContext)
    const { appDispatch, passDispatch } = useContext(DispatchContext)



    useEffect(() => {
        // console.log("load password")
        const listAc = new ListAction(passDispatch)
        const token = listAc.getSource()
        const load = async () => {
            const appac = new AppAction(appDispatch)
            try {
                //load password..
                appac.START_LOADING()
                const val = await listAc.getAll(`pass/get-all-fav/`, [])
                //console.log("fav pass val =", val)
                appac.STOP_LOADING()
            } catch (e) {
                appac.STOP_LOADING()
                console.log("error FavScreen.js->", e);
            }
        }
        if (isFocused) {
            load()
        }

        return () => {
            token.cancel()
        }
    }, [isFocused, pass.length])

    const renderItem = ({ item }) => {
        return <SingleRow item={item} />
    }

    return (
        <Container
            style={{ paddingHorizontal: 8, paddingTop: 2 }}
        >
            <StatusBar style={Theme.STATUS_BAR} />
            {app.loading ? <ActivityIndicator
                style={{ paddingTop: 12 }}
                color={Theme.COLOR_PRIMARY}
            /> : <></>}

            <FlatList
                data={pass}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={{ color: Theme.COLOR_BLACK, padding: 10, textAlign: "center" }}>No Password Found In Favourite List!</Text>}

                keyExtractor={item => (String(item._id))}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </Container>
    )
}
