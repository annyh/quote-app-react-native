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

function ModalScreen({ navigation, route, allData, bool, needsRenderAgain, showToast, onAdd }) {
    return (
        <AuthorDetail allData={allData || []} _name={route.params ? route.params.name : ''} onAdd={onAdd} />
    );
}

export default function App() {
    const [allData, setData] = useState([]);
    const [bool, needsRenderAgain] = useState(false);
    const prefix = '@author/';

    const onAdd = async (authorName, quote) => {
        // is the quote belong to a favorite author?
        const authors = allData.filter((obj) => obj.id.includes(authorName));
        if (authors.length) {
            // add new quote to existing author
            if (!authors[0].quotes.includes(quote)) {
                const todoItem = authors[0];
                authors[0].quotes = [...authors[0].quotes, quote]
                todoItem.updated = Date.now();
                // change results
                console.log('adding', todoItem)
                await model.createTodo(todoItem);
                needsRenderAgain(!bool);
            }
        } else {
            // quote author is new
            const todoItem = {
                id: prefix + authorName,
                quotes: [quote],
                created: Date.now(),
            }
            // change results
            console.log('adding', todoItem)
            await model.createTodo(todoItem);
            needsRenderAgain(!bool);
        }

        showToast('Favorited quote: ' + quote.substr(0, 50) + ' ...');
    };
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
                            {props => <BottomTabNavigator {...props} allData={allData} bool={bool} needsRenderAgain={needsRenderAgain} showToast={showToast} onAdd={onAdd} />}
                        </Stack.Screen>
                        <Stack.Screen name="MyModal">
                            {props => <ModalScreen {...props} bool={bool} needsRenderAgain={needsRenderAgain} allData={allData} showToast={showToast} onAdd={onAdd} />}
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
