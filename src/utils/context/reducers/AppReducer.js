
import Types from './../actions/Types';
import Response from './../../helpers/Response';

export const initAppState = {
    loading: false,
    response: Response(null, null, null, null),
    reload: false//just update it so it will effect useEffect Hook so will reload automatically:)
};

const AppReducer = (app_state, action) => {
    switch (action.type) {
        case Types.START_LOADING:
            return {
                ...app_state,
                loading: true
            }
        case Types.STOP_LOADING:
            return {
                ...app_state,
                loading: false
            }
        case Types.SET_RESPONSE:
            return {
                ...app_state,
                response: action.payload//full response object
            }
        case Types.REMOVE_RESPONSE:
            return {
                ...app_state,
                response: Response(null, null, null, null)//full response object
            }
        case Types.RELOAD:
            return {
                ...app_state,
                reload: !app_state.reload//just change it will auto call useEffect
            }
        default:
            return app_state;
    }
}
export default AppReducer;