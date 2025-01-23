// import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

// const GoogleSignIn = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: "949522489241-027tul469jagofebcbgn4bnpsb5jho98.apps.googleusercontent.com",
//       offlineAccess: true,
//       forceCodeForRefreshToken: true,
//       loggingEnabled: true, // Enables verbose logging
//     });
//   }, []);

//   // const onGoogleButtonPress = async () => {
//   //   try {
//   //     // Check if your device supports Google Play
//   //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//   //     // Get the user's ID token and user data
//   //     const {user: googleUser} = await GoogleSignin.signIn();

//   //     if (!googleUser) {
//   //       throw new Error('No user found');
//   //     }

//   //     // Update the user state with Google user data
//   //     setUser(googleUser);
//   //     console.log('User signed in:', user);
//   //     // console.log('User signed in:', googleUser);
//   //   } catch (error) {
//   //     console.error('Error signing in:', error);
//   //     Alert.alert('Sign-In Error', error.message);
//   //   }
//   // };
// const onGoogleButtonPress = async () => {
//   // setProcess(true);

//   try {
//     await GoogleSignin.signOut();
//     await GoogleSignin.hasPlayServices({
//       showPlayServicesUpdateDialog: true,
//     });
//     const userInfo = await GoogleSignin.signIn();
//     console.log('Google User Info:', userInfo);
//     // const idToken = userInfo.data.idToken;

//     // if (idToken) {
//     //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//     //   const firebaseUser =
//     //     await auth().signInWithCredential(googleCredential);
//     //   console.log('Firebase User:', firebaseUser);
//     // }
//   } catch (error) {
//     console.error('Google Sign-In Error:', error.message);
//   } 
// };

//   const onGoogleSignOut = async () => {
//     try {
//       await GoogleSignin.signOut();
//       setUser(null); // Clear user state
//       console.log('User signed out');
//     } catch (error) {
//       console.error('Error signing out:', error);
//       Alert.alert('Sign-Out Error', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {user ? (
//         <>
//           <Text style={styles.welcomeText}>Welcome, {user.displayName}!</Text>
//           <Text>Email: {user.email}</Text>
//           <TouchableOpacity style={styles.button2} onPress={onGoogleSignOut}>
//             <Text>Google Sign Out</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <TouchableOpacity style={styles.button1} onPress={onGoogleButtonPress}>
//           <Text>Google Sign In</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button1: {
//     backgroundColor: 'green',
//     padding: 10,
//     borderRadius: 5,
//   },
//   button2: {
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   welcomeText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });

// export default GoogleSignIn;

// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useEffect } from 'react';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

// const GoogleSignIn = () => {
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: '949522489241-027tul469jagofebcbgn4bnpsb5jho98.apps.googleusercontent.com', // Replace with your actual Web Client ID from Firebase
//     });
//   }, []);

//   const onGoogleButtonPress = async () => {
//     try {
//       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

//       const { idToken } = await GoogleSignin.signIn();

//       if (!idToken) {
//         throw new Error('No ID token found');
//       }

//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//       await auth().signInWithCredential(googleCredential);

//       console.log('Signed in with Google!');
//     } catch (error) {
//       console.error('Google Sign-In Error:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button1} onPress={onGoogleButtonPress}>
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default GoogleSignIn;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button1: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });


import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const GoogleSignIn = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '949522489241-027tul469jagofebcbgn4bnpsb5jho98.apps.googleusercontent.com',
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      console.log('Signed in with Google successfully!');
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

