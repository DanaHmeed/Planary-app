import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { StatusBar } from 'expo-status-bar';

// Sample data for popular destinations
const popularDestinations = [
  {
    id: '4',
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1000',
    description: 'The city that never sleeps',
  },
  {
    id: '1',
    name: 'Bali',
    image: 'https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&q=80&w=1000',
    description: 'Island paradise with beaches and temples',
  },
  {
    id: '2',
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
    description: 'City of love and iconic architecture',
  },
  {
    id: '3',
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000',
    description: 'Modern metropolis with rich traditions',
  },
];

export default function ExploreScreen() {
  const router = useRouter();

  const renderDestinationItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.destinationCard,
        { opacity: pressed ? 0.8 : 1 }
      ]}
      onPress={() => router.push({
        pathname: '/destination-details',
        params: { 
          destination: item.name,
          description: item.description,
          imageUrl: item.image
        }
      })}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.destinationImage}
        resizeMode="cover"
      />
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationDescription}>{item.description}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.light.primary }]} edges={['right', 'bottom', 'left']}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { fontFamily: 'Gendy' }]}>Explore Destinations</Text>
        <Text style={[styles.headerSubtitle, { fontFamily: 'Gendy' }]}>
          Tap on a destination to see details
        </Text>
      </View>

      <View style={styles.popularSection}>
        <Text style={[styles.sectionTitle, { fontFamily: 'Gendy' }]}>Popular Destinations</Text>
        <FlatList
          data={popularDestinations}
          renderItem={renderDestinationItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 50, // Adjust based on status bar height
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.light.lightGray,
  },
  popularSection: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.light.text,
  },
  listContainer: {
    paddingBottom: 20,
  },
  destinationCard: {
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  destinationImage: {
    width: '100%',
    height: 150,
  },
  destinationInfo: {
    padding: 15,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 5,
  },
  destinationDescription: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
});