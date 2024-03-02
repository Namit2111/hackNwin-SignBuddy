import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Blind = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button 2 Screen</Text>
      <Text>This is Button 2 Screen content.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Blind;
