import {GOOGLE_MAPS_API_KEY} from '@env'
import React, {useContext} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const {height, width} = Dimensions.get('window');

const Map = () => {
    const initialLocation = {
        longitude: -122.0312186,
        latitude: 37.33233141,
    };
    const destination = {
        longitude: -122.0282186,
        latitude: 37.32733141,
    }
    
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{height: height, width: width}}
            initialRegion={{
                ...initialLocation,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            <Marker
                coordinate={initialLocation}
            />
            <Marker 
                coordinate={destination}
            />
            <MapViewDirections
                origin={initialLocation}
                destination={destination}
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