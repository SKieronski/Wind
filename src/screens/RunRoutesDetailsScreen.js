import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
const RunRoutesDetailsScreen = ({navigation}) => {
    return (
        <View >
            <Text>RunRoutesDetailsScreen</Text>
            <Button title="GOTO List" onPress={() => navigation.navigate('RunRoutesList')} />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default RunRoutesDetailsScreen;