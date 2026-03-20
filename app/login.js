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
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { width } = useWindowDimensions();
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
    Lexend_900Black,
  });

  useFocusEffect(
    useCallback(() => {
      setUsername('');
      setPassword('');
      setUsernameError(false);
      setPasswordError(false);
      setShowPassword(false);
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

  const handleLogin = () => {
    let isValid = true;
    if (username.trim() === '') {
      setUsernameError(true);
      isValid = false;
    }
    if (password.trim() === '') {
      setPasswordError(true);
      isValid = false;
    }

    if (isValid) {
      router.replace('/home');
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

          <Text style={styles.instructionText}>Please enter your credentials</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, usernameError && styles.inputError]}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setUsernameError(false);
              }}
              placeholderTextColor="#94a3b8"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, { paddingRight: 60 }, passwordError && styles.inputError]}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError(false); 
                }}
                secureTextEntry={!showPassword}
                placeholderTextColor="#94a3b8"
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={28} 
                  color="#94a3b8" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.loginButton} 
            activeOpacity={0.8}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
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
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 80, 
    alignItems: 'center', 
    width: '100%', 
    marginBottom: 30 
  },
  logoImage: { 
    width: 240, // Slightly reduced width to prevent crowding
    height: 140 
  },
  instructionText: { color: '#fff', fontSize: 25, fontFamily: 'Lexend_400Regular', marginTop: 10, marginBottom: 20, textAlign: 'center' },
  inputGroup: { width: '100%', marginBottom: 25 },
  label: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_700Bold', marginBottom: 10 },
  passwordWrapper: { width: '100%', position: 'relative' },
  input: { backgroundColor: '#fff', width: '100%', height: 70, borderRadius: 15, paddingHorizontal: 20, fontSize: 24, color: '#000', fontFamily: 'Lexend_400Regular', borderWidth: 2, borderColor: 'transparent' },
  inputError: { backgroundColor: '#FDAFAF', borderColor: '#e63946' },
  eyeIcon: { position: 'absolute', right: 20, height: '100%', justifyContent: 'center', alignItems: 'center' },
  loginButton: { backgroundColor: '#1DA1D9', width: '70%', paddingVertical: 18, borderRadius: 15, alignItems: 'center', marginTop: 20, marginBottom: 30 },
  buttonText: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_700Bold' },
  forgotText: { color: '#fff', fontSize: 25, fontFamily: 'Lexend_400Regular', opacity: 0.9, textDecorationLine: 'underline' },
});