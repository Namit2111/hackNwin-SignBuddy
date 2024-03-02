import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate a delay, e.g., fetching data or performing some initialization
    const timer = setTimeout(() => {
      // Navigate to HomeScreen after the delay
      navigation.replace('Home');
    }, 2000); // Adjust the delay time as needed (in milliseconds)

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splashScreen.png')} // Replace 'splash.png' with your actual splash screen image
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SplashScreen;
