import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import AuthorScreen from '../screens/AuthorScreen';
import { AntDesign } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route, allData, onAdd, onDelete, deleteData }) {
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
                name="Search Quotes"
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon name="search1" focused={focused} />
                }}
            >
                {props => <HomeScreen {...props} onAdd={onAdd} allData={allData} onDelete={onDelete} />}
            </BottomTab.Screen>
            <BottomTab.Screen
                name="Favorite Quotes"
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon name="heart"  focused={focused} />
                }}
            >
                {props => <LinksScreen {...props} allData={allData} onDelete={onDelete} />}
            </BottomTab.Screen>
            <BottomTab.Screen
                name="Favorite Authors"
                options={{
                    tabBarIcon: ({ focused }) => <TabBarIcon name="user"  focused={focused} />
                }}
            >
                {props => <AuthorScreen {...props} allData={allData} deleteData={deleteData} />}
            </BottomTab.Screen>
        </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return 'Find quotes by author or tag or book';
        case 'Links':
            return 'Favorite quotes';
        case 'Authors':
            return 'Favorite authors';
    }
}
