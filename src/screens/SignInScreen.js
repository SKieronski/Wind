import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import NavLink from '../components/NavLink';
import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';

const SignInScreen = ({navigation}) => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);
    
    useEffect(() => {
        const onFocus = navigation.addListener('focus', clearErrorMessage);

        return onFocus
    }, [navigation])

    return (
        <View >
            <AuthForm
                headerText = "Sign In to Wind"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={({email, password}) => signin({email,password})}
            />
            <NavLink 
                navigation={navigation}
                routeName="Signup"
                text="Need to sign up? Click here."
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

export default SignInScreen;