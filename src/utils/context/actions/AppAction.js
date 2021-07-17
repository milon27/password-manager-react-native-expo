import Types from './Types';

class AppAction {
    constructor(dispatch) {
        this.dispatch = dispatch
    }
    //process
    START_LOADING = () => {
        this.dispatch({
            type: Types.START_LOADING,
        });
    }
    STOP_LOADING = () => {
        this.dispatch({
            type: Types.STOP_LOADING,
        });
    }
    SET_RESPONSE = (response) => {
        this.dispatch({
            type: Types.SET_RESPONSE,
            payload: response
        });
    }
    REMOVE_RESPONSE = () => {
        this.dispatch({
            type: Types.REMOVE_RESPONSE,
        });
    }
    RELOAD = () => {
        this.dispatch({
            type: Types.RELOAD,
        });
    }
}

export default AppAction;