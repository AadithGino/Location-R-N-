import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {userLogoutAction} from '../../redux/actions/action';
import notifee, {AndroidStyle} from '@notifee/react-native';

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        resolve({latitude, longitude});
      },
      error => {
        reject(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};

async function onDisplayNotification() {
  
  await notifee.requestPermission()

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  notifee
    .displayNotification({
      title: 'Current Location Successfully Fetched',
      body: 'Successfully current locattion fetched, and displayed in app',
      android: {
        channelId,
        style: {
          type: AndroidStyle.BIGTEXT,
          text: 'Successfully current locattion fetched, and displayed in app',
        },
        autoCancel: true,
      },
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

const MapScreen = ({navigation}) => {
  const [region, setRegion] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const dispatch = useDispatch();

  const handleUpdateMap = () => {
    if (latitude && longitude) {
      const newRegion = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      };
      setRegion(newRegion);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <Button
          onPress={() => {
            dispatch(userLogoutAction());
            navigation.replace('Home');
          }}
          title="Logout"
          color="black"
        />
      ),
    });
    getCurrentLocation()
      .then(location => {
        onDisplayNotification();
        console.log('Current location:', location);
        const newLocation = {
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(newLocation);
      })
      .catch(error => {
        console.error('Error getting location:', error);
      });
  }, []);

  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    const newRegion = {
      latitude: parseFloat(coordinate.latitude),
      longitude: parseFloat(coordinate.longitude),
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    };
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      {region ? (
        <>
          <MapView onPress={handleMapPress} style={styles.map} region={region}>
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="Selected Location"
            />
          </MapView>
          <View style={styles.inputContainer}>
            <Text>Latitude:</Text>
            <TextInput
              style={styles.input}
              value={latitude}
              placeholder="Enter Latitude"
              placeholderTextColor="black"
              keyboardType="number-pad"
              onChangeText={setLatitude}
            />
            <Text>Longitude:</Text>
            <TextInput
              placeholder="Enter Longitude"
              placeholderTextColor="black"
              style={styles.input}
              keyboardType="number-pad"
              value={longitude}
              onChangeText={setLongitude}
            />
            <Button title="Update Map" onPress={handleUpdateMap} />
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 8,
    padding: 4,
  },
});
