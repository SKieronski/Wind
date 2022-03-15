import React, { useContext } from 'react'
import {Modal, StyleSheet, Pressable, View} from 'react-native'
import { Text } from 'react-native-elements'
import { Context as RunRouteContext } from '../context/RunRouteContext'
import CreateRouteForm from './CreateRouteForm'

const MyModal = () => {
    const {state, changeModalVisible} = useContext(RunRouteContext)
    return(
        <View style={styles.container}>
            <Modal 
                animationType="fade"
                transparent={true}
                visible={state.modalVisible}
                onRequestClose={()=>{
                    changeModalVisible(!state.modalVisible)
                }}
            >
                <View style={styles.modalView}>
                    <CreateRouteForm />
                    <Pressable
                        onPress={()=> {
                            changeModalVisible(!state.modalVisible)
                        }}
                    >
                        <Text style={{color: 'blue'}}>Hide</Text>
                    </Pressable>
                </View>
                
            </Modal> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position:'absolute'
    },
    modalView: {
        margin: 20,
        marginTop: 150,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
})

export default MyModal;