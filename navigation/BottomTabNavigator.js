import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import AuthorScreen from '../screens/AuthorScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route, allData, bool, needsRenderAgain }) {
    // Set the header title on the parent stack navigator depending on the
    // currently active tab. Learn more in the documentation:
    // https://reactnavigation.org/docs/en/screen-options-resolution.html
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return (
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
                name="Home">
                {props => <HomeScreen {...props} allData={allData} bool={bool} needsRenderAgain={needsRenderAgain} />}
            </BottomTab.Screen>
            <BottomTab.Screen
                name="Links">
                {props => <LinksScreen {...props} allData={allData} />}
                    </BottomTab.Screen>
            <BottomTab.Screen
                name="Authors">
                {props => <AuthorScreen {...props} allData={allData} />}
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
