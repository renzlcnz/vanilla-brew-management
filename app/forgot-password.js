import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import {
  Lexend_400Regular,
  Lexend_700Bold,
  Lexend_900Black,
  useFonts
} from '@expo-google-fonts/lexend';

export default function ForgotPasswordScreen() {
  const [passkey, setPasskey] = useState('');
  const [passkeyError, setPasskeyError] = useState(false);
  
  const { width } = useWindowDimensions();
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
    Lexend_900Black,
  });

  useFocusEffect(
    useCallback(() => {
      setPasskey('');
      setPasskeyError(false);
    }, [])
  );

  const isTablet = width > 600;

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DA1D9" />
      </View>
    );
  }

  const handleEnter = () => {
    if (passkey.trim() === '') {
      setPasskeyError(true);
    } else {
      console.log('Passkey entered:', passkey);
      // Logic for password reset goes here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={[styles.loginCard, isTablet && styles.tabletCard]}>
          <View style={styles.headerRow}>
            <Image 
              source={require('../assets/images/company-logo.png')} 
              style={styles.logoImage}
              resizeMode="contain" 
            />
            <Image 
              source={require('../assets/images/sms-logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.instructionTitle}>Enter a valid Admin Passkey</Text>
          <Text style={styles.instructionSub}>
            Please ask for your administrator to enter their Passkey for authorization to reset your password.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Admin Passkey</Text>
            <TextInput
              style={[styles.input, passkeyError && styles.inputError]}
              value={passkey}
              onChangeText={(text) => {
                setPasskey(text);
                setPasskeyError(false);
              }}
              secureTextEntry
              placeholderTextColor="#94a3b8"
            />
          </View>

          <TouchableOpacity 
            style={styles.enterButton} 
            activeOpacity={0.8}
            onPress={handleEnter}
          >
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#202020' },
  loadingContainer: { flex: 1, backgroundColor: '#202020', justifyContent: 'center', alignItems: 'center' },
  keyboardView: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loginCard: { backgroundColor: '#2a2a2a', borderRadius: 30, padding: 40, width: '100%', maxWidth: 500, alignItems: 'center', borderWidth: 1, borderColor: '#333', elevation: 10 },
  tabletCard: { maxWidth: 700, padding: 60 },
  headerRow: { flexDirection: 'row', justifyContent: 'center', gap: 150, alignItems: 'center', width: '100%', marginBottom: 40 },
  logoImage: { width: 230, height: 130 },
  instructionTitle: { color: '#fff', fontSize: 25, fontFamily: 'Lexend_700Bold', textAlign: 'center', marginBottom: 10 },
  instructionSub: { color: '#fff', fontSize: 25, fontFamily: 'Lexend_400Regular', textAlign: 'center', marginBottom: 30, paddingHorizontal: 10, lineHeight: 35 },
  inputGroup: { width: '100%', marginBottom: 25 },
  label: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_700Bold', marginBottom: 10 },
  input: { backgroundColor: '#fff', width: '100%', height: 70, borderRadius: 15, paddingHorizontal: 20, fontSize: 24, color: '#000', fontFamily: 'Lexend_400Regular', borderWidth: 2, borderColor: 'transparent' },
  inputError: { backgroundColor: '#FDAFAF', borderColor: '#e63946' },
  enterButton: { backgroundColor: '#1DA1D9', width: '50%', paddingVertical: 18, borderRadius: 15, alignItems: 'center', marginTop: 10, marginBottom: 30 },
  buttonText: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_700Bold' },
  goBackText: { color: '#fff', fontSize: 22, fontFamily: 'Lexend_700Bold', opacity: 0.9 },
});