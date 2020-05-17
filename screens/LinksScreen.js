import { AntDesign } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import * as React from 'react';
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import model from '../Model';
import {getTitleFromId} from '../utils';

export default function LinksScreen({navigation, allData}) {
    const prefix = '@author/'
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {allData && allData.map((item, i) => {
            return item.quotes.map((quote) => (
                <ListItem
                    key={i}
                    title={quote}
                    rightIcon={<AntDesign name="heart" size={24} color="black" />}
                    subtitle={getTitleFromId(item.id, prefix)}
                    bottomDivider
                />
            ))})
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
  }
});
