import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext'

const RunRoutesListScreen = ({navigation}) => {
    const {signout} = useContext(AuthContext)
    return (
        <View >
            <Text>RunRoutesListScreen</Text>
            <Button title="GOTO Details" onPress={() => navigation.navigate('RunRoutesDetails')} />
            <Button title="GOTO Create" onPress={() => navigation.navigate('RunRouteCreate')} />
            <Button title="Logout" onPress={() => signout()} />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default RunRoutesListScreen;