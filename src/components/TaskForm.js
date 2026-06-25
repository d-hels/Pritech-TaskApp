import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme';

export default function TaskForm({ onSubmit, onCancel }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!title.trim()) {
            setError('Title is required');
            return;
        }
        setError('');
        onSubmit(title.trim(), description.trim());
        setTitle('');
        setDescription('');
    };

    return (
        <View>
            <Text style={styles.modalTitle}>New Task</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="Task title"
                placeholderTextColor={colors.textSecondary}
                value={title}
                onChangeText={setTitle}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description (optional)"
                placeholderTextColor={colors.textSecondary}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        marginBottom: 12,
        color: colors.text,
        backgroundColor: '#fafafa',
    },
    inputError: {
        borderColor: colors.danger,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    error: {
        color: colors.danger,
        fontSize: 14,
        marginBottom: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    cancelButton: {
        backgroundColor: 'gray',
    },
    submitButton: {
        backgroundColor: colors.primary,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});
