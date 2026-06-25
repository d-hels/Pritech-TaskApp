import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tasks" component={TaskListScreen} />
            <Stack.Screen name="Details" component={TaskDetailScreen} />
        </Stack.Navigator>
    );
}
