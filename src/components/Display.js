import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end',
    },
    displayValue: {
        fontSize: 60,
        color: '#fff',
    },
    operation: {
        fontSize: 30,
        color: '#e1e1e1',
    }
})

const Display = props => {
    return (
        <View style={styles.display}>
            <Text style={styles.displayValue}
                numberOfLines={1}>{props.value}</Text>
            <Text style={styles.operation}
                numberOfLines={1}>{props.operation}</Text>
        </View>
    )
}

export default Display;
