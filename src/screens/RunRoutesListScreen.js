import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
const RunRoutesListScreen = ({navigation}) => {
    return (
        <View >
            <Text>RunRoutesListScreen</Text>
            <Button title="GOTO Details" onPress={() => navigation.navigate('RunRoutesDetails')} />
            <Button title="GOTO Create" onPress={() => navigation.navigate('RunRouteCreate')} />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default RunRoutesListScreen;