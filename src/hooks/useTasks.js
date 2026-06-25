import { useState, useEffect } from 'react';
import { loadTasks, saveTasks } from '../utils/storage';
import { fetchTasksFromAPI } from '../api/publicApi';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initialize = async () => {
            const stored = await loadTasks();
            if (stored && stored.length) {
                setTasks(stored);
            } else {
                const apiTasks = await fetchTasksFromAPI();
                setTasks(apiTasks);
                await saveTasks(apiTasks);
            }
            setLoading(false);
        };
        initialize();
    }, []);

    useEffect(() => {
        if (!loading) {
            saveTasks(tasks);
        }
    }, [tasks, loading]);

    const addTask = (title, description) => {
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
            status: false,
            createdDate: new Date().toISOString(),
        };
        setTasks(prev => [newTask, ...prev]);
    };

    const toggleComplete = (id) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, status: !task.status } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const updateTask = (id, updatedFields) => {
        setTasks(prev =>
            prev.map(task => (task.id === id ? { ...task, ...updatedFields } : task))
        );
    };

    return {
        tasks,
        loading,
        addTask,
        toggleComplete,
        deleteTask,
        updateTask,
    };
};
