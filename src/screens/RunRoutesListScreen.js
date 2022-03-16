import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Pressable} from 'react-native';
import { ListItem } from 'react-native-elements';
import {Context as ApiContext} from '../context/apiContext'
import { Feather } from '@expo/vector-icons'; 
import { useIsFocused } from '@react-navigation/native';

const RunRoutesListScreen = ({navigation}) => {
    const {fetchRoutes, state, deleteRoute} = useContext(ApiContext)
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const focused = useIsFocused()

    useEffect(()=> {
        if(focused){
            fetchRoutes()
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [focused, refresh])

    return (
        <View >
            {loading ? 
                <Feather name="loader" size={60} color="black" style={styles.icon} /> 
                : <FlatList
                    data={state}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
		                return (
                            <>
                                <TouchableOpacity onPress={()=> {
                                        navigation.navigate('RunRoutesDetails', {_id: item._id});
                                    }}
                                >
                                    <ListItem>
                                        <ListItem.Content>
                                            <ListItem.Title>{item.title}</ListItem.Title>
                                        </ListItem.Content>
                                        <Pressable onPress={async ()=>{
                                            await deleteRoute(item._id)
                                            setRefresh(!refresh)
                                        }}>
                                            <Feather name="delete" size={24} color="red" />
                                        </Pressable>
                                    </ListItem>    
                                </TouchableOpacity>
                                
                            </>
		            );
		        }}
		    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'center',
        marginTop: 275,
    }
})

export default RunRoutesListScreen;