// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';

// const EmailPassAuth = () => {
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');

//   //     const createUser = () =>{
//   //         auth()
//   //   .createUserWithEmailAndPassword(email, password)
//   //   .then(() => {
//   //     console.log('User account created & signed in!');
//   //   })
//   //   .catch(error => {
//   //     if (error.code === 'auth/email-already-in-use') {
//   //       console.log('That email address is already in use!');
//   //     }

//   //     if (error.code === 'auth/invalid-email') {
//   //       console.log('That email address is invalid!');
//   //     }

//   //     console.error(error);
//   //   });

//   //     }

//   const SignIn = () => {
//     auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         console.log('User account signed in!');
//       })
//       .catch(error => {
//         if (error.code === 'auth/invalid-email') {
//           console.log('That email address is invalid!');
//         }
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Enter Email"
//         style={[styles.input]}
//         value={email}
//         onChangeText={text => setEmail(text)}
//       />
//       <TextInput
//         placeholder="Enter Password"
//         style={[styles.input, styles.marginTop]}
//         secureTextEntry
//         value={password}
//         onChangeText={text => setPassword(text)}
//       />
//       <TouchableOpacity style={styles.button} onPress={SignIn}>
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default EmailPassAuth;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     width: '90%',
//     height: 55,
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 20,
//     padding: 20,
//   },
//   marginTop: {
//     marginTop: 30,
//   },
//   button: {
//     width: '70%',
//     height: 55,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 20,
//   },
//   buttonText: {
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });


import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const EmailPassAuth = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(''); // State for error message
  const [logInMessage , setLogInMessage] = React.useState('');

  const SignIn = () => {
    setError(''); // Clear any previous error
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
        setError(''); // Clear error if sign-in is successful
        setLogInMessage('User account signed in!');
      })
      .catch(error => {
        // Handle specific errors
        if (error.code === 'auth/invalid-email') {
          setError('Invalid email address.');
        } else if (error.code === 'auth/user-not-found') {
          setError('No user found with this email.');
        } else if (error.code === 'auth/wrong-password') {
          setError('Incorrect password.');
        } else {
          setError('Something went wrong. Please try again.');
        }
      });
  };

  return (
    <View style={styles.container}>
        
      <TextInput
        placeholder="Enter Email"
        style={[styles.input]}
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        placeholder="Enter Password"
        style={[styles.input, styles.marginTop]}
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {logInMessage ? <Text style={styles.successText}>{logInMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={SignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailPassAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 55,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    padding: 20,
  },
  marginTop: {
    marginTop: 30,
  },
  button: {
    width: '70%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
  successText: {
    color: 'green',
    fontSize: 14,
    marginTop: 10,
    
  },
});
