import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const Home = ({ navigation }) => {
  return (
   
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          // source={require('../assets/userlogo.png')}
          style={styles.userLogo}
        />
        <Text style={styles.greeting}>👋 Hi, I'm Your Buddy!!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4ebdd9', marginBottom: 10 }]}
          onPress={() => navigation.navigate('Deaf')}
        >
          <Text style={styles.buttonText}>       Deaf</Text>
          <Image
            source={require('../assets/deaf.png')} 
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4ebdd9', marginBottom: 10 }]}
          onPress={() => navigation.navigate('Blind')}
        >
          <Text style={styles.buttonText}>  Blind</Text>
          <Image
            source={require('../assets/blind.png')} 
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={require('../assets/de.png')} 
        style={styles.image}
      />

      {}
    </View>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  userLogo: {
    width: 31,
    height: 32,
    marginRight: 10,

  },
  greeting: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: -60,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20, 
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 90,
    overflow: 'hidden',
  },
  buttonImage: {
    width: '60%', 
    height: '100%', 
    resizeMode: 'cover',
    
    marginRight: 10, 
    marginLeft:-10,
  },
  
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  
  
});

export default Home;
