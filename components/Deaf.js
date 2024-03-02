import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function Deaf() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [responseText, setResponseText] = useState('');
  const handleResponse = (result) => {
    // Update the state with the response
    setResponseText(result.result);
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to record audio not granted');
        return;
      }
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        if (uri) {
          const fileName = 'recorded_audio.mp4';
          const downloadDirectory = `${FileSystem.documentDirectory}Download/`;
          await FileSystem.makeDirectoryAsync(downloadDirectory, { intermediates: true });
          const downloadUri = downloadDirectory + fileName;
          await FileSystem.moveAsync({
            from: uri,
            to: downloadUri,
          });
          console.log(`Recorded audio saved in Downloads folder ${downloadUri} `);

          // Send the audio file to localhost:5000/audio
          const formData = new FormData();
          formData.append('file', {
            uri: downloadUri,
            name: fileName,
            type: 'audio/mp4',
          });

          const response = await fetch('https://1920-112-196-37-184.ngrok-free.app/audio', {
            method: 'POST',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // Log the result
          const result = await response.json();
          console.log('Response:', result);
          handleResponse(result);
        }
      }
    } catch (error) {
      console.error('Failed to stop recording or send audio', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recognizer: Start speaking when ready</Text>
      <Text>{isRecording ? 'Recording...' : 'Press Record to Start'}</Text>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      {responseText ? <Text>{responseText}</Text> : null}
    </View>
  );
}
