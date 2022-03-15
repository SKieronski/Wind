import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext'
import {Context as ApiContext} from '../context/apiContext'
import { Feather } from '@expo/vector-icons'; 
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const RunRoutesListScreen = ({navigation}) => {
    const {signout} = useContext(AuthContext)
    const {fetchRoutes, state} = useContext(ApiContext)
    const [loading, setLoading] = useState(true)
    const focused = useIsFocused()

    useEffect(()=> {
        if(focused){
            fetchRoutes()
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [focused])

    return (
        <View >
            {loading ? 
                <Feather name="loader" size={60} color="black" style={styles.icon} /> 
                : <FlatList
                    data={state}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
		                return (
		                    <TouchableOpacity onPress={()=> {
                                    navigation.navigate('RunRoutesDetails', {_id: item._id});
                                }}
                            >
		                    <ListItem>
		                        <ListItem.Content>
		                            <ListItem.Title>{item.title}</ListItem.Title>
		                        </ListItem.Content>
		                        <ListItem.Chevron />
		                    </ListItem>
		                </TouchableOpacity>
		            );
		        }}
		    />
            }
            <Button title="Logout" onPress={() => signout()} />
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