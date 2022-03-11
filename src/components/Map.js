import React, {useContext} from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
    const initialLocation = {
        longitude: -122.0312186,
        latitude: 37.33233141,
    }
    return (
        <MapView
            style={styles.map}
            initialRegion={{
                ...initialLocation,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 300,
    }
})

export default Map;