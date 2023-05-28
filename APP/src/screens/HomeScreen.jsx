import { StyleSheet, Text, TextInput, View,Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';


const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        resolve({ latitude, longitude });
      },
      error => {
        reject(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

export default function HomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    getCurrentLocation()
      .then(location => {
        console.log('Current location:', location);
        const newLocation = {
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setCurrentLocation(newLocation);
        setSelectedLocation(location)
      })
      .catch(error => {
        console.error('Error getting location:', error);
      });
  }, []);


  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const handleUpdateMarker = () => {
    if (latitude && longitude) {
      const newLocation = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setSelectedLocation(newLocation);
     
    }
  };
  return (
    <View>
      {
        currentLocation ? <MapView
          style={{ height: '100%' }}
          onPress={handleMapPress}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {selectedLocation && (
            <Marker coordinate={selectedLocation} title="Selected Location" />
          )}
        </MapView> : ''
      }
      {selectedLocation && (
        <View style={styles.infoContainer}>
        

        <Text>Latitude:</Text>
        <TextInput
          style={[styles.input,{color:'black'}]}
          value={latitude}
          placeholderTextColor='black'
          placeholder='Enter latitude'
          onChangeText={setLatitude}
        />
        <Text>Longitude:</Text>
        <TextInput
          style={styles.input}
          value={longitude}
          onChangeText={setLongitude}
        />
        <Button title="Update Marker" onPress={handleUpdateMarker} />

          <Text style={styles.infoText}>
            Latitude: {selectedLocation.latitude.toFixed(6)}
          </Text>
          <Text style={styles.infoText}>
            Longitude: {selectedLocation.longitude.toFixed(6)}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 4,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 4,
  },
  input: {
    color:'black',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 8,
    padding: 4,
  },
});