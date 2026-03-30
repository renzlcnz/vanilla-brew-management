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

      {/* MODAL: LOGOUT CONFIRMATION */}
      <Modal animationType="fade" transparent={true} visible={logoutVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Log Out?</Text>
            
            <Text style={styles.modalSubtitle}>
              Are you sure you want to{"\n"}
              <Text style={styles.bold}>Log Out?</Text>
            </Text>

            <TouchableOpacity style={styles.buttonConfirm} onPress={handleConfirmLogout}>
              <Text style={styles.buttonConfirmText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonReturn} onPress={() => setLogoutVisible(false)}>
              <Text style={styles.buttonReturnText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image 
            source={require('../assets/images/company-logo.png')} 
            style={styles.logoCompany} 
            resizeMode="contain" 
          />
          <Image 
            source={require('../assets/images/sms-logo.png')} 
            style={styles.logoSms} 
            resizeMode="contain" 
          />
        </View>

        <TouchableOpacity style={styles.headerLogout} onPress={() => setLogoutVisible(true)}>
          <Ionicons name="log-out-outline" size={35} color="#fff" />
          <Text style={styles.headerLogoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* MAIN CONTENT AREA */}
      <View style={styles.contentArea}>
        
        <TouchableOpacity 
          style={styles.cardSales} 
          activeOpacity={0.7}
          onPress={() => router.push('/sales')}
        >
          <Ionicons name="play-outline" size={60} color="#fff" />
          <Text style={styles.cardSalesText}>Sales</Text>
        </TouchableOpacity>

        <View style={styles.columnActions}>
          <TouchableOpacity 
            style={styles.buttonAction}
            onPress={() => router.push('/help')}
          >
            <Ionicons name="help-circle-outline" size={40} color="#fff" />
            <Text style={styles.buttonActionText}>Help</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonAction}
            onPress={() => router.push('/about')}
          >
            <Ionicons name="information-circle-outline" size={40} color="#fff" />
            <Text style={styles.buttonActionText}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonAction}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={40} color="#fff" />
            <Text style={styles.buttonActionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Global & Layout
  container: { flex: 1, backgroundColor: '#333333' },
  loadingContainer: { flex: 1, backgroundColor: '#333333', justifyContent: 'center', alignItems: 'center' },
  bold: { fontFamily: 'Lexend_700Bold' },

  // Header Section
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
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 40 },
  logoCompany: { width: 250, height: 120 },
  logoSms: { width: 220, height: 110 },
  headerLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 5,
  },
  headerLogoutText: { color: '#fff', fontSize: 32, fontFamily: 'Lexend_400Regular', marginLeft: 15 },

  // Content Area
  contentArea: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 60, gap: 40 },
  
  // Hero Card (Sales)
  cardSales: { backgroundColor: '#505050', width: '55%', height: '75%', borderRadius: 35, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20 },
  cardSalesText: { color: '#fff', fontSize: 80, fontFamily: 'Lexend_400Regular' },
  
  // Sidebar/Column Actions
  columnActions: { gap: 30, width: '35%', height: '75%', justifyContent: 'space-between' },
  buttonAction: { backgroundColor: '#505050', flex: 1, borderRadius: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 },
  buttonActionText: { color: '#fff', fontSize: 45, fontFamily: 'Lexend_400Regular' },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '50%', backgroundColor: '#2A2A2A', borderRadius: 30, padding: 50, alignItems: 'center', gap: 30 },
  modalTitle: { color: '#fff', fontSize: 60, fontFamily: 'Lexend_700Bold' },
  modalSubtitle: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular', textAlign: 'center', lineHeight: 45, marginBottom: 10 },
  buttonConfirm: { backgroundColor: '#1DA1D9', width: '100%', paddingVertical: 20, borderRadius: 15, alignItems: 'center' },
  buttonConfirmText: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_700Bold' },
  buttonReturn: { paddingVertical: 10 },
  buttonReturnText: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_400Regular', textDecorationLine: 'underline' },
});