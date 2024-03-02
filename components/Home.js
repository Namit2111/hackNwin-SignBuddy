import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Button 1 Screen"
        onPress={() => navigation.navigate('Deaf')}
      />
      <Button
        title="Go to Button 2 Screen"
        onPress={() => navigation.navigate('Blind')}
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
});

export default Home;
