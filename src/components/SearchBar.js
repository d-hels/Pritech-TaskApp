import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function SearchBar({ value, onChange }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search tasks..."
                placeholderTextColor={colors.textSecondary}
                value={value}
                onChangeText={onChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.card,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: colors.border,
        color: colors.text,
    },
});
