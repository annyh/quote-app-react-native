import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';

export default function FaveIcon({item, name, index, results, setResults, onAdd, onDelete}) {
    return (<AntDesign
        onPress={(() => {
            if (item.isFavorite) {
                // unfavorite
                results.quotes[index].isFavorite = false;
                setResults({ ...results });                
                onDelete(name, item.quote)
            } else {
                console.log('favorite this quote', item.quote, 'by', name)
                results.quotes[index].isFavorite = true;
                setResults({ ...results });
                onAdd(name, item.quote);
            }
        })}
        name={item.isFavorite ? 'heart' : "hearto"} size={24} color="black" />
    )
}