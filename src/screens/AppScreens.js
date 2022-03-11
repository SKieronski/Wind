import React, {useContext, useEffect} from 'react'
import RunRouteCreateScreen from "./RunRouteCreateScreen"
import RunRoutesDetailsScreen from "./RunRoutesDetailsScreen"
import RunRoutesListScreen from "./RunRoutesListScreen"
import SignInScreen from "./SignInScreen"
import SignUpScreen from "./SignUpScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Context as AuthContext } from '../context/AuthContext'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Make a group of screens that use Tab Navigation to be children of the Stack Navigator
const MyTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="RunRoutesList" component={RunRoutesListScreen} options={{headerShown: false}}/>
        <Tab.Screen name="RunRoutesDetails" component = {RunRoutesDetailsScreen} options={{headerShown: false}}/>
        <Tab.Screen name="RunRouteCreate" component = {RunRouteCreateScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
    )
}

const AppScreens = () => {
    const {state: {token}, tryLocalSignin} = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin();
    }, []);

    return (
        <Stack.Navigator>
            {token === null ? (
                <>
                    <Stack.Screen name="Signup" component={SignUpScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Signin" component={SignInScreen} options={{headerShown: false}}/>
                </>
            ) : (
                <Stack.Screen name="LoggedIn" component={MyTabs} options={{headerShown: false}} />
            )}
        </Stack.Navigator>
    )
}

export default AppScreens;