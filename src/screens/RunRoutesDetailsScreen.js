import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {Context as ApiContext} from '../context/apiContext'
import Map from '../components/Map';

const RunRoutesDetailsScreen = ({navigation, route}) => {
    const {state} = useContext(ApiContext)
    const myID = route.params._id
    const myRoute = state.find((route) => route._id === myID)

    useEffect(()=> {
        navigation.setOptions({title: `${myRoute.title}, ${myRoute.distance} meter distance`})
    }, [myID])
    
    return (
        <SafeAreaView style={styles.container}>
            <>
                <Map startPos={myRoute.startPos} endPos={myRoute.endPos}/>
            </>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default RunRoutesDetailsScreen;