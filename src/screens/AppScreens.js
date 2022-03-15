import React, {useContext, useEffect, useState} from 'react'
import RunRouteCreateScreen from "./RunRouteCreateScreen"
import RunRoutesDetailsScreen from "./RunRoutesDetailsScreen"
import RunRoutesListScreen from "./RunRoutesListScreen"
import SignInScreen from "./SignInScreen"
import SignUpScreen from "./SignUpScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Context as AuthContext } from '../context/AuthContext'
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Context as RunRouteContext } from '../context/RunRouteContext'
import {Context as ApiContext} from '../context/apiContext'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Make a group of screens that use Tab Navigation to be children of the Stack Navigator
const MyTabs = () => {
    const {changeModalVisible, state} = useContext(RunRouteContext)
    const {createRoute, fetchOneRouteAndDelete, state: apiState} = useContext(ApiContext)
    const [starState, setStarState] = useState(false)

    return (
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            switch(route.name) {
                case 'RunRoutesList':
                    return <FontAwesome5 name="list" size={size} color={color} />
                case 'RunRouteCreate':
                    return <FontAwesome5 name="wind" size={size} color={color} />;
                default:
                    return <FontAwesome5 name="wind" size={size} color={color} />;
            }
        },
        tabBarActiveTintColor: 'rgb(158,158,255)',
        tabBarInactiveTintColor: 'gray'
      })}
      >
        <Tab.Screen name="RunRoutesList" component={RunRoutesListScreen} 
            options={{
                tabBarShowLabel: false,
                headerTitle: 'My Routes'
            }}
        />
        <Tab.Screen name="RunRouteCreate" component = {RunRouteCreateScreen} 
            options={{
                tabBarShowLabel: false,
                headerTitle: 'Run!',
                headerRight: () => {
                    return (
                        <>
                            <Pressable onPress={() => {
                                changeModalVisible(true)
                            }}>
                                <Entypo name="plus" size={30} color="rgb(158,158,255)" />
                            </Pressable>
                            <Pressable onPress={async () => {
                                if(!starState) {
                                    createRoute({
                                        title: state.title, 
                                        distance: state.distance,
                                        startPos: state.startPos,
                                        endPos: state.endPos
                                    })
                                    setStarState(!starState)
                                } else {
                                    console.log("YUH")
                                    await fetchOneRouteAndDelete({
                                        title: state.title, 
                                        distance: state.distance,
                                        startPos: state.startPos,
                                        endPos: state.endPos
                                    })
                                    setStarState(!starState)
                                    // delete route
                                }
                            }}>
                                {!starState ? 
                                    <Entypo name="star-outlined" size={30} color="rgb(158,158,255)" />
                                    : <Entypo name="star" size={30} color="rgb(158,158,255)" />
                                }
                            </Pressable>
                        </>
                    )
                },
                headerRightContainerStyle: {
                    flexDirection: 'row',
                    alignItems:'center',
                    justifyContent:'space-evenly',
                }
            }}
        />
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
                <>
                    <Stack.Screen name="LoggedIn" component={MyTabs} options={{headerShown:false}} />
                    <Stack.Screen name="RunRoutesDetails" component = {RunRoutesDetailsScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}

export default AppScreens;