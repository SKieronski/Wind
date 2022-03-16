import {GOOGLE_MAPS_API_KEY} from '@env'
import React, {useContext, useEffect} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Context as RunRouteContext} from '../context/RunRouteContext';

const {height, width} = Dimensions.get('window');

const Map = ({startPos, endPos}) => {
    const {state} = useContext(RunRouteContext)
    
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{height: height, width: width}}
            initialRegion={{
                ...startPos,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
            }}
        >
            {endPos ? 
                <>
                    <Marker title='end' coordinate={endPos} identifier="markerE" /> 
                    <Marker
                        title='start'
                        coordinate={startPos}
                        identifier={'markerS'}
                    />
                </>
                : null}
            <Circle
                center={state.currentPos.coords}
                radius={30}
                strokeColor="rgba(158,158,255,1.0)"
                fillColor="rgba(158,158,255,0.4)"
            />
            {endPos ? <MapViewDirections
                origin={startPos}
                destination={endPos}
                apikey={GOOGLE_MAPS_API_KEY}
                mode="WALKING"
                strokeWidth={3}
                strokeColor="rgba(0,0,255,1)"
            /> : null }
        </MapView>
    )
}

const styles = StyleSheet.create({
    
})

export default Map;