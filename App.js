import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useEffect, useState } from 'react'
import { StyleSheet, ToastAndroid, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthorDetail from './components/AuthorDetail'
import model from './Model';

const Stack = createStackNavigator();
const showToast = (str) => {
    ToastAndroid.show(str, ToastAndroid.SHORT);
};

function ModalScreen({ navigation, route, allData, bool, needsRenderAgain, showToast }) {
    return (
        <AuthorDetail allData={allData || []} _name={route.params ? route.params.name : ''} />
    );
}

export default function App() {
    const [allData, setData] = useState([]);
    const [bool, needsRenderAgain] = useState(false);
    const prefix = '@author/'

    useEffect(() => {
        async function fetchData() {
            await model.readTodoList(prefix).then((list) => {
                const sortedList = list.sort((a, b) => {
                    return a.created < b.created;
                });
                setData(sortedList);
                console.log('data is', sortedList)
            });
        }
        fetchData();
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
                            {props => <BottomTabNavigator {...props} allData={allData} bool={bool} needsRenderAgain={needsRenderAgain} showToast={showToast} />}
                        </Stack.Screen>
                        <Stack.Screen name="MyModal">
                            {props => <ModalScreen {...props} bool={bool} needsRenderAgain={needsRenderAgain} allData={allData} showToast={showToast} />}
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
