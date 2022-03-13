import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, Text} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Map from '../components/Map';
import { Accuracy, 
    requestForegroundPermissionsAsync, 
    watchPositionAsync,
    getCurrentPositionAsync } from 'expo-location';
import { Context as RunRouteContext } from '../context/RunRouteContext';

const RunRouteCreateScreen = ({navigation}) => {
    //User Location setup
    const {markCurrentPos, markStart} = useContext(RunRouteContext) 
    const [err, setErr] = useState(null);
    const startWatching = async () => {
        try {
            await requestForegroundPermissionsAsync();
            let cLocation = await getCurrentPositionAsync();
            markStart({latitude: cLocation.coords.latitude, longitude: cLocation.coords.longitude});

            await watchPositionAsync(
                {
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                },
                location => {
                    //Object with coords property that has latitude and longitude keys
                    //{coords: {latitude: float, longitude: float}}
                    markCurrentPos({latitude: location.coords.latitude, longitude: location.coords.longitude})
                }
            )
        } catch (e) {
            setErr(e);
        }
    }

    useEffect(() => {
        startWatching();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Map />
            {/* <Text style={styles.text}>TEXT TEXT TEXT TEXT</Text> */}
            {err ? <Text style={styles.text}>Please enable location services</Text> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    text: {
        zIndex: 2,
        fontSize: 30,
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'white'
    }
})

export default RunRouteCreateScreen;