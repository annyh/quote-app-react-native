import * as React from 'react';
import { ButtonGroup, ListItem, withTheme } from 'react-native-elements'
import { FlatList, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen() {
    const [text, setText] = useState('');
    const queryBy = ['author', 'tag', 'title'];
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

    return (<ScrollView style={styles.container}>
        <ButtonGroup
        containerStyle={styles.buttonContainer}
            onPress={(i) => {
                setText('')
                setQueryIndex(i)
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
        {results.hasOwnProperty('quotes') && results.quotes.map((item, i) => (
            <ListItem
                key={i}
                title={item.quote}
                rightIcon={<AntDesign name="heart" size={24} color="black" />}
                bottomDivider
            />
        ))
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
