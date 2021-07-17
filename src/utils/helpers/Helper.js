import Theme from './Theme';
import {
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Define from './Define';
import CryptoES from 'crypto-es';

const Helper = {
    validateField: (...arr) => {
        const n_arr = arr.filter(itm => {
            if (itm && itm !== null && itm !== undefined) {
                return true
            }
        })
        if (n_arr.length === arr.length) {
            return true;//valid all field
        } else {
            return false;//invalid some field
        }
    },//validateField

    validateObject: (input) => {//{key:value}

        const n_arr = Object.entries(input).filter((value) => {
            if (value[1] && value[1] !== null && value[1] !== undefined && value[1] !== "") {//they are valid so ignore them
                return false
            }
            return true
        })
        //[["name", null], ["email", "milon@g.com"]]
        //[["name", null]]-> key:value[0]
        return n_arr
    },//validateObject

    Toast: (msg) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else if ((Platform.OS === 'ios')) {
            AlertIOS.alert(msg);
        } else {
            alert(msg)
        }
    },//Toast
    onChange: ({ name, value, setInput, setError }) => {
        setInput((input) => ({ ...input, [name]: value }))
        //check error & remove error
        if (value !== "") {
            setError((pre) => ({ ...pre, [name]: "" }))
        } else {
            setError((pre) => ({ ...pre, [name]: "This field is required" }))
        }
    },
    ramdomColor: () => {
        const colors = ["#CD5C5C", "#FFA07A", "#40E0D0", Theme.COLOR_TEST, "#ffcc33", "#9FE2BF", "#6495ED", "#808000", "#9f8b80", Theme.COLOR_PRIMARY, "#2baabf"]
        const max = colors.length
        const random = Math.round(Math.random() * max)
        return colors[random]
    },
    getUser: async () => {
        const u = JSON.parse(await AsyncStorage.getItem(Define.C_USER))
        return u
    },
    getUserID: async () => {
        const u = JSON.parse(await AsyncStorage.getItem(Define.C_USER))
        //console.log(u?._id)
        return u?._id
    },
    getUserEmail: async () => {
        const u = await AsyncStorage.getItem(Define.AUTH_EMAIL)
        return u
    },
    getPass: async () => {
        const u = await AsyncStorage.getItem(Define.AUTH_PASS)
        return u
    },
    encryptPass: async (pass) => {
        const plainPassAsKey = await AsyncStorage.getItem(Define.AUTH_PASS)
        const hash = CryptoES.SHA256(plainPassAsKey).toString();
        const encrypted = CryptoES.AES.encrypt(pass, hash);
        return encrypted.toString();
        // const decrypted = CryptoES.AES.decrypt(encrypted.toString(), key256Bits.toString());
        // return decrypted.toString(CryptoES.enc.Utf8)
    },
    decryptPass: async (encrypted_str) => {
        const plainPassAsKey = await AsyncStorage.getItem(Define.AUTH_PASS)
        const hash = CryptoES.SHA256(plainPassAsKey).toString();

        const decrypted = CryptoES.AES.decrypt(encrypted_str, hash);
        return decrypted.toString(CryptoES.enc.Utf8)
    }
}

export default Helper