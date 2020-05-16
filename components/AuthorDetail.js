import * as React from 'react';
import { ListItem } from 'react-native-elements'
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function AuthorDetail({ _name }) {
    const [results, setResults] = useState([]);
    const name = _name  || 'mark twain';
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
        <Text style={styles.title}>{name }</Text>
        {results.hasOwnProperty('quotes') && results.quotes.map((item, i) => (
            <ListItem
                key={i}
                title={item.quote}
                rightIcon={<AntDesign name="heart" size={24} color="black" />}
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
