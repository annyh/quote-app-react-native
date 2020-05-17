import { AntDesign } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import * as React from 'react';
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import model from '../Model';
import { getTitleFromId } from '../utils';

export default function LinksScreen({ navigation, allData, onDelete }) {
    const prefix = '@author/';

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {allData && allData.map((item, i) => {
                const authorName = getTitleFromId(item.id, prefix);
                return item.quotes.map((quote) => (
                    <ListItem
                        key={quote}
                        title={quote}
                        rightIcon={<AntDesign
                            onPress={(() => {
                                console.log('remove this quote', quote, 'by', authorName)
                                onDelete(authorName, quote);
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
