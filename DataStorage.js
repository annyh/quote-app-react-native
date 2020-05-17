/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 * 
 * 'DataStorage' class is responsible to save data permanently
 *  https://facebook.github.io/react-native/docs/asyncstorage
*/

import { AsyncStorage } from 'react-native';

export default class DataStorage {
    createData = async (id, dataString) => {
        try {
            await AsyncStorage.setItem(id, dataString); // key, value
        }
        catch (error) {
            console.log("Error saving data");
        }
    };

    readAllData = (prefix) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, result) => {
                    let list = [];

                    result.map((item) => {
                        const key = item[0];
                        if (prefix && key.startsWith(prefix)) {
                            const value = item[1];
                            const todo = JSON.parse(value);
                            list.push(todo);
                        }
                    });
                    resolve(list);
                });
            });
        });
    };

    deleteAllArchivedTodoList = async (prefix) => {
        try {
            const keys = await AsyncStorage.getAllKeys()
            const items = await AsyncStorage.multiGet(keys)

            const archivedList = [];
            items.map((item) => {
                const key = item[0];
                if (key.startsWith(prefix)) {
                    archivedList.push(key);
                }
            });

            // remove 
            console.log('remove', archivedList)
            await AsyncStorage.multiRemove(archivedList);
        } catch (error) {
            console.log("Problem in deleting data", error)
        }
    };
}