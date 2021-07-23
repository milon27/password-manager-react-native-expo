import axios from "axios";
import Define from "./Define";
import Response from './Response';

const AxiosHelper = {

    getSource: () => {
        return axios.CancelToken.source()
    }, //return token to cancel the request

    //get the object 
    getData: (url, source) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${url}`, {
                    cancelToken: source.token,
                })
                .then((res) => {
                    const { error, message, data } = res.data;
                    if (error === false) {
                        //no error
                        resolve(
                            Response(true, "success", message, Define.BT_SUCCESS, data)
                        );
                    } else {
                        resolve(
                            Response(false, "failed", message, Define.BT_DANGER)
                        );
                    }
                })
                .catch((e) => {
                    if (axios.isCancel(e)) {
                        resolve(
                            Response(false, "failed", "canceled the request", Define.BT_DANGER)
                        );
                    } else {
                        resolve(
                            Response(false, "failed", e.message, Define.BT_DANGER)
                        );
                    }
                });
        });
    },//get end 


    addData: (url, newdata) => {
        return new Promise((resolve, reject) => {
            axios
                .post(url, newdata)
                .then((res) => {
                    const { error, message, data } = res.data;
                    if (error === false) {
                        //no error
                        resolve(
                            Response(true, "success", message, Define.BT_SUCCESS, data)
                        );
                    } else {
                        //error
                        resolve(
                            Response(false, "failed", message, Define.BT_DANGER)
                        );
                    }
                })
                .catch((e) => {
                    resolve(
                        Response(false, "failed", e.message, Define.BT_DANGER)
                    );
                });
        });
    }, //end add data

    updateData: (url, updateData) => {
        return new Promise((resolve, reject) => {
            axios.put(url, updateData).then((res) => {
                const { error, message, data } = res.data
                if (error === false) {
                    resolve(Response(true, "update succes", message, Define.BT_SUCCESS, data));
                } else {
                    resolve(
                        Response(false, "failed", message, Define.BT_DANGER)
                    );
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                resolve(
                    Response(false, "failed", e.message, Define.BT_DANGER)
                );
            })
        });
    },//end update data

    deleteData: (url) => {
        return new Promise((resolve, reject) => {
            axios.delete(url).then((res) => {
                const { error, message, data } = res.data
                if (error === false) {
                    resolve(Response(true, "delete succes", message, Define.BT_SUCCESS, {}));
                } else {
                    console.error("error del : ", res.data)
                    resolve(
                        Response(false, "failed", message, Define.BT_DANGER)
                    );
                }
            }).catch((e) => {
                console.error("erroe: ", e)
                resolve(
                    Response(false, "failed", e.message, Define.BT_DANGER)
                );
            })
        });
    },//end update data



}
export default AxiosHelper