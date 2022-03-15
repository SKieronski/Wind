import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Context as ApiContext} from '../context/apiContext'
import Map from '../components/Map';

const RunRoutesDetailsScreen = ({navigation, route}) => {
    const {state} = useContext(ApiContext)
    const myID = route.params._id
    const myRoute = state.find((route) => route._id === myID) 
    console.log(myRoute)
    return (
        <>
            <Map startPos={myRoute.startPos} endPos={myRoute.endPos}/>
        </>
    )
}

const styles = StyleSheet.create({

})

export default RunRoutesDetailsScreen;