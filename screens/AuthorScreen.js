import * as React from 'react';
import { ButtonGroup, ListItem, withTheme } from 'react-native-elements'
import { FlatList, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import GridGallery from '../components/GridGallery';

export default function AuthorScreen({ navigation }) {
    return (<ScrollView style={styles.container}>
        <GridGallery />
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
