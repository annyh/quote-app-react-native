import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import Colors from '../constants/Colors';

export default function TabBarIcon({ name, focused }) {
    return (
        <AntDesign
            name={name}
            size={24}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}
