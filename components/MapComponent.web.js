import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/Colors';

export default function MapComponent({ destination, region, onRegionChangeComplete }) {
  const handleOpenWebMaps = () => {
    if (!destination?.trim()) return;
    const url = `https://www.google.com/maps?q=${encodeURIComponent(destination)}`;
    Linking.openURL(url).catch(err => console.error("Failed to open maps:", err));
  };

  return (
    <Pressable 
      style={styles.webMapPlaceholder}
      onPress={handleOpenWebMaps}
    >
      <Ionicons name="map" size={32} color={Colors.light.primary} />
      <Text style={styles.webMapText}>
        {destination ? `View ${destination} on Map` : 'Map Preview'}
      </Text>
      <Text style={styles.webMapSubText}>
        Click to open in Google Maps
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.lightGray,
    padding: 20,
    gap: 8,
  },
  webMapText: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  webMapSubText: {
    color: Colors.light.gray,
    fontSize: 12,
    textAlign: 'center',
  },
});