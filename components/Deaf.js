import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Deaf = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button 1 Screen</Text>
      <Text>This is Button 1 Screen content.</Text>
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

export default Deaf;
