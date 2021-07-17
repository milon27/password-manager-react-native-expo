import axios from "axios"
import Response from './../../helpers/Response';
import Define from './../../helpers/Define';
import Types from "./Types";
//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'

class AuthAction {
    constructor(dispatch) {
        this.dispatch = dispatch
    }
    //isLoggedIn
    IsLoggedIn = () => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.get('auth/is-loggedin')
                const resBoolean = res.data
                //clear async storage if false
                if (!resBoolean) {
                    await AsyncStorage.removeItem(Define.C_USER)
                }
                //update auth state
                this.dispatch({
                    type: Types.AUTH_STATE,
                    payload: resBoolean
                })
                resolve(resBoolean)
            } catch (e) {
                resolve(false)
            }
        })//end promise
    }
    //Logout
    Logout = () => {
        //student/logout
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('auth/logout')
                const { error, message, data } = res.data
                if (error) {
                    reject(new Error(message))
                } else {
                    //logout success
                    //remove from localstorage/asyncstorage
                    await AsyncStorage.removeItem(Define.C_USER)
                    await AsyncStorage.removeItem(Define.AUTH_PASS)
                    //update UI
                    this.dispatch({
                        type: Types.AUTH_LOGOUT
                    })
                    //resolve promise
                    const response_ui = Response(true, "Logged Out Successful", message, Define.BT_SUCCESS, data)
                    resolve(response_ui)
                }
            } catch (e) {
                reject(new Error(e.message))
            }
        })
    }

    //login student/user
    login = (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.post('auth/login', { email, pass: password })
                const { error, message, data } = res.data
                //console.log("res.data", res.data)
                if (error) {
                    reject(new Error(message))
                } else {
                    //login success
                    //save to localstorage
                    //console.log("login response", data)
                    await AsyncStorage.setItem(Define.C_USER, JSON.stringify(data))
                    await AsyncStorage.setItem(Define.AUTH_PASS, password)
                    await AsyncStorage.setItem(Define.AUTH_EMAIL, email)

                    //update UI
                    this.dispatch({
                        type: Types.AUTH_LOGIN,
                        payload: data//user object
                    })
                    //resolve promise
                    const response_ui = Response(true, "Logged In Successful", message, Define.BT_SUCCESS, data)
                    resolve(response_ui)
                }
            } catch (e) {
                reject(new Error(e.message))
            }
        })//end promise
    }
    //signup a user/student 
    //@param student object{student_id,name,email,phone,parents_phone,password,present_address,photo_url}
    signup = (student_obj) => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.post('auth/signup', student_obj)
                const { error, message, data } = res.data
                if (error) {
                    console.log("we are here..1" + message);
                    reject(new Error(message))
                } else {
                    //login success
                    //save to localstorage
                    //delete data.token
                    await AsyncStorage.setItem(Define.C_USER, JSON.stringify(data))
                    await AsyncStorage.setItem(Define.AUTH_PASS, student_obj.pass)
                    await AsyncStorage.setItem(Define.AUTH_EMAIL, student_obj.email)
                    //update UI
                    this.dispatch({
                        type: Types.AUTH_SIGNUP,
                        payload: data//user object
                    })
                    //resolve promise
                    const response_ui = Response(true, "SignUP Successful", message, Define.BT_SUCCESS, data)
                    resolve(response_ui)
                }
            } catch (e) {
                console.log("we are here.." + e.message);
                reject(new Error(e.message))
            }
        })//end promise
    }

}

export default AuthAction