import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, Text} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Map from '../components/Map';
import { Accuracy, 
    requestForegroundPermissionsAsync, 
    watchPositionAsync,
    getCurrentPositionAsync 
} from 'expo-location';
import { Context as RunRouteContext } from '../context/RunRouteContext';
import { Feather } from '@expo/vector-icons'; 
import MyModal from '../components/MyModal';

const RunRouteCreateScreen = ({navigation}) => {
    //User Location setup
    const {markCurrentPos, markStart, state, changeLoading, markEnd} = useContext(RunRouteContext) 
    const [err, setErr] = useState(null);
    
    useEffect(() => {
        changeLoading(true)
        let subscriber = null;
        const startWatching = async () => {
            try {
                await requestForegroundPermissionsAsync();
                let cLocation = await getCurrentPositionAsync();
                markStart({latitude: cLocation.coords.latitude, longitude: cLocation.coords.longitude});
    
                subscriber = await watchPositionAsync(
                    {
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 10
                    },
                    location => {
                        //Object with coords property that has latitude and longitude keys
                        //{coords: {latitude: float, longitude: float}}
                        markCurrentPos(location)
                        changeLoading(false);
                    }
                )
            } catch (e) {
                setErr(e);
            }
        }
        startWatching();

        return () => {
            if(subscriber) {
                subscriber.remove()
            }
        }
    }, [])

    useEffect(() => {
        const findDestination = (bearing, distance, startLat, startLng) => {
            const toRadsLat = startLat * Math.PI/180;
            const toRadsLng = startLng * Math.PI/180;
            const eRadius = 6371e3; //earth's radius in meters
            const bearingToRads = bearing * Math.PI / 180;

            let destLat = Math.asin((Math.sin(toRadsLat) * Math.cos(distance/eRadius)) 
                + (Math.cos(toRadsLat) * Math.sin(distance/eRadius) * Math.cos(bearingToRads)));
    
            let destLng = toRadsLng + Math.atan2(Math.sin(bearingToRads)*Math.sin(distance/eRadius)*Math.cos(toRadsLat) , 
            Math.cos(distance/eRadius) - Math.sin(toRadsLat) * Math.sin(destLat));
    
            destLat = destLat * 180/Math.PI;
            destLng = destLng * 180/Math.PI;
    
            markEnd({
                latitude: destLat,
                longitude: destLng
            })
        }
        if(state.bearing && state.distance) {
            findDestination(state.bearing, state.distance, state.startPos.latitude, state.startPos.longitude);
        }
    }, [state.distance, state.bearing]);

    return (
        <SafeAreaView style={styles.container}>
            {state.loading ? 
                <Feather name="loader" size={60} color="black" style={styles.icon} /> :
                <>
                    <Map startPos={state.startPos} endPos={state.endPos}/>
                    <MyModal />
                </>
            }
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
        backgroundColor: 'white',
        top: 500,
        color: 'red'
    },
    icon: {
        alignSelf: 'center',
        marginTop: 275,
    }
})

export default RunRouteCreateScreen;