import * as React from 'react';
import { ButtonGroup, ListItem, withTheme } from 'react-native-elements'
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import GridGallery from '../components/GridGallery';
import model from '../Model';
import { getTitleFromId } from '../utils';

export default function AuthorScreen({ navigation, allData, bool, needsRenderAgain, showToast }) {
    const prefix = '@author/';
    // id is optional. if no id provided, delete all data in this app
    const deleteData = async (itemId) => {
        const toDelete = itemId || prefix;
        console.log('deleting', toDelete)
        await model.deleteArchivedTodoList(toDelete);
        needsRenderAgain(!bool);
        const suffix = itemId ? 'author ' + itemId : 'all data';
        showToast('Removed ' + suffix);
    }

    return (<ScrollView style={styles.container}>
        <Button title='Delete all data' onPress={() => deleteData()} />
        {allData && allData.map((item, i) => {
            const authorName = getTitleFromId(item.id, prefix);
            return (
                <ListItem
                    key={i}
                    title={getTitleFromId(item.id, prefix)}
                    onPress={() => navigation.navigate(
                        'MyModal', { name: authorName })
                    }
                    bottomDivider
                    chevron
                />
            )
        })
        }
        {/* <GridGallery /> */}
    </ScrollView>
    );
}

AuthorScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        paddingLeft: 16,
        paddingTop: 12,
    },
});
