import * as React from 'react';
import { ListItem} from 'react-native-elements'
import { Button, ScrollView, StyleSheet } from 'react-native';
import { getAuthorFromId } from '../utils';

export default function AuthorScreen({ navigation, allData, deleteData }) {
    return (<ScrollView style={styles.container}>
        {/* TODO: move the button to a settings page */}
        {/* <Button title='Delete all data' onPress={() => deleteData()} /> */}
        {allData && allData.map((item, i) => {
            const authorName = getAuthorFromId(item.id);
            return (
                <ListItem
                    key={i}
                    title={getAuthorFromId(item.id)}
                    onPress={() => navigation.navigate(
                        'Author Detail', { name: authorName })
                    }
                    bottomDivider
                    chevron
                />
            )
        })
        }
    </ScrollView>
    );
}

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
