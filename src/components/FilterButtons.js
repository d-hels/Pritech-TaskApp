import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function FilterButtons({ currentFilter, onFilterChange }) {
    const filters = [
        { key: 'all', label: 'All' },
        { key: 'pending', label: 'Pending' },
        { key: 'completed', label: 'Completed' },
    ];

    return (
        <View style={styles.container}>
            {filters.map(f => (
                <TouchableOpacity
                    key={f.key}
                    style={[
                        styles.button,
                        currentFilter === f.key && styles.activeButton,
                    ]}
                    onPress={() => onFilterChange(f.key)}
                >
                    <Text
                        style={[
                            styles.label,
                            currentFilter === f.key && styles.activeLabel,
                        ]}
                    >
                        {f.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 24,
        backgroundColor: colors.border,
        marginRight: 10,
    },
    activeButton: {
        backgroundColor: colors.primary,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textSecondary,
    },
    activeLabel: {
        color: '#fff',
    },
});
