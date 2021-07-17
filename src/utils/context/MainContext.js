import React, { createContext, useReducer } from 'react'
import AppReducer, { initAppState } from './reducers/AppReducer';
import AuthReducer, { initAuthState } from './reducers/AuthReducer';
import ListReducer, { initListState } from './reducers/ListReducer';

export const StateContext = createContext();
export const DispatchContext = createContext();

export default function MainContext(props) {
    const [auth, authDispatch] = useReducer(AuthReducer, initAuthState);//for student auth
    const [app, appDispatch] = useReducer(AppReducer, initAppState);//for app state
    const [pass, passDispatch] = useReducer(ListReducer, initListState);//for any kind of list


    const global_state = {
        auth, app, pass
    }
    const global_dispatch = {
        authDispatch, appDispatch, passDispatch
    }

    return (
        <StateContext.Provider value={global_state}>
            <DispatchContext.Provider value={global_dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
