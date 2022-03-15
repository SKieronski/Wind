import React, {useContext, useState} from "react";
import {StyleSheet} from 'react-native'
import {Text, Button, Input} from 'react-native-elements'
import Spacer from "./Spacer";
import {Context as RunRouteContext} from '../context/RunRouteContext'
import useConvertDirection from "../hooks/useConvertDirection";

const CreateRouteForm = () => {
    const {changeBearing, changeDistance, changeModalVisible, changeTitle} = useContext(RunRouteContext);
    const [distance, setDistance] = useState(null);
    const [bearing, setBearing] = useState(null);
    const [title, setTitle] = useState(null);
    
    return (
        <>
            <Spacer>
                <Text h3>Create a Route</Text>
            </Spacer>
                <Input 
                    label="Title"
                    placeholder="My Route Name"
                    value={title}
                    onChangeText={(newTitle) => {
                        setTitle(newTitle);
                    }}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            <Spacer />
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
                    placeholder="N or North"
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
                        let newB = useConvertDirection(bearing);
                        changeDistance(distance);
                        changeBearing(newB);
                        changeTitle(title);
                        changeModalVisible(false);
                    }}
                />
            </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
})

export default CreateRouteForm