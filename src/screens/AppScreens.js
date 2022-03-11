import React, {useContext} from 'react'
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
        <Tab.Screen name="RunRoutesList" component={RunRoutesListScreen} />
        <Tab.Screen name="RunRoutesDetails" component = {RunRoutesDetailsScreen} />
        <Tab.Screen name="RunRouteCreate" component = {RunRouteCreateScreen} />
      </Tab.Navigator>
    )
}

const AppScreens = () => {
    const {state: {token}} = useContext(AuthContext)
    return (
        <Stack.Navigator>
            {token === null ? (
                <>
                    <Stack.Screen name="Signup" component={SignUpScreen} />
                    <Stack.Screen name="Signin" component={SignInScreen} />
                </>
            ) : (
                <Stack.Screen name="LoggedIn" component={MyTabs} />
            )}
        </Stack.Navigator>
    )
}

export default AppScreens;