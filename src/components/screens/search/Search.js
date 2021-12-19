import { StatusBar } from 'expo-status-bar'
import React, { useContext, useState } from 'react'
import { useIsFocused } from "@react-navigation/native";
import { Text, ActivityIndicator, FlatList } from 'react-native'
import Theme from '../../../utils/helpers/Theme'
import Container from '../../layouts/Container'
import { DispatchContext, StateContext } from '../../../utils/context/MainContext';
import Input from '../../layouts/form/Input';
import Icon from '../../layouts/icon/Icon';
import DefineIcon from '../../layouts/icon/DefineIcon';
import AxiosHelper from '../../../utils/helpers/AxiosHelper';

import SingleRow from '../dashboard/SingleRow';

const Search = () => {
    const isFocused = useIsFocused();
    const { app, pass } = useContext(StateContext)
    const { appDispatch, passDispatch } = useContext(DispatchContext)
    const [searchList, setSearchList] = useState([])
    const [title, setTitle] = useState("")


    const renderItem = ({ item }) => {
        return <SingleRow item={item} />
    }

    const searchNow = async () => {
        //http://localhost:2727/pass/search/:title
        const source = AxiosHelper.getSource()
        const result = await AxiosHelper.getData(`pass/search/${title}`, source)
        if (result.success === true) {
            setSearchList(result.object);
        } else {
            setSearchList([]);
        }

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

            <Input
                autoCapitalize={'none'}
                value={title}
                error={""}
                icon={<Icon type={DefineIcon.Feather} size={17} name="search" />}
                label="Search By Password Title"
                hideLevel={true}
                onChangeText={(text) => {
                    if (text.length == 0) {
                        setSearchList([]);
                    }
                    setTitle(text)
                }}
                onDone={() => {
                    searchNow()
                }}
            />

            <FlatList
                data={searchList}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={{ color: Theme.COLOR_BLACK, padding: 10, textAlign: "center" }}>No Password Found In Search Result!</Text>}

                keyExtractor={item => (String(item._id))}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </Container>
    )

}

export default Search
