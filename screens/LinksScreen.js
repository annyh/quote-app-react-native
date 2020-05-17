import { AntDesign } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import * as React from 'react';
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import model from '../Model';
import { getTitleFromId } from '../utils';

export default function LinksScreen({ navigation, allData, bool, needsRenderAgain, showToast }) {
    const prefix = '@author/';
    const onDelete = async (authorName, quote, id) => {
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
                await model.deleteArchivedTodoList(id);
            }
            needsRenderAgain(!bool);
            showToast('Removed quote', quote.substr(0, 50) + ' ...');
        } else {
            showToast('Surprise, cannot find author', authorName);
        }
    };
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {allData && allData.map((item, i) => {
                const authorName = getTitleFromId(item.id, prefix);
                return item.quotes.map((quote) => (
                    <ListItem
                        key={i}
                        title={quote}
                        rightIcon={<AntDesign
                            onPress={(() => {
                                console.log('remove this quote', quote, 'by', authorName)
                                onDelete(authorName, quote, item.id);
                            })}
                            name="heart"
                            size={24}
                            color="black" />}
                            subtitle={<Text
                                    style={styles.bold}
                                    onPress={() => navigation.navigate(
                                        'MyModal', { name: authorName })
                                    }>{authorName}</Text>
                            }
                        bottomDivider
                    />
                ))
            })
            }</ScrollView>
    );
}

LinksScreen.navigationOptions = {
    title: 'Favorites',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="heart" />,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    contentContainer: {
        paddingTop: 15,
    },
    bold: {
        fontWeight: '400',
        color: 'blue'
    },    
});
