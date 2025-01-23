// import {StyleSheet, Text, View} from 'react-native';
// import React, {useEffect} from 'react';
// import * as Animatable from 'react-native-animatable';

// const Splash = ({navigation}) => {
//   useEffect(() => {
//     setTimeout(() => {
//       navigation.navigate('Home');
//     }, 3000);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animatable.Text
//        animation="slideInDown" 
//        iterationCount={5}
//         direction="alternate"

//       style={styles.text}>Splash</Animatable.Text>
//     </View>
//   );
// };

// export default Splash;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   text: {
//     color: 'white',
//     fontSize: 30,
//   },
// });


// using lottie 

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';


const Splash = ({ navigation }) => {
  useEffect(() => {
    // Automatically navigate to MainScreen after 3 seconds
    const timeout = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);

    return () => clearTimeout(timeout); // Clear timeout if the component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Lottie Animation */}
      <LottieView
        source={require('../src/assets/animation.json')} // Replace with your Lottie animation file
        autoPlay
        loop
        style={styles.lottie}
      />

      {/* Text Below Animation */}
      <Text style={styles.text}>Welcome to My App!</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 30,
  },
});

export default Splash;


