import React from 'react';
import { View, Text } from 'react-native';

const Notes = ({ route }) => {
  const { savedNotes } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, textAlign: 'center' }}>Saved Notes:</Text>
      {savedNotes.map((note, index) => (
        <Text key={index} style={{ fontSize: 16, marginTop: 10 }}>{note}</Text>
      ))}
    </View>
  );
};

export default Notes;
