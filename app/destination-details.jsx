import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

// Destination images mapping
const destinationImages = {
  'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000',
  'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
  'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1000',
  'bali': 'https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&q=80&w=1000',
  'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1000',
  'kyoto': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000',
  'default': require('../assets/images/image2.png')
};

export default function DestinationDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get parameters from the route
  const { destination, dates, travelers, budget, description, imageUrl } = params;
  
  // Determine which image to use
  const getImage = () => {
    if (imageUrl) {
      return { uri: imageUrl };
    }
    
    const lowercaseDestination = destination?.toLowerCase();
    if (lowercaseDestination && destinationImages[lowercaseDestination]) {
      return { uri: destinationImages[lowercaseDestination] };
    }
    
    return destinationImages.default;
  };

  // Generate a description if not provided
  const getDescription = () => {
    if (description) return description;
    
    return `${destination} is a wonderful destination known for its unique culture, beautiful sights, and unforgettable experiences. Plan your perfect trip and create memories that will last a lifetime!`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.header}>
          <Pressable 
            onPress={() => router.back()} 
            style={({ pressed }) => [
              styles.backButton,
              { opacity: pressed ? 0.7 : 1 }
            ]}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.light.white} />
          </Pressable>
          <Text style={styles.headerTitle}>{destination}</Text>
        </View>

        <Image
          source={getImage()}
          style={styles.destinationImage}
          resizeMode="cover"
        />

        <View style={styles.contentWrapper}>
          <View style={styles.detailsContainer}>
            <Text style={styles.destinationTitle}>{destination}</Text>
            
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>{getDescription()}</Text>

            {(dates || travelers || budget) && (
              <>
                <Text style={styles.sectionTitle}>Your Trip Details</Text>
                
                {dates && (
                  <View style={styles.tripDetail}>
                    <Ionicons name="calendar-outline" size={22} color={Colors.light.primary} />
                    <Text style={styles.tripDetailText}>Dates: {dates}</Text>
                  </View>
                )}

                {travelers && (
                  <View style={styles.tripDetail}>
                    <Ionicons name="people-outline" size={22} color={Colors.light.primary} />
                    <Text style={styles.tripDetailText}>Travelers: {travelers}</Text>
                  </View>
                )}

                {budget && (
                  <View style={styles.tripDetail}>
                    <Ionicons name="wallet-outline" size={22} color={Colors.light.primary} />
                    <Text style={styles.tripDetailText}>Budget: {budget}</Text>
                  </View>
                )}
              </>
            )}

            <View style={styles.highlightsSection}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              <View style={styles.highlightsGrid}>
                <View style={styles.highlightItem}>
                  <Ionicons name="bed-outline" size={28} color={Colors.light.primary} />
                  <Text style={styles.highlightText}>Accommodations</Text>
                </View>
                <View style={styles.highlightItem}>
                  <Ionicons name="restaurant-outline" size={28} color={Colors.light.primary} />
                  <Text style={styles.highlightText}>Dining</Text>
                </View>
                <View style={styles.highlightItem}>
                  <Ionicons name="compass-outline" size={28} color={Colors.light.primary} />
                  <Text style={styles.highlightText}>Activities</Text>
                </View>
                <View style={styles.highlightItem}>
                  <Ionicons name="map-outline" size={28} color={Colors.light.primary} />
                  <Text style={styles.highlightText}>Attractions</Text>
                </View>
              </View>
            </View>

            <Pressable 
              style={({ pressed }) => [
                styles.bookButton,
                { 
                  backgroundColor: pressed ? Colors.light.darkPrimary : Colors.light.primary,
                  transform: [{ scale: pressed ? 0.98 : 1 }]
                }
              ]}
              onPress={() => alert(`Booking trip to ${destination}!`)}
            >
              <Text style={styles.bookButtonText}>Book This Trip</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    backgroundColor: Colors.light.background,
  },
  contentWrapper: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50, // Extra padding for status bar
    paddingBottom: 15,
    marginTop: 100,

  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  destinationImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  destinationTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.darkGray,
  },
  tripDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: Colors.light.white,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: Colors.light.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tripDetailText: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 10,
  },
  highlightsSection: {
    marginTop: 10,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  highlightItem: {
    width: '48%',
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: Colors.light.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  highlightText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.light.text,
    textAlign: 'center',
  },
  bookButton: {
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    elevation: 3,
    shadowColor: Colors.light.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bookButtonText: {
    color: Colors.light.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});