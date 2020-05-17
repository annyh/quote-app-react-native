import * as React from 'react';
import { ListItem } from 'react-native-elements'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

export default function AuthorDetail({ _name, allData }) {
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
    }, [name]);
    
    console.log('in Author detail', allData.length);
    return (<ScrollView style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{name}</Text>
            <AntDesign
                    onPress={(() => {
                        console.log('favorite this author', name)
                    })}
                    name="hearto"
                    size={32}
                    color="black" />
        </View>
        <Button title="Open in Wikipedia" onPress={async () => {
            const url = 'https://en.wikipedia.org/wiki/' + name.trim().split(' ').join('_')
            await WebBrowser.openBrowserAsync(url)
        }} />
        {results.hasOwnProperty('quotes') && results.quotes.map((item, i) => (
            <ListItem
                key={i}
                title={item.quote}
                onPress={(() => {
                    console.log('favorite:', item.quote, 'by', name)
                })}
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
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        paddingBottom: 12,
        marginLeft: 12,
        marginRight: 12,
    },
    title: {
        fontSize: 32,
    },
});
