import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

function ModalScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
        </View>
    );
}

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();


function MainStackScreen() {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name="Home" component={HomeScreen} />
        </MainStack.Navigator>
    );
}

export default function App(props) {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
                <NavigationContainer linking={LinkingConfiguration}>
                    <RootStack.Navigator mode="modal" headerMode="none">
                        <RootStack.Screen name="Main" component={MainStackScreen} />
                        <RootStack.Screen name="MyModal" component={ModalScreen} />
                    </RootStack.Navigator>
                    {/* <Stack.Navigator>
                        <Stack.Screen name="Root" component={BottomTabNavigator} />
                    </Stack.Navigator> */}
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
