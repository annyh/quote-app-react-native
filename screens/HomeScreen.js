import * as React from 'react';
import { Button, ButtonGroup, ListItem } from 'react-native-elements'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { processResults } from '../utils';
import values from '../data/values.json';

export default function HomeScreen({ navigation, onAdd, allData, onDelete }) {
    const [text, setText] = useState('');
    const queryBy = ['tag', 'author', 'title'];
    const [queryIndex, setQueryIndex] = useState(0);
    const [results, setResults] = useState([]);
    async function getUserAsync(query) {
        let response = await fetch(query);
        let data = await response.json()
        return data;
    }
    const getQuery = () => {
        return 'https://goodquotesapi.herokuapp.com/' + queryBy[queryIndex] + '/' + text.split(' ').join('+')
    }

    const getQuotes = () => {
        getUserAsync(getQuery(text))
            .then(data => setResults(processResults(data, allData)));
    }

    useEffect(() => {
        if (results && results.hasOwnProperty('quotes')) {
            const obj = processResults(results, allData);
            setResults(obj);
        }
    }, [allData]);

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
        <View style={styles.inputContainer}>
            {queryBy[queryIndex] === 'tag' && <Button
                buttonStyle={styles.randomButtonStyle}
                title='Get random tag'
                onPress={() => {
                    const rand = Math.floor(Math.random() * 100);
                    setText(values[rand]);
                }} />}
            <TextInput
                style={styles.input}
                placeholder={"Find quotes by " + queryBy[queryIndex]}
                onChangeText={text => setText(text)}
                defaultValue={text}
                autoFocus={true}
                onSubmitEditing={() => getQuotes()}
            />
            <Button
                containerStyle={styles.container}
                buttonStyle={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
                icon={
                    <AntDesign
                        name="search1"
                        size={24}
                        color="white"
                    />
                }
                onPress={() => getQuotes()}
            />
        </View>
        {results && results.hasOwnProperty('quotes') && results.quotes.map((item, i) => {
            let authorName = item.author.trim();
            if (authorName.endsWith(',')) authorName = authorName.substr(0, authorName.length - 1);
            return (
                <ListItem
                    key={i}
                    title={item.quote}
                    rightIcon={<AntDesign
                        onPress={(() => {
                            if (item.isFavorite) {
                                // unfavorite
                                onDelete(authorName, item.quote)
                            } else {
                                console.log('favorite this quote', item.quote, 'by', authorName)
                                onAdd(authorName, item.quote);
                            }
                        })}
                        name={item.isFavorite ? 'heart' : "hearto"} size={24} color="black" />}
                    subtitle={<Text
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
    },
    randomButtonStyle: {
        flex: 1,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    input: {
        flex: 2,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        paddingLeft: 8,
        backgroundColor: 'white',
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
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
