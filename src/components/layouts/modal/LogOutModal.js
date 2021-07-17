import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import MModal from './MModal'
import AuthAction from './../../../utils/context/actions/AuthAction';
import { DispatchContext } from '../../../utils/context/MainContext';
import Theme from '../../../utils/helpers/Theme';

export default function LogOutModal({ open, setOpen }) {

    const { authDispatch } = useContext(DispatchContext)

    const onLogout = async () => {
        await new AuthAction(authDispatch).Logout()
    }

    return (
        <MModal title="Logout!" open={open || false} setOpen={setOpen} onSubmit={onLogout} submitText="Logout">
            <Text style={{ color: Theme.COLOR_BLACK }}>Are you sure to logout? </Text>
        </MModal>
    )
}
