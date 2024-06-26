import { Animated, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

const Splash = ({navigation}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const zoomIn = Animated.timing(scaleAnim, {
      toValue: 3, // Zoom in to twice the original size
      duration: 1500, // Duration of the zoom-in animation (1.5 seconds)
      useNativeDriver: true,
    });

    const zoomOut = Animated.timing(scaleAnim, {
      toValue: 1, // Zoom out to the original size
      duration: 1500, // Duration of the zoom-out animation (1.5 seconds)
      useNativeDriver: true,
    });

    Animated.sequence([
      zoomIn,
      zoomOut,
    ]).start(() => {
      navigation.navigate('Home',{
        transition: 'topToBottom',
      });
    });
  }, [scaleAnim, navigation]);


  return (
    <View style={styles.container}>
      <Animated.Image source={require('../assets/images/logo-2.png')} 
      style={[styles.logoImg,{transform:[{scale:scaleAnim}] }] }/>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FFCD78',
    justifyContent:'center',
    alignItems:'center'
  },
  logoImg:{
    width:200,
    height:200,
    resizeMode:'contain'
  }
})

export default Splash
