import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme() || 'light';
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: Colors[colorScheme].background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors[colorScheme].text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: Colors[colorScheme].darkGray,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text style={styles.title}>This screen does not exist.</Text>
      <Text style={styles.subtitle}>The page you are looking for can not be found.</Text>
    </View>
  );
}