import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthorDetail from './components/AuthorDetail'
import model from './Model';

const Stack = createStackNavigator();

function ModalScreen({ navigation, route, allData }) {
    return (
        <AuthorDetail allData={allData || []} _name={route.params ? route.params.name : ''} />
    );
}

export default function App() {
    const [allData, setData] = useState([]);
    const [bool, needsRenderAgain] = useState(false);
    const prefix = '@author/'

    useEffect(() => {
        model.readTodoList(prefix).then((list) => {
            const sortedList = list.sort((a, b) => {
                return a.created < b.created;
            });
            setData(sortedList);
            console.log('data is', sortedList)
        });
    }, [bool])
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Tabs">
                            {props => <BottomTabNavigator {...props} allData={allData} bool={bool} needsRenderAgain={needsRenderAgain} />}
                        </Stack.Screen>
                        <Stack.Screen name="MyModal">
                            {props => <ModalScreen {...props} allData={allData} />}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
