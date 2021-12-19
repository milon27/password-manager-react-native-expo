import React, { Fragment, useState } from 'react'
import { View, StyleSheet, TextInput, Text, Keyboard } from 'react-native'
import DefineIcon from '../icon/DefineIcon';
import Theme from './../../../utils/helpers/Theme';
import Icon from './../icon/Icon';

/**
 *
 * @param {{ref,type,returnKeyType,returnKeyLabel,label,icon,error,style,nextRef}} props
 */
function RnInput({
    type = "default",
    returnKeyType = "done",
    returnKeyLabel = "done",
    label,
    icon,
    error,
    style,
    nextRef,
    onDone = null,
    hideLevel = false,
    ...pros }, ref) {

    const [secure, setSecure] = useState(true)
    const [focused, setFocused] = useState(false)

    const getBorder = () => {

        if (error) {
            return Theme.COLOR_DANGER
        }
        if (focused) {
            return Theme.COLOR_PRIMARY
        }
        else {
            return Theme.COLOR_GRAY
        }
    }

    return (
        <View style={[styles.container, style]}>
            {hideLevel === true ? <></> : <Text style={styles.label}>{label}</Text>}


            <View style={[styles.inputContainer, { borderColor: getBorder() }]}>
                <View style={styles.icon}>{icon}</View>
                <View style={styles.input}>
                    <TextInput
                        ref={ref}
                        style={styles.inputBox}
                        selectionColor={Theme.COLOR_PRIMARY}
                        keyboardType={type === "password" ? "default" : type}
                        secureTextEntry={type === "password" ? secure : false}
                        placeholder={label}
                        placeholderTextColor={Theme.COLOR_GRAY}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        returnKeyType={returnKeyType}
                        returnKeyLabel={returnKeyLabel}
                        blurOnSubmit={false}
                        onSubmitEditing={() => {
                            if (nextRef) {
                                nextRef?.current?.focus()
                            }
                            else if (onDone) {
                                Keyboard.dismiss()
                                onDone()
                            }
                            else {
                                Keyboard.dismiss()
                            }
                        }}
                        {...pros}
                    />
                    {type === "password" ? <Icon type={DefineIcon.Feather} name={secure === true ? "eye" : "eye-off"} onPress={() => { setSecure(s => !s) }} style={styles.secureBtn}></Icon> : <View></View>}
                </View>
            </View>
            {error ? <Text style={{ color: Theme.COLOR_DANGER }}> {error}</Text> : <Fragment />}

        </View >
    )
}

const Input = React.forwardRef(RnInput)

export default Input

const styles = StyleSheet.create({
    container: {
        marginVertical: 2
    },
    icon: {
        color: Theme.COLOR_PRIMARY,
        paddingHorizontal: 1,
        paddingRight: 5
    },
    showBtn: {
        color: Theme.COLOR_PRIMARY,
        fontSize: 12
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 45
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    inputBox: {
        color: Theme.COLOR_BLACK,
        flex: 1,
    },
    label: {
        color: Theme.COLOR_GRAY, marginVertical: 5
    }
})