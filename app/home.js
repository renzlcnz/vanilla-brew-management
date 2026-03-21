import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Lexend_400Regular,
  Lexend_700Bold,
  Lexend_900Black,
  useFonts
} from '@expo-google-fonts/lexend';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [logoutVisible, setLogoutVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
    Lexend_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DA1D9" />
      </View>
    );
  }

  const handleConfirmLogout = () => {
    setLogoutVisible(false);
    router.replace('/'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ================= MODAL: LOGOUT CONFIRMATION ================= */}
      <Modal animationType="fade" transparent={true} visible={logoutVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.logoutModalContainer}>
            <Text style={styles.logoutTitle}>Log Out?</Text>
            
            <Text style={styles.logoutSubtitle}>
              Are you sure you want to{"\n"}
              <Text style={{ fontFamily: 'Lexend_700Bold' }}>Log Out?</Text>
            </Text>

            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmLogout}>
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.returnBtn} onPress={() => setLogoutVisible(false)}>
              <Text style={styles.returnBtnText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <View style={styles.headerLeftGroup}>
          <Image 
            source={require('../assets/images/company-logo.png')} 
            style={styles.headerLogo}
            resizeMode="contain" 
          />
          <Image 
            source={require('../assets/images/sms-logo.png')} 
            style={styles.smsLogo}
            resizeMode="contain" 
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutVisible(true)}>
          <Ionicons name="log-out-outline" size={35} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* ================= MAIN CONTENT AREA ================= */}
      <View style={styles.contentArea}>
        
        <TouchableOpacity 
          style={styles.salesCard} 
          activeOpacity={0.7}
          onPress={() => router.push('/sales')}
        >
          <Ionicons name="play-outline" size={60} color="#fff" />
          <Text style={styles.salesText}>Sales</Text>
        </TouchableOpacity>

        <View style={styles.actionColumn}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/help')}
          >
            <Ionicons name="help-circle-outline" size={40} color="#fff" />
            <Text style={styles.actionButtonText}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/about')}
          >
            <Ionicons name="information-circle-outline" size={40} color="#fff" />
            <Text style={styles.actionButtonText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={40} color="#fff" />
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#333333' },
  loadingContainer: { flex: 1, backgroundColor: '#333333', justifyContent: 'center', alignItems: 'center' },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: '#202020', 
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 10,
  },
  headerLeftGroup: { flexDirection: 'row', alignItems: 'center', gap: 40 },
  headerLogo: { width: 250, height: 120 },
  smsLogo: { width: 220, height: 110 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 5,
  },
  logoutText: { color: '#fff', fontSize: 32, fontFamily: 'Lexend_400Regular', marginLeft: 15 },

  contentArea: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 60, gap: 40 },
  salesCard: { backgroundColor: '#505050', width: '55%', height: '75%', borderRadius: 35, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 },
  salesText: { color: '#fff', fontSize: 80, fontFamily: 'Lexend_400Regular' },
  actionColumn: { gap: 30, width: '35%', height: '75%', justifyContent: 'space-between' },
  actionButton: { backgroundColor: '#505050', flex: 1, borderRadius: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
  actionButtonText: { color: '#fff', fontSize: 45, fontFamily: 'Lexend_400Regular' },

  // --- LOGOUT MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModalContainer: {
    width: '50%',
    backgroundColor: '#2A2A2A',
    borderRadius: 30,
    padding: 50,
    alignItems: 'center',
    gap: 30,
  },
  logoutTitle: {
    color: '#fff',
    fontSize: 60,
    fontFamily: 'Lexend_700Bold',
  },
  logoutSubtitle: {
    color: '#fff',
    fontSize: 35,
    fontFamily: 'Lexend_400Regular',
    textAlign: 'center',
    lineHeight: 45,
    marginBottom: 10,
  },
  confirmBtn: {
    backgroundColor: '#1DA1D9',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 35,
    fontFamily: 'Lexend_700Bold',
  },
  returnBtn: {
    paddingVertical: 10,
  },
  returnBtnText: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Lexend_400Regular',
    textDecorationLine: 'underline',
  },
});