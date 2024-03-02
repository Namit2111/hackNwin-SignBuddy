import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Blind from './components/Blind';
import Deaf from './components/Deaf';
import Home from './components/Home';
import SplashScreen from './components/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Deaf" component={Deaf} />
        <Stack.Screen name="Blind" component={Blind} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
