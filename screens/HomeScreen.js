import * as React from 'react';
import { ButtonGroup, ListItem, withTheme } from 'react-native-elements'
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import model from '../Model';

export default function HomeScreen({ navigation, allData, bool, needsRenderAgain }) {
    const [text, setText] = useState('');
    const queryBy = ['author', 'tag', 'title'];
    const [queryIndex, setQueryIndex] = useState(0);
    const [results, setResults] = useState([]);
    const prefix = '@author/'
    async function getUserAsync(query) {
        let response = await fetch(query);
        let data = await response.json()
        return data;
    }
    const getQuery = () => {
        return 'https://goodquotesapi.herokuapp.com/' + queryBy[queryIndex] + '/' + text.split(' ').join('+')
    }

    const onTodoAdd = async (authorName, quote) => {
        // is the quote belong to a favorite author?
        const authors = allData.filter((obj) => obj.id.includes(authorName));
        console.log('authorName', authorName)
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
            console.log('quote author is new');
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
    };

    return (<ScrollView style={styles.container}>

        <ButtonGroup
            containerStyle={styles.buttonContainer}
            onPress={(i) => {
                setText('')
                setQueryIndex(i)
                setResults([])
            }}
            selectedIndex={queryIndex}
            buttons={queryBy}
        />
        <TextInput
            style={styles.input}
            placeholder={"Find quotes by " + queryBy[queryIndex]}
            onChangeText={text => setText(text)}
            defaultValue={text}
            autoFocus={true}
            onSubmitEditing={() => getUserAsync(getQuery(text))
                .then(data => setResults(data))}
        />
        {results.hasOwnProperty('quotes') && results.quotes.map((item, i) => {
            let authorName = item.author.trim();
            if (authorName.endsWith(',')) authorName = authorName.substr(0, authorName.length - 1);
            return (
                <ListItem
                    key={i}
                    title={item.quote}
                    rightIcon={<AntDesign
                        onPress={(() => {
                            console.log('favorite this quote', item.quote, 'by', authorName)
                            onTodoAdd(authorName, item.quote);
                        })}
                        name="hearto" size={24} color="black" />}
                    subtitle={
                        queryIndex === 0 ? null : <Text
                            style={styles.bold}
                            onPress={() => navigation.navigate(
                                'MyModal', { name: authorName })
                            }>{authorName}</Text>
                    }
                    bottomDivider
                />
            )
        })
        }</ScrollView>
    );
}

HomeScreen.navigationOptions = {
    title: 'Search quotes',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="search1" />,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        padding: 10,
    },
    bold: {
        fontWeight: '400',
        color: 'blue'
    },
    buttonContainer: {
        height: 30,
        borderRadius: 10,
    },
    item: {
        padding: 4,
        marginVertical: 4,
        marginHorizontal: 4,
    },
    title: {
        fontSize: 16,
    },
});
