import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Lexend_400Regular,
  Lexend_700Bold,
  useFonts
} from '@expo-google-fonts/lexend';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  const router = useRouter();
  
  // --- STATES ---
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState([]);

  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
    Lexend_700Bold,
  });

  if (!fontsLoaded) return null;

  // --- HANDLERS ---
  const handleConfirmLogout = () => {
    setLogoutVisible(false);
    router.replace('/'); 
  };

  const toggleSection = (sectionId) => {
    expandedSections.includes(sectionId)
      ? setExpandedSections(expandedSections.filter(id => id !== sectionId))
      : setExpandedSections([...expandedSections, sectionId]);
  };

  // --- COMPONENTS ---
  const AccordionItem = ({ title, sectionId, content }) => {
    const isExpanded = expandedSections.includes(sectionId);
    return (
      <View style={styles.accordionWrapper}>
        <TouchableOpacity 
          style={[styles.accordionBtn, isExpanded && styles.accordionBtnOpen]} 
          onPress={() => toggleSection(sectionId)}
          activeOpacity={0.7}
        >
          <Text style={styles.accordionBtnText}>{title}</Text>
          <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={35} color="#fff" />
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

      {/* MODAL: LOGOUT CONFIRMATION */}
      <Modal animationType="fade" transparent={true} visible={logoutVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Log Out?</Text>
            <Text style={styles.modalSubtitle}>
              Are you sure you want to{"\n"}
              <Text style={styles.bold}>Log Out?</Text>
            </Text>
            <TouchableOpacity style={styles.buttonBlue} onPress={handleConfirmLogout}>
              <Text style={styles.buttonBlueText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLink} onPress={() => setLogoutVisible(false)}>
              <Text style={styles.buttonLinkText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerBrand}>
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
      <View style={styles.mainContent}>
        <View style={styles.breadcrumb}>
          <TouchableOpacity style={styles.breadcrumbBack} onPress={() => router.back()}>
            <Ionicons name="return-up-back" size={40} color="#fff" />
          </TouchableOpacity>
          <View style={styles.breadcrumbLabel}>
            <Ionicons name="information-circle-outline" size={40} color="#fff" />
            <Text style={styles.breadcrumbText}>About</Text>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={true}
        >
          <AccordionItem 
            title="System Specification" 
            sectionId="systemSpec"
            content="Detailed technical specifications of the Shop Management System."
          />
          <AccordionItem 
            title="Company Profile" 
            sectionId="companyProfile"
            content="Information regarding Vanilla Brew and its mission."
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Global Layout
  container: { flex: 1, backgroundColor: '#333333' },
  bold: { fontFamily: 'Lexend_700Bold' },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 100 },

  // Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingVertical: 50,
    backgroundColor: '#202020', 
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 10,
  },
  headerBrand: { flexDirection: 'row', alignItems: 'center', gap: 40 },
  logoCompany: { width: 250, height: 120 },
  logoSms: { width: 220, height: 110 },
  headerLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 5,
    marginRight: 10,
  },
  headerLogoutText: { color: '#fff', fontSize: 32, fontFamily: 'Lexend_400Regular', marginLeft: 15 },
  
  // Main Content Area
  mainContent: { flex: 1, paddingHorizontal: 60, paddingTop: 40 },
  breadcrumb: { flexDirection: 'row', gap: 20, marginBottom: 30 },
  breadcrumbBack: { backgroundColor: '#505050', padding: 15, borderRadius: 15, justifyContent: 'center' },
  breadcrumbLabel: { flex: 1, backgroundColor: '#505050', borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, gap: 15 },
  breadcrumbText: { color: '#fff', fontSize: 45, fontFamily: 'Lexend_400Regular' },
  
  // Accordion Section
  accordionWrapper: { marginBottom: 15 },
  accordionBtn: { 
    backgroundColor: '#454545', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 30, 
    borderRadius: 20 
  },
  accordionBtnOpen: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  accordionBtnText: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular' },
  contentBox: { 
    backgroundColor: '#383838', 
    padding: 30, 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20, 
    marginTop: -10, 
    zIndex: -1 
  },
  contentText: { color: '#ddd', fontSize: 26, fontFamily: 'Lexend_400Regular', lineHeight: 40 },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '50%', backgroundColor: '#2A2A2A', borderRadius: 30, padding: 50, alignItems: 'center', gap: 30 },
  modalTitle: { color: '#fff', fontSize: 60, fontFamily: 'Lexend_700Bold' },
  modalSubtitle: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular', textAlign: 'center', lineHeight: 45, marginBottom: 10 },
  
  // Modal Buttons
  buttonBlue: { backgroundColor: '#1DA1D9', width: '100%', paddingVertical: 20, borderRadius: 15, alignItems: 'center' },
  buttonBlueText: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_700Bold' },
  buttonLink: { paddingVertical: 10 },
  buttonLinkText: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_400Regular', textDecorationLine: 'underline' },
});