import * as React from 'react';
import { ButtonGroup, ListItem, withTheme } from 'react-native-elements'
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import GridGallery from '../components/GridGallery';
import model from '../Model';
import {getTitleFromId} from '../utils';

export default function AuthorScreen({ navigation, allData, bool, needsRenderAgain }) {
    const prefix = '@author/';

    // id is optional. if no id provided, delete all data in this app
    const deleteData = async (id) => {
        console.log('in deleteData, id', id)
        await model.deleteArchivedTodoList(id || prefix);
        needsRenderAgain(!bool);
    }
    
    return (<ScrollView style={styles.container}>
        <Button title='Delete all data' onPress={() => deleteData()} />
        {allData && allData.map((item, i) => (
            <ListItem
                key={i}
                title={getTitleFromId(item.id, prefix)}
                rightIcon={<AntDesign
                    onPress={() => deleteData(item.id)}
                    name="heart" 
                    size={24} 
                    color="black" />}
                bottomDivider
            />
        ))
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
