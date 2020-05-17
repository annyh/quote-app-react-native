import * as React from 'react';
import { ListItem } from 'react-native-elements'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { processResults } from '../utils';
import FaveIcon from './FaveIcon';

export default function AuthorDetail({ _name, allData, onAdd, deleteData }) {
    const [results, setResults] = useState([]);
    const name = _name || 'mark twain';
    let iconName = 'hearto'
    async function getUserAsync(query) {
        let response = await fetch(query);
        let data = await response.json()
        return data;
    }
    const getQuery = () => {
        return 'https://goodquotesapi.herokuapp.com/author/' + name.split(' ').join('+')
    }
    useEffect(() => {
        // get favorite quotes
        getUserAsync(getQuery())
            .then(data => {
                const res = processResults(data, allData);
                setResults(res);
            })
    }, [name]);

    const authors = allData.filter((obj) => obj.id.includes(name));
    if (authors.length) {
        iconName = 'heart';
    }    
    return (<ScrollView style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{name}</Text>
            <AntDesign
                onPress={(() => { 
                    // if already favorite, delete author
                    if (iconName === 'heart') {
                        deleteData(name);
                    } else {
                        onAdd(name);
                    }
                })}
                name={iconName}
                size={32}
                color="black" />
        </View>
        <Button title="Open in Wikipedia" onPress={async () => {
            const url = 'https://en.wikipedia.org/wiki/' + name.trim().split(' ').join('_')
            await WebBrowser.openBrowserAsync(url)
        }} />
        {results && results.hasOwnProperty('quotes') && results.quotes.map((item, i) => (
            <ListItem
                key={i}
                title={item.quote}
                rightIcon={<FaveIcon item={item} name={name} index={i} results={results} setResults={setResults} onAdd={onAdd} />}
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
