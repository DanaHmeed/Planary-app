import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapComponent from '../components/MapComponent'; // This will auto-resolve to .native.js or .web.js
import { Colors } from '../constants/Colors';

export default function DestinationInputScreen() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('');
  const [budget, setBudget] = useState('');
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleSearch = () => {
    if (!destination.trim()) {
      alert('Please enter a destination');
      return;
    }

    router.push({
      pathname: '/destination-details',
      params: {
        destination: destination,
        dates: dates,
        travelers: travelers,
        budget: budget
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Pressable 
              onPress={() => router.replace('/(tabs)/')}
              style={({ pressed }) => [
                styles.backButton,
                { opacity: pressed ? 0.6 : 1 }
              ]}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.light.primary} />
            </Pressable>
            <Text style={styles.headerTitle}>Plan Your Trip</Text>
          </View>

          <View style={styles.mapContainer}>
            <MapComponent
              region={region}
              onRegionChangeComplete={setRegion}
              destination={destination}
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Where do you want to go?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter destination (e.g. Tokyo)"
              placeholderTextColor={Colors.light.gray}
              value={destination}
              onChangeText={setDestination}
              autoCapitalize="words"
            />

            <Text style={styles.formLabel}>When are you traveling?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter dates (e.g. June 15-25)"
              placeholderTextColor={Colors.light.gray}
              value={dates}
              onChangeText={setDates}
            />

            <Text style={styles.formLabel}>Number of travelers</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number of travelers"
              placeholderTextColor={Colors.light.gray}
              keyboardType="number-pad"
              value={travelers}
              onChangeText={setTravelers}
            />

            <Text style={styles.formLabel}>Budget range</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter budget (e.g. $1000-2000)"
              placeholderTextColor={Colors.light.gray}
              value={budget}
              onChangeText={setBudget}
            />

            <Pressable 
              style={({ pressed }) => [
                styles.searchButton,
                !destination.trim() ? styles.disabledButton : {},
                { 
                  backgroundColor: pressed ? Colors.light.darkPrimary : 
                    !destination.trim() ? Colors.light.gray : Colors.light.primary,
                  transform: [{ scale: pressed ? 0.98 : 1 }]
                }
              ]} 
              onPress={handleSearch}
              disabled={!destination.trim()}
            >
              <Text style={styles.searchButtonText}>Find My Dream Trip</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.lightGray,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  mapContainer: {
    height: 250,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light.lightGray,
    padding: 15,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 10,
    elevation: 1,
  },
  searchButton: {
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
    elevation: 3,
    shadowColor: Colors.light.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    opacity: 0.7,
  },
  searchButtonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});