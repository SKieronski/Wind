import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';
import NavLink from '../components/NavLink';

const SignUpScreen = ({navigation}) => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);

    useEffect(() => {
        const onFocus = navigation.addListener('focus', clearErrorMessage);

        return onFocus
    }, [navigation]);

    return (
        <View >
            {/* <Button title="GOTO Signin" onPress={() => navigation.navigate('Signin')} /> */}
            <AuthForm
                headerText = "Sign Up for Wind"
                errorMessage={state.errorMessage}
                submitButtonText="Sign Up"
                onSubmit={({email, password}) => signup({email,password})}
            />
            <NavLink 
                navigation={navigation}
                routeName="Signin"
                text="Already have an account? Sign in instead."
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        marginBottom: 100
    },
})

export default SignUpScreen;