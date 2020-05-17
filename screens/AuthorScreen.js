import * as React from 'react';
import { ListItem} from 'react-native-elements'
import { Button, ScrollView, StyleSheet } from 'react-native';
import { getTitleFromId } from '../utils';

export default function AuthorScreen({ navigation, allData, deleteData }) {
    const prefix = '@author/';

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
