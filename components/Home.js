import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Deaf"
        onPress={() => navigation.navigate('Deaf')}
      />
      <Button
        title="Blind"
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
