import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import notifee, {AndroidStyle} from '@notifee/react-native';

const Notifee = () => {
  const displayNotifications = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android notification permission denied');
        return;
      }
    }

    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Firebase',
      body: ' Firebase Test push notification',
      android: {
        channelId,
        // smallIcon: 'ic_notification', // Replace with your actual small icon.
        pressAction: {
          id: 'default',
        },
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'https://cdn.pixabay.com/photo/2024/12/31/01/02/costa-rica-9301364_640.jpg',
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={displayNotifications}>
        <Text style={styles.text}>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notifee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
