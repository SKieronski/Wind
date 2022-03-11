import React, {useContext} from 'react';
import { StyleSheet } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDD-zJvuFYllxvpWbNVZa5urbVW-y0WDx4'

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
            style={styles.map}
            initialRegion={{
                ...initialLocation,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            <MapViewDirections
                origin={initialLocation}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                mode="WALKING"
            />
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 300,
    }
})

export default Map;