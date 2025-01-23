import { StyleSheet, Text, View , Button } from 'react-native'
import React from 'react'
import analytics from '@react-native-firebase/analytics';

const Analytics = () => {

    const predefinedFunc = async() => {
        await analytics().logLogin({
            method: 'facebook',
        })
    }
    
    const customFunc = async() => {
        await analytics().logEvent('custom_event', {
            id : '123',
            item : 'item1',
            description : ['sports', 'games'], 
            price : 100
        })
    }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Button title = "Predefined Button"  onPress={predefinedFunc}/>

        <View style={{margin: 15}}/>

        <Button title = "custom Button"  onPress={customFunc}/>

    </View>
  )
}

export default Analytics;

const styles = StyleSheet.create({})