import axios from 'axios'
import Response from '../../helpers/Response';
import Types from './Types';
import Define from './../../helpers/Define';
import Helper from '../../helpers/Helper';

class ListAction {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }
    getSource = () => {
        this.source = axios.CancelToken.source();
        return this.source
    }//return token to cancel the request

    //get all data
    getAll = async (url, errorObj = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(`${url}`
                , {
                    cancelToken: this.source.token
                }
            ).then((res) => {
                const { error, message, data } = res.data
                if (error === false) {//no error
                    //dispatch the global state
                    // console.log("getting the all pass");
                    // data.forEach(async (item) => {
                    //     const val = await Helper.decryptPass(item.password)
                    //     console.log("pass server -> ", val);
                    // })
                    this.dispatch({
                        type: Types.GET_DATA,
                        payload: data//an array
                    });
                    resolve(Response(true, "success", message, Define.BT_SUCCESS, data));
                } else {
                    this.dispatch({
                        type: Types.GET_DATA,
                        payload: errorObj//an array
                    });
                    resolve(Response(false, "failed", message, Define.BT_DANGER, errorObj));
                }
            }).catch(e => {
                if (axios.isCancel(e)) {
                    this.dispatch({
                        type: Types.GET_DATA,
                        payload: errorObj//an array
                    });
                    resolve(Response(false, "canceled the request", e.message, Define.BT_DANGER, errorObj));
                } else {
                    this.dispatch({
                        type: Types.GET_DATA,
                        payload: errorObj//an array
                    });
                    resolve(Response(false, "failed", e.message, Define.BT_DANGER, errorObj));
                }
            });
        });
    }//end get all(make sure you got a response (object type) )
    addData = (url, newdata) => {
        return new Promise((resolve, reject) => {
            axios.post(url, newdata).then((res) => {
                const { error, message, data } = res.data
                if (error === false) {//no error
                    //dispatch the global state
                    this.dispatch({
                        type: Types.ADD_DATA,
                        payload: data//a newly created object
                    });
                    resolve(Response(true, "success", message, Define.BT_SUCCESS, data));
                } else {//error
                    resolve(Response(false, "failed", message, Define.BT_DANGER));
                }
            }).catch((e) => {
                resolve(Response(false, "failed", e.message, Define.BT_DANGER));
            })
        });
    }//end add data


    deleteData = (url, id) => {
        return new Promise((resolve, reject) => {

            // this.dispatch({
            //     type: Types.DELETE_DATA,
            //     payload: id//a newly created object
            // });
            // resolve(Response(true, "success", "message", Define.BT_SUCCESS, ""));

            axios.delete(url).then((res) => {
                const { error, message, data } = res.data

                if (error === false) {//no error
                    //dispatch the global state
                    console.log("doing dispatch ->", res.data)
                    this.dispatch({
                        type: Types.DELETE_DATA,
                        payload: id//a newly created object
                    });
                    resolve(Response(true, "success", message, Define.BT_SUCCESS, data));
                } else {//error
                    resolve(Response(false, "failed", message, Define.BT_DANGER));
                }
            }).catch((e) => {
                resolve(Response(false, "failed", e.message, Define.BT_DANGER));
            })
        });
    }

    // updateData = (url, updateData) => {
    //     return new Promise((resolve, reject) => {
    //         axios.put(url, updateData).then((res) => {
    //             const { error, message, response } = res.data
    //             if (error === false) {
    //                 //dispatch the global state
    //                 this.dispatch({
    //                     type: Types.UPDATE_DATA,
    //                     payload: response
    //                 });
    //                 resolve(Response(true, "update succes", message, Define.BT_SUCCESS, response));
    //             } else {
    //                 reject(new Error(message));
    //             }
    //         }).catch((e) => {
    //             console.error("erroe: ", e)
    //             reject(e);
    //         })
    //     });
    // }//end update data


}


export default ListAction;