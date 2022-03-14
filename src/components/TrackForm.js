import React, {useContext, useState} from "react";
import {StyleSheet} from 'react-native'
import {Text, Button, Input} from 'react-native-elements'
import Spacer from "./Spacer";
import {Context as RunRouteContext} from '../context/RunRouteContext'

const TrackForm = () => {
    const {changeBearing, changeDistance} = useContext(RunRouteContext);
    const [distance, setDistance] = useState(null);
    const [bearing, setBearing] = useState(null);

    return (
        <>
            <Spacer>
                <Text h3>Create a Route</Text>
            </Spacer>
                <Input 
                    label="Distance"
                    placeholder="Meters"
                    value={distance}
                    onChangeText={(newDistance) => {
                        setDistance(newDistance);
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            <Spacer />
                <Input 
                    label="Bearing"
                    placeholder="Direction EX: N or North"
                    value={bearing}
                    onChangeText={(newBearing) => {
                        setBearing(newBearing);
                    }} 
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            <Spacer>
                <Button
                    title="Submit"
                    onPress={() => {
                        changeDistance(distance);
                        changeBearing(bearing);
                    }}
                />
            </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
})

export default TrackForm