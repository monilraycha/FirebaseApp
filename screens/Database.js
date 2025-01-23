// import { StyleSheet, Text, View , Button } from 'react-native'
// import React from 'react'
// import firestore from '@react-native-firebase/firestore';

// const Database = () => {

//     getUser = () => {
//         firestore()
//           .collection('users')
//           .doc('user1')
//           .get()
//           .then(res => {
//             console.log('User exists: ', res.exists);
  
//             if (res.exists) {
//               console.log('User data: ', res.data());
//             }
//           });
//       }


//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Database</Text>
//       <Button title='Get User' onPress={getUser} />
//     </View>
//   )
// }

// export default Database;

// const styles = StyleSheet.create({})

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Database = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from Firestore
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('tasks')
      .onSnapshot(snapshot => {
        const fetchedTasks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(fetchedTasks);
      });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Add task to Firestore
  const addTask = async () => {
    if (task.trim()) {
      try {
        await firestore().collection('tasks').add({ name: task });
        setTask(''); // Clear input after adding
      } catch (error) {
        Alert.alert('Error', 'Failed to add task. Please try again.');
      }
    } else {
      Alert.alert('Validation', 'Task name cannot be empty.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.task}>{item.name}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Increased padding for more breathing room
    backgroundColor: '#f8f8f8', // Lighter background for better contrast
  },
  title: {
    fontSize: 28, // Slightly larger title
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333', // Darker text color for better readability
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd', // Lighter border color
    padding: 16, // Increased padding for better touch target
    borderRadius: 8, // Slightly rounded corners
    marginBottom: 24,
    fontSize: 18,
    backgroundColor: '#fff', // White background for input
  },
  list: {
    marginTop: 24,
  },
  task: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Distribute items evenly
    alignItems: 'center', // Vertically align items
    fontSize: 18,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Lighter border color
    backgroundColor: '#fff', // White background for each item
    borderRadius: 8, // Rounded corners for each item
    marginBottom: 8, // Add spacing between items
  },
  taskText: { // Separate style for task text
    flex: 1, // Text takes available space
  },
  taskIcon: { // Style for potential icon (add actual icon later)
    fontSize: 20,
    color: '#555',
  },

});


export default Database;
