import { View, Text, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Signup from './screens/Signup';
import Login from './screens/Login';
import { enableLatestRenderer } from 'react-native-maps';
import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';
import Screen from './screens/Notification';

enableLatestRenderer();
const Stack = createNativeStackNavigator();

const App = () => {
  const userlogindata = useSelector((state) => state.userLoginReducer.userdata)
  const [userData, setUserData] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true)
    checkLoginStatus();
  }, [userlogindata]);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userdata');
      setloading(false)
      if (userToken) {
        setloading(false)
        setUserData(userToken);
      } else {
        setloading(false)
        setUserData(null);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };
  return (
    <NavigationContainer>
      {
        loading ? <ActivityIndicator /> : <Stack.Navigator>
          {!userData ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={MapScreen}
            />
          )}
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={Signup}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
  )

}

export default App