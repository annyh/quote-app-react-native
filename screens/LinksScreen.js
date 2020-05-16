import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import results from '../data/quotes.json';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {results && results.map((item, i) => (
            <ListItem
                key={i}
                title={item.quote}
                rightIcon={<AntDesign name="heart" size={24} color="black" />}
                subtitle={item.author}
                bottomDivider
            />
        ))
        }</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  }
});
