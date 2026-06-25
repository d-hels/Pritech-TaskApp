import React, { useState } from 'react';
import {
  View, FlatList, Text, TouchableOpacity, Modal,
  StyleSheet, ActivityIndicator, StatusBar,
} from 'react-native';
import { useTasks } from '../hooks/useTasks';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import SearchBar from '../components/SearchBar';
import FilterButtons from '../components/FilterButtons';
import { Inbox } from 'lucide-react-native';
import { colors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TaskListScreen({ navigation }) {
    const { tasks, loading, addTask, toggleComplete, deleteTask } = useTasks();
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredTasks = tasks
        .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(t => {
            if (filter === 'completed') return t.status;
            if (filter === 'pending') return !t.status;
            return true;
        });

    const completedCount = tasks.filter(t => t.status).length;

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Tasks</Text>
                <Text style={styles.headerSub}>
                    {completedCount} / {tasks.length} completed
                </Text>
            </View>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

            <FlatList
                data={filteredTasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={() => toggleComplete(item.id, item.status)}
                        onDelete={() => deleteTask(item.id)}
                        onPress={() => navigation.navigate('Details', { task: item})}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Inbox size={48} color="#999" />
                        <Text style={styles.emptyTitle}>No tasks yet</Text>
                        <Text style={styles.emptySub}>Tap + to add one</Text>
                    </View>
                }
            />

            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TaskForm
                            onSubmit={(title, desc) => {
                                addTask(title, desc);
                                setModalVisible(false);
                            }}
                            onCancel={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 8,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.text,
    },
    headerSub: {
        fontSize: 14,
        color: colors.textSecondary,
        backgroundColor: colors.border,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        backgroundColor: colors.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    fabIcon: {
        fontSize: 32,
        color: '#fff',
        fontWeight: '300',
        marginTop: -2,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text,
    },
    emptySub: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 4,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 24,
        width: '90%',
        padding: 24,
        elevation: 10,
    },
});
