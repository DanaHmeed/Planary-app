import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  const router = useRouter();
  
  // Sample saved destinations
  const savedDestinations = [
    {
      id: '1',
      name: 'Rome',
      date: 'June 2025',
      image: require('../../assets/images/rome.jpg'),
    },
    {
      id: '2',
      name: 'Kyoto',
      date: 'October 2025',
      image: require('../../assets/images/kyoto.jpg'),
    }
  ];

  const renderSavedDestination = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.destinationCard,
        { 
          opacity: pressed ? 0.8 : 1,
          backgroundColor: pressed ? Colors.light.lightGray : Colors.light.white 
        }
      ]}
      onPress={() => router.push({
        pathname: '/destination-details',
        params: { 
          name: item.name,
          date: item.date,
          image: item.image
        }
      })}
    >
      <Image
        source={item.image}
        style={styles.destinationImage}
        resizeMode="cover"
      />
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationName}>{item.name}</Text>
        <Text style={styles.destinationDate}>Planned: {item.date}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.light.primary }]} edges={['right', 'bottom', 'left']}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Text style={[styles.headerTitle,{ fontFamily: 'Gendy' }]}>Your Travel Plans</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require('../../assets/images/profile.jpg')}
          style={styles.profileImage}
        />
        <Text style={[styles.profileName,{ fontFamily: 'Gendy' }]}>Travel Enthusiast</Text>
        <Text style={[styles.profileInfo,{ fontFamily: 'Gendy' }]}>2 Trips Planned</Text>
      </View>

      <View style={styles.savedSection}>
        <Text style={[styles.sectionTitle,{ fontFamily: 'Gendy' }]}>Your Saved Destinations</Text>
        
        {savedDestinations.length > 0 ? (
          <FlatList
            data={savedDestinations}
            renderItem={renderSavedDestination}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="sad-outline" size={40} color={Colors.light.gray} />
            <Text style={styles.emptyStateText}>No destinations saved yet</Text>
            <Text style={styles.emptyStateSubtext}>Start planning your next adventure!</Text>
          </View>
        )}
      </View>

      <Pressable 
        style={({ pressed }) => [
          styles.addButton,
          { 
            backgroundColor: pressed ? Colors.light.darkPrimary : Colors.light.primary,
            transform: [{ scale: pressed ? 0.98 : 1 }]
          }
        ]}
        onPress={() => router.push('/destination-input')}
      >
        <Ionicons name="add" size={20} color={Colors.light.white} />
        <Text style={[styles.addButtonText,{ fontFamily: 'Gendy' }]}>Plan New Trip</Text>
      </Pressable>
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
    backgroundColor: Colors.light.primary,
    elevation: 2,
    shadowColor: Colors.light.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.white,
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.lightGray,
    backgroundColor: Colors.light.white,
    marginBottom: 10,
    elevation: 1,
    shadowColor: Colors.light.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: Colors.light.primary,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 5,
  },
  profileInfo: {
    fontSize: 16,
    color: Colors.light.darkGray,
  },
  savedSection: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 90,
  },
  destinationCard: {
    backgroundColor: Colors.light.white,
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: Colors.light.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  destinationImage: {
    width: 100,
    height: 100,
  },
  destinationInfo: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 5,
  },
  destinationDate: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: Colors.light.text,
    marginTop: 15,
    fontWeight: '600',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.light.gray,
    marginTop: 5,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: Colors.light.primary,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    elevation: 5,
    shadowColor: Colors.light.dark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  addButtonText: {
    color: Colors.light.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign:'center',
  },
});