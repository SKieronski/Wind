import {GOOGLE_MAPS_API_KEY} from '@env'
import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Context as RunRouteContext} from '../context/RunRouteContext';

const {height, width} = Dimensions.get('window');
const BEARING = 0;
const DISTANCE = 0.8; //meters
const eRADIUS = 6371; //Earth's Radius in meters

const Map = () => {
    const {state, markEnd} = useContext(RunRouteContext)
    console.log(state);

    useEffect(() => {
        const findDestination = (bearing, distance, startLat, startLng) => {
            const toRadsLat = startLat * Math.PI/180;
            const toRadsLng = startLng * Math.PI/180;
            const eRadius = 6371e3; //earth's radius in meters
    
            let destLat = Math.asin((Math.sin(toRadsLat) * Math.cos(distance/eRadius)) 
                + (Math.cos(toRadsLat) * Math.sin(distance/eRadius) * Math.cos(bearing)));
    
            let destLng = toRadsLng + Math.atan2(Math.sin(bearing)*Math.sin(distance/eRadius)*Math.cos(toRadsLat) , 
            Math.cos(distance/eRadius) - Math.sin(toRadsLat) * Math.sin(destLat));
    
            destLat = destLat * 180/Math.PI;
            destLng = destLng * 180/Math.PI;
    
            markEnd({
                latitude: destLat,
                longitude: destLng
            })
        }

        findDestination(0, 800, state.startPos.latitude, state.startPos.longitude);
    }, []);
    
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{height: height, width: width}}
            initialRegion={{
                ...state.startPos,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            <Marker
                coordinate={state.startPos}
            />
            <Marker 
                coordinate={state.endPos}
            />
            <MapViewDirections
                origin={state.startPos}
                destination={state.endPos}
                apikey={GOOGLE_MAPS_API_KEY}
                mode="WALKING"
                strokeWidth={3}
                strokeColor="rgba(0,0,255,1)"
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    
})

export default Map;