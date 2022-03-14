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
    const {markCurrentPos, markStart, state, changeLoading} = useContext(RunRouteContext) 
    const [err, setErr] = useState(null);

    useEffect(() => {
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

    return (
        <SafeAreaView style={styles.container}>
            {state.loading ? 
                <Feather name="loader" size={60} color="black" style={styles.icon} /> :
                <>
                    <Map />
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
        marginTop: 350,
    }
})

export default RunRouteCreateScreen;