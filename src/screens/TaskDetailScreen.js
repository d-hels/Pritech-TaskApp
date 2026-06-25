import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function TaskDetailScreen({ route }) {
  const { task } = route.params;

  const createdDate =
    task.createdDate instanceof Date
      ? task.createdDate
      : new Date(task.createdDate);

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Title</Text>
      <View style={styles.card}>
        <Text style={styles.value}>{task.title}</Text>
      </View>

      <Text style={[styles.label, { marginTop: 16 }]}>Status</Text>
      <View style={styles.cardRow}>
        <Text style={styles.value}>
          {task.status ? 'Completed' : 'Not Completed'}
        </Text>

        <View
          style={[
            styles.badge,
            task.status ? styles.badgeDone : styles.badgePending,
          ]}
        >
          <Text style={styles.badgeText}>
            {task.status ? 'DONE' : 'TODO'}
          </Text>
        </View>
      </View>

      <Text style={[styles.label, { marginTop: 16 }]}>Created Date</Text>
      <View style={styles.card}>
        <Text style={styles.value}>
          {createdDate.toLocaleDateString()}
        </Text>
      </View>

      <Text style={[styles.label, { marginTop: 16 }]}>Description</Text>
      <View style={[styles.card, styles.textArea]}>
        <Text style={styles.value}>{task.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    opacity: 0.7,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
  },
  value: {
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeDone: {
    backgroundColor: '#D1FAE5',
  },
  badgePending: {
    backgroundColor: '#FEE2E2',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
});
