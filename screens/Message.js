import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Platform, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const Message = () => {
  useEffect(() => {
    const initialize = async () => {
      const hasPermission = await checkApplicationPermission();
      if (hasPermission) {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } else {
        console.log('Notification permissions not granted.');
      }

      // Set up notification listeners
      const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
        console.log('Foreground Notification:', remoteMessage);
        Alert.alert('New Notification', remoteMessage.notification?.body || 'No body');
      });

      const unsubscribeBackground = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('Background Notification:', remoteMessage);
      });

      return () => {
        unsubscribeForeground();
        unsubscribeBackground();
      };
    };

    initialize();
  }, []);

  const checkApplicationPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log('iOS notification permission denied.');
        return false;
      }

      console.log('iOS notification permission granted.');
      return true;
    } else if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Android notification permission granted.');
          return true;
        } else {
          console.log('Android notification permission denied.');
          return false;
        }
      } else {
        console.log('Notification permission not required for Android < 13.');
        return true;
      }
    }

    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Firebase Messaging Setup</Text>
    </SafeAreaView>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
