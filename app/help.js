import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    Modal, // Added Modal
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    Lexend_400Regular,
    Lexend_700Bold,
    useFonts
} from '@expo-google-fonts/lexend';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  const router = useRouter();
  
  // --- STATES ---
  const [expandedSections, setExpandedSections] = useState([]);
  const [logoutVisible, setLogoutVisible] = useState(false); // Added Logout State

  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });

  if (!fontsLoaded) return null;

  // --- HANDLERS ---
  const toggleSection = (sectionId) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  const handleConfirmLogout = () => {
    setLogoutVisible(false);
    router.replace('/'); 
  };

  const InstructionItem = ({ title, sectionId, content }) => {
    const isExpanded = expandedSections.includes(sectionId);
    return (
      <View style={styles.accordionWrapper}>
        <TouchableOpacity 
          style={styles.instructionBtn} 
          onPress={() => toggleSection(sectionId)}
          activeOpacity={0.7}
        >
          <Text style={styles.instructionBtnText}>{title}</Text>
          <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.contentBox}>
            <Text style={styles.contentText}>{content}</Text>
          </View>
        )}
      </View>
    );
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

        {/* Updated to trigger modal */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutVisible(true)}>
          <Ionicons name="log-out-outline" size={35} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* ================= MAIN CONTENT AREA ================= */}
      <View style={styles.contentArea}>
        <View style={styles.breadcrumbBar}>
          <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
            <Ionicons name="return-up-back" size={40} color="#fff" />
          </TouchableOpacity>
          <View style={styles.helpLabel}>
            <Ionicons name="help-circle-outline" size={40} color="#fff" />
            <Text style={styles.helpLabelText}>Help</Text>
          </View>
        </View>

        <Text style={styles.selectText}>Select Instruction</Text>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={true}
        >
          <InstructionItem 
            title="How to make a Sales" 
            sectionId="sales"
            content="1. Go to Sales module.&#10;2. Select Order Mode (Dine In/Take Out).&#10;3. Add products to cart.&#10;4. Click Complete Order then Proceed to Payment.&#10;5. Enter amount and confirm."
          />
          <InstructionItem 
            title="How to change Account Credentials" 
            sectionId="creds"
            content="To change your password or username, please navigate to the Settings tab from the main menu or contact the system administrator if the fields are locked.&#10;&#10;Updating credentials regularly ensures the security of your Shop Management System."
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#333333' },
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
    marginRight: 10,
  },
  logoutText: { color: '#fff', fontSize: 32, fontFamily: 'Lexend_400Regular', marginLeft: 15 },
  contentArea: { flex: 1, paddingHorizontal: 60, paddingTop: 40 },
  breadcrumbBar: { flexDirection: 'row', gap: 20, marginBottom: 30 },
  backArrow: { backgroundColor: '#505050', padding: 15, borderRadius: 15, justifyContent: 'center' },
  helpLabel: { flex: 1, backgroundColor: '#505050', borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, gap: 15 },
  helpLabelText: { color: '#fff', fontSize: 45, fontFamily: 'Lexend_400Regular' },
  selectText: { color: '#fff', fontSize: 55, fontFamily: 'Lexend_700Bold', marginBottom: 25 },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 100 },
  accordionWrapper: { marginBottom: 15 },
  instructionBtn: { backgroundColor: '#454545', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 30, borderRadius: 20 },
  instructionBtnText: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular' },
  contentBox: { backgroundColor: '#383838', padding: 30, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginTop: -10, zIndex: -1 },
  contentText: { color: '#ddd', fontSize: 26, fontFamily: 'Lexend_400Regular', lineHeight: 40 },

  // --- LOGOUT MODAL STYLES ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  logoutModalContainer: { width: '50%', backgroundColor: '#2A2A2A', borderRadius: 30, padding: 50, alignItems: 'center', gap: 30 },
  logoutTitle: { color: '#fff', fontSize: 60, fontFamily: 'Lexend_700Bold' },
  logoutSubtitle: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular', textAlign: 'center', lineHeight: 45, marginBottom: 10 },
  confirmBtn: { backgroundColor: '#1DA1D9', width: '100%', paddingVertical: 20, borderRadius: 15, alignItems: 'center' },
  confirmBtnText: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_700Bold' },
  returnBtn: { paddingVertical: 10 },
  returnBtnText: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_400Regular', textDecorationLine: 'underline' },
});