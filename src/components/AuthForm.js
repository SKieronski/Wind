import React, {useState} from "react";
import {StyleSheet} from 'react-native'
import {Text, Button, Input} from 'react-native-elements'
import Spacer from "./Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
                <Input 
                    label="Email"
                    value={email}
                    onChangeText={(newEmail) => {
                        setEmail(newEmail);
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            <Spacer />
                <Input 
                    label="Password"
                    value={password}
                    onChangeText={setPassword} //this is a shorthand version of the above onChangeText
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true} //password entry is hidden through changing chars to stars
                />
                {errorMessage ? <Text style={styles.errorStyle}>{errorMessage}</Text> : null}
            <Spacer>
                <Button
                    title={submitButtonText}
                    onPress={() => {
                        onSubmit({email, password})
                    }}
                />
            </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
    errorStyle: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15
    },
})

export default AuthForm