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

function ModalScreen({ route, allData, onAdd, deleteData, onDelete }) {
    return (
        <AuthorDetail
            allData={allData || []}
            _name={route.params ? route.params.name : ''}
            onAdd={onAdd} deleteData={deleteData}
            onDelete={onDelete} />
    );
}

export default function App() {
    const [allData, setData] = useState([]);
    const [bool, needsRenderAgain] = useState(false);
    const prefix = '@author/';

    // id is optional. if id provided delete the author
    // else delete all data in this app
    const deleteData = async (authorName) => {
        const toDelete = authorName ? prefix + authorName : prefix;
        console.log('deleting', toDelete)
        await model.deleteArchivedTodoList(toDelete);
        needsRenderAgain(!bool);
        const suffix = authorName ? 'author ' + authorName : 'all data';
        showToast('Removed ' + suffix);
    }

    const onDelete = async (authorName, quote) => {
        // quote should belong to an author
        const authors = allData.filter((obj) => obj.id.includes(authorName));
        if (authors.length) {
            // if there are remaining quotes, remove quote from existing author
            // else if this is the only quote by the author, remove the author
            const todoItem = authors[0];
            todoItem.quotes = todoItem.quotes.filter((str) => str !== quote);
            if (todoItem.quotes.length) {
                todoItem.updated = Date.now();
                // change results
                console.log('setting', todoItem)
                await model.createTodo(todoItem);
            } else {
                // remove author
                await model.deleteArchivedTodoList(prefix + authorName);
            }
            needsRenderAgain(!bool);
            showToast('Removed quote', quote.substr(0, 50) + ' ...');
        } else {
            showToast('Surprise, cannot find author', authorName);
        }
    };

    // {String} authorName does not contain prefix
    // {String} quote
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
                quotes: quote ? [quote] : [],
                created: Date.now(),
            }
            // change results
            console.log('adding', todoItem)
            await model.createTodo(todoItem);
            needsRenderAgain(!bool);
        }
        let message = '';
        if (quote) {
            message = 'Favorited quote: ' + quote.substr(0, 50) + ' ...';
        } else {
            message = 'Favorited author: ' + authorName;
        }
        showToast(message);
    };

    useEffect(() => {
        async function fetchData() {
            await model.readTodoList(prefix).then((list) => {
                const sortedList = list.sort((a, b) => {
                    return a.created < b.created;
                });
                setData(sortedList);
                // console.log('data is', sortedList)
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
                    <Stack.Navigator headerMode='float'>
                        <Stack.Screen name="Quotes app">
                            {props => <BottomTabNavigator {...props} allData={allData} deleteData={deleteData} onAdd={onAdd} onDelete={onDelete} />}
                        </Stack.Screen>
                        <Stack.Screen name="Author Detail">
                            {props => <ModalScreen {...props} allData={allData} onAdd={onAdd} deleteData={deleteData} onDelete={onDelete} />}
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
