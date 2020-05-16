import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthorDetail from './components/AuthorDetail'

const Stack = createStackNavigator();

function ModalScreen({ navigation, route }) {
    return (
        <AuthorDetail _name={route.params ? route.params.name : '' }/>
    );
}

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Tabs" component={BottomTabNavigator} />
                        <Stack.Screen name="MyModal" component={ModalScreen} />
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
