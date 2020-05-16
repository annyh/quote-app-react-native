import * as React from 'react';
import { ButtonGroup, ListItem, withTheme } from 'react-native-elements'
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import model from '../Model';

export default function HomeScreen({ navigation }) {
    const [text, setText] = useState('');
    const queryBy = ['author', 'tag', 'title'];
    const [queryIndex, setQueryIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [allData, setData] = useState([]);
    const prefix = '@author/'
    async function getUserAsync(query) {
        let response = await fetch(query);
        let data = await response.json()
        return data;
    }
    useEffect(() => {
        model.readTodoList(prefix).then((list) => {
            const sortedList = list.sort((a, b) => {
                return a.created < b.created;
            });
            setData(sortedList);
            console.log('data is', sortedList)
        });
    }, [])
    const getQuery = () => {
        return 'https://goodquotesapi.herokuapp.com/' + queryBy[queryIndex] + '/' + text.split(' ').join('+')
    }

    const onTodoAdd = async (authorName, quote) => {
        // is the quote belong to a favorite author?
        const authors = allData.filter((obj) => obj.id.includes(authorName));
        if (authors.length) {
            console.log('quote belongs to existing author');
            const todoItem = authors[0];
            authors[0].quotes = [...authors[0].quotes, quote]
            todoItem.updated = Date.now();
            // change results
            console.log('adding', todoItem)
            model.createTodo(todoItem);
        } else {
            console.log('quote author is new');
            const todoItem = {
                id: prefix + authorName,
                quotes: [quote],
                created: Date.now(),
            }
            // change results
            console.log('adding', todoItem)
            model.createTodo(todoItem);            
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
    header: null,
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
