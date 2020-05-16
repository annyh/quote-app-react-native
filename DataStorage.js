/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 * 
 * 'DataStorage' class is responsible to save data permanently
 *  https://facebook.github.io/react-native/docs/asyncstorage
*/

import { AsyncStorage } from 'react-native';
import { TODOSTATUS } from './Settings';

export default class DataStorage {
    createData = async (id, dataString) => {
        try {
            await AsyncStorage.setItem(id, dataString); // key, value
        }
        catch (error) {
            console.log("Error saving data");
        }
    };

    readAllData = (filter, prefix) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, result) => {
                    let list = [];

                    result.map((item) => {
                        const key = item[0];
                        if (prefix && key.startsWith(prefix)) {
                            const value = item[1];
                            const todo = JSON.parse(value);

                            if (filter !== undefined && todo.status === filter) {
                                //based on filter
                                list.push(todo);
                            }
                        }
                    });
                    resolve(list);
                });
            });
        });
    };

    deleteAllArchivedTodoList = (prefix) => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, result) => {
                    let archivedList = [];

                    result.map((item) => {
                        const key = item[0];
                        if (key.startsWith(prefix)) {
                            const value = item[1];
                            const todo = JSON.parse(value);

                            if (todo.status === TODOSTATUS.done) {
                                archivedList.push(todo.id);
                            }
                        }
                    });
                    //remove all done todolist
                    AsyncStorage.multiRemove(archivedList, (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve("done");
                    });
                });
            });
        });
    };
}