import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../theme';

export default function TaskItem({ task, onToggle, onDelete, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.left}>
                <TouchableOpacity style={[styles.checkbox, { transform: [{ scale: 0.7 }] }]}>
                    <CheckBox
                        value={task.status}
                        onValueChange={() => onToggle()}
                    />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={[styles.title, task.status && styles.completedTitle]}>
                        {task.title}
                    </Text>
                    {task.description ? (
                        <Text style={styles.description} numberOfLines={1}>
                            {task.description}
                        </Text>
                    ) : null}
                </View>
            </View>
            <TouchableOpacity onPress={onDelete}>
                <Text style={styles.deleteIcon}>
                    <Trash2 size={20} color="red" />
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.card,
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 1,
        borderColor: colors.border,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    checkbox: {
        marginRight: 14,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    completedTitle: {
        textDecorationLine: 'line-through',
        color: colors.textSecondary,
    },
    description: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 2,
    },
    deleteIcon: {
        fontSize: 20,
        padding: 6,
    },
});
