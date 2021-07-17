
import Types from '../actions/Types';
export const initListState = [];

const ListReducer = (state, action) => {
    switch (action.type) {
        case Types.GET_DATA:
            return [...action.payload];//return an array
        case Types.ADD_DATA:
            return [action.payload, ...state];//return array with new object
        case Types.UPDATE_DATA:
            state = state.map(itm => {
                const id_field = action.payload.id_field
                if (itm[id_field] === action.payload.obj[id_field])
                    return action.payload.obj;
                else
                    return itm;
            });
            return state;//return array with updated object
        case Types.DELETE_DATA:
            state = state.filter(itm => {
                return itm?._id !== action.payload//id
            });
            console.log(state.length)
            return state;//return array with updated object
        default:
            return state;//default arry
    }

}
export default ListReducer;