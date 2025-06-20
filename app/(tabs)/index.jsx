import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Button pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={require('@/assets/images/ss.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header Section */}
          <Animated.View 
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Dream</Text>
              <Text style={[styles.title, styles.titleAccent]}>Journey</Text>
            </View>
            <Text style={styles.subtitle}>Your Next Adventure</Text>
          </Animated.View>

          {/* CTA Section - Moved to middle */}
          <Animated.View 
            style={[
              styles.ctaSection,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Animated.View
              style={[
                styles.buttonContainer,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.mainButton,
                  { 
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  }
                ]}
                onPress={() => router.push('/destination-input')}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Explore</Text>
                  <View style={styles.buttonIcon}>
                    <Ionicons name="arrow-forward" size={18} color="white" />
                  </View>
                </View>
              </Pressable>
            </Animated.View>

            <Text style={styles.ctaSubtext}>
              Start your journey
            </Text>
          </Animated.View>

          {/* Spacer to push content up and leave space for bottom map */}
          <View style={styles.bottomSpacer} />
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    flex: 0.4, // Reduced from flex: 1
    justifyContent: 'center',
    marginTop: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: width * 0.08, // Slightly smaller
    fontWeight: '900',
    color: 'white',
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleAccent: {
    color: '#FFFFFF',
    marginLeft: 8,
    opacity: 0.9,
  },
  subtitle: {
    fontSize: 16, // Reduced from 18
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ctaSection: {
    alignItems: 'center',
    flex: 0.3, // Fixed size for middle positioning
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 16, // Reduced spacing
  },
  mainButton: {
    borderRadius: 25, // More rounded
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    backgroundColor: 'rgba(115, 148, 107, 0.95)', // Changed to green with transparency
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14, // Reduced padding
    paddingHorizontal: 32, // Reduced padding
    borderRadius: 25,
    minWidth: width * 0.5, // Smaller button
  },
  buttonText: {
    color: 'white', // Changed to white
    fontSize: 16, // Reduced font size
    fontWeight: '600',
    marginRight: 8,
    letterSpacing: 0.5,
  },
  buttonIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // White with transparency
    borderRadius: 15,
    padding: 4,
  },
  ctaSubtext: {
    color: 'rgba(255, 255, 255, 0.8)', // Slightly more transparent
    fontSize: 12, // Reduced from 14
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomSpacer: {
    flex: 0.3, // Space for the bottom map area
  },
});