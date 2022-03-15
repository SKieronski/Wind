import React, {useContext, useState} from "react";
import {StyleSheet} from 'react-native'
import {Text, Button, Input} from 'react-native-elements'
import Spacer from "./Spacer";
import {Context as RunRouteContext} from '../context/RunRouteContext'
import {Context as ApiContext} from '../context/apiContext'

const SaveRouteForm = () => {
    const {state, changeModalVisible} = useContext(RunRouteContext);
    const [title, setTitle] = useState(null);
    const {createRoute} = useContext(ApiContext);

    return (
        <>
            <Spacer>
                <Text h3>Save this Route?</Text>
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
            <Spacer>
                <Button
                    title="Submit"
                    onPress={() => {
                        createRoute({
                            title: title, 
                            distance: state.distance,
                            startPos: state.startPos,
                            endPos: state.endPos
                        })
                        changeModalVisible(false);
                    }}
                />
            </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
})

export default SaveRouteForm