import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapComponent({ region, onRegionChangeComplete, destination }) {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={StyleSheet.absoluteFillObject}
      region={region}
      onRegionChangeComplete={onRegionChangeComplete}
      showsUserLocation={true}
      showsMyLocationButton={true}
    />
  );
}