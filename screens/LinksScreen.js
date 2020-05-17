import { AntDesign } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getAuthorFromId } from '../utils';

export default function LinksScreen({ navigation, allData, onDelete }) {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {allData && allData.map((item, i) => {
                const authorName = getAuthorFromId(item.id);
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
                                        'Author Detail', { name: authorName })
                                    }>{authorName}</Text>
                            }
                        bottomDivider
                    />
                ))
            })
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
    },
    bold: {
        fontWeight: '400',
        color: 'blue'
    },    
});
