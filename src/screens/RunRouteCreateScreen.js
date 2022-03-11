import React from 'react';
import {StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Map from '../components/Map';

const RunRouteCreateScreen = ({navigation}) => {
    return (
        <SafeAreaView >
            <Map />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default RunRouteCreateScreen;