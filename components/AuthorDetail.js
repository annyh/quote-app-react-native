import * as React from 'react';
import { ListItem } from 'react-native-elements'
import { Button, ScrollView, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

export default function AuthorDetail({ _name }) {
    const [results, setResults] = useState([]);
    const name = _name || 'mark twain';
    async function getUserAsync(query) {
        let response = await fetch(query);
        let data = await response.json()
        return data;
    }
    const getQuery = () => {
        return 'https://goodquotesapi.herokuapp.com/author/' + name.split(' ').join('+')
    }
    useEffect(() => {
        getUserAsync(getQuery())
            .then(data => setResults(data))
    }, [name])
    return (<ScrollView style={styles.container}>
        <Text style={styles.title}>{name}
            <AntDesign name="hearto" size={24} color="black" />
        </Text>
        <Button title="Open in Wikipedia" onPress={async () => {
            const url = 'https://en.wikipedia.org/wiki/' + name.split(' ').join('_')
            console.log('opening url', url);
            await WebBrowser.openBrowserAsync(url)
        }} />
        {results.hasOwnProperty('quotes') && results.quotes.map((item, i) => (
            <ListItem
                key={i}
                title={item.quote}
                rightIcon={<AntDesign name="hearto" size={24} color="black" />}
                subtitle={item.publication}
                bottomDivider
            />
        ))
        }</ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
    },
});
