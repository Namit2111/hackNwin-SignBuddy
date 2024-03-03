import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function Deaf() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [responseText, setResponseText] = useState('');

  const handleResponse = (result) => {
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
    <View style={styles.container}>
      <Image
        source={require('../assets/listen.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => {
            // Handle button press
          }}
        >
          <Text style={styles.topButtonText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => {
            // Handle button press
          }}
        >
          <Text style={styles.topButtonText}>Save Notes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.attractiveContainer}>
        <Text style={styles.blackBackgroundText}>👂 Recognizer: Start Speaking When Ready</Text>
        <Text>{isRecording ? 'Recording...' : 'Press Record to Start'}</Text>
        <TouchableOpacity
          style={styles.circularButton}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.buttonText}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="🔍 Recognized Text Displayed Here...."
          value={responseText}
          editable={!isRecording}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    position: 'absolute',
    top: '5%', // Adjust the percentage or use a specific value
    zIndex: 1, // Ensure the top buttons are above other elements
  },
  topButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 8,
  },
  topButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  attractiveContainer: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#00879e',
    padding: 20,
    backgroundColor: '#E5F6FD',
    alignItems: 'center',
    width: '80%',
    opacity: 0.7,
    marginTop: '40%', // Adjust the percentage or use a specific value
  },
  circularButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  blackBackgroundText: {
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textInput: {
    width: '100%',
    height: 100,
    borderWidth: 2,
    borderColor: '#00879e',
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#E5F6FD',
    textAlignVertical: 'top',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.9,
  },
});
