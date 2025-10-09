import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    return Geolocation.requestAuthorization('whenInUse');
  }

  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'FuelMate needs access to your location to deliver fuel.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return 'granted';
      } else {
        return 'denied';
      }
    } catch (err) {
      console.warn(err);
      return 'denied';
    }
  }
};

export const getCurrentLocation = () => {
  return new Promise(async (resolve, reject) => {
    const hasPermission = await requestLocationPermission();

    if (hasPermission === 'granted') {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        error => {
          reject(error);
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } else {
        reject(new Error('Location permission denied.'));
    }
  });
};
