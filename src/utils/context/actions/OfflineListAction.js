import Response from '../../helpers/Response';
import Types from './Types';
import Define from '../../helpers/Define';
//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'

class OfflineListAction {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }
    //get all data
    getAll = (key) => {
        return new Promise(async (resolve, reject) => {
            let data = await AsyncStorage.getItem(key)
            if (data) {
                data = data
                //dispatch the global state
                this.dispatch({
                    type: Types.GET_DATA,
                    payload: JSON.parse(data)//an array
                });
                resolve(Response(true, "success", "", Define.BT_SUCCESS, JSON.parse(data)));
            } else {
                reject()
            }
        });
    }//end get all(make sure you got a response (object type) )
    addData = (key, newdata) => {
        return new Promise(async (resolve, reject) => {
            let data = await AsyncStorage.getItem(key)
            let update = [newdata]
            if (data) {
                update = [newdata, ...JSON.parse(data)]
            }
            await AsyncStorage.setItem(key, JSON.stringify(update))
            //dispatch the global state
            this.dispatch({
                type: Types.ADD_DATA,
                payload: newdata//a newly created object
            });
            resolve(Response(true, "success", "", Define.BT_SUCCESS, newdata));
        });
    }//end add data

    updateItem = async (key, obj) => {
        let data = await AsyncStorage.getItem(key)

        if (data) {
            let list = [...JSON.parse(data)]
            list = list.map(item => {
                if (item.id === obj.id) {
                    return obj
                } else {
                    return item
                }
            })
            await AsyncStorage.setItem(key, JSON.stringify(list))
            //
            this.dispatch({
                type: Types.UPDATE_DATA,
                payload: {
                    id_field: "id",
                    obj: obj
                }
            });
        }
    }

    deleteItem = async (key, id) => {
        let data = await AsyncStorage.getItem(key)

        if (data) {
            let list = [...JSON.parse(data)]
            list = list.filter(item => item.id !== id)
            await AsyncStorage.setItem(key, JSON.stringify(list))
            //
            this.dispatch({
                type: Types.DELETE_DATA,
                payload: id//deleted id
            });
        }
    }
}


export default OfflineListAction;