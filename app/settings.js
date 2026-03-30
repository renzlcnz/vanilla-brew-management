import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Lexend_400Regular,
  Lexend_700Bold,
  useFonts
} from '@expo-google-fonts/lexend';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const router = useRouter();
  
  // --- STATES ---
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [passkeyVisible, setPasskeyVisible] = useState(false); 
  const [successVisible, setSuccessVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['accountDetails']); 

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('The Admin');
  const [email, setEmail] = useState('admingm@gmail.com');
  const [password, setPassword] = useState('adminpassword!!');
  const [adminPasskey, setAdminPasskey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [systemTheme, setSystemTheme] = useState('Winter Theme');

  // --- REFS ---
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const passkeyInputRef = useRef(null);

  let [fontsLoaded] = useFonts({ Lexend_400Regular, Lexend_700Bold });
  if (!fontsLoaded) return null;

  // --- HANDLERS ---
  const handleConfirmLogout = () => {
    setLogoutVisible(false);
    router.replace('/'); 
  };

  const handleActionButton = () => {
    isEditing ? setPasskeyVisible(true) : setIsEditing(true);
  };

  const handleFinalVerify = () => {
    setPasskeyVisible(false);
    setAdminPasskey('');
    setSuccessVisible(true);
  };

  const handleSuccessReturn = () => {
    setSuccessVisible(false);
    setIsEditing(false);
  };

  const toggleSection = (sectionId) => {
    expandedSections.includes(sectionId)
      ? setExpandedSections(expandedSections.filter(id => id !== sectionId))
      : setExpandedSections([...expandedSections, sectionId]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* MODAL: LOGOUT */}
      <Modal animationType="fade" transparent visible={logoutVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainerSmall}>
            <Text style={styles.modalTitleLarge}>Log Out?</Text>
            <Text style={styles.modalSubtitleMedium}>
              Are you sure you want to{"\n"}
              <Text style={styles.bold}>Log Out?</Text>
            </Text>
            <TouchableOpacity style={styles.buttonBlue} onPress={handleConfirmLogout}>
              <Text style={styles.buttonTextBold}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLink} onPress={() => setLogoutVisible(false)}>
              <Text style={styles.buttonLinkText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: VERIFICATION */}
      <Modal animationType="fade" transparent visible={passkeyVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainerLarge}>
            <Text style={styles.modalTitleMedium}>Verification</Text>
            <Text style={styles.modalSubtitleLarge}>
              To <Text style={styles.bold}>Save</Text> the <Text style={styles.bold}>Changes</Text>, please enter a valid <Text style={styles.bold}>Admin Passkey.</Text>
            </Text>
            <TextInput
              ref={passkeyInputRef}
              style={styles.inputVerification}
              value={adminPasskey}
              onChangeText={setAdminPasskey}
              secureTextEntry
            />
            <TouchableOpacity style={styles.buttonBlue} onPress={handleFinalVerify}>
              <Text style={styles.buttonTextBold}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLink} onPress={() => setPasskeyVisible(false)}>
              <Text style={styles.buttonLinkText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: SUCCESS */}
      <Modal animationType="fade" transparent visible={successVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainerLarge}>
            <Text style={styles.modalTitleLarge}>Changes Saved!</Text>
            <Text style={styles.modalSubtitleLarge}>All Changes have been{"\n"}saved</Text>
            <TouchableOpacity style={styles.buttonDark} onPress={handleSuccessReturn}>
              <Text style={styles.buttonTextRegular}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerBrand}>
          <Image source={require('../assets/images/company-logo.png')} style={styles.logoCompany} resizeMode="contain" />
          <Image source={require('../assets/images/sms-logo.png')} style={styles.logoSms} resizeMode="contain" />
        </View>
        <TouchableOpacity style={styles.headerLogout} onPress={() => setLogoutVisible(true)}>
          <Ionicons name="log-out-outline" size={35} color="#fff" />
          <Text style={styles.headerLogoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.mainContent}>
        <View style={styles.breadcrumb}>
          <TouchableOpacity style={styles.breadcrumbBack} onPress={() => router.back()}>
            <Ionicons name="return-up-back" size={40} color="#fff" />
          </TouchableOpacity>
          <View style={styles.breadcrumbLabel}>
            <Ionicons name="settings-outline" size={40} color="#fff" />
            <Text style={styles.breadcrumbText}>Settings</Text>
          </View>
        </View>

        <Text style={styles.pageHeading}>Select Action</Text>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.accordion}>
            <TouchableOpacity 
              style={[styles.accordionHeader, expandedSections.includes('accountDetails') && styles.accordionHeaderOpen]} 
              onPress={() => toggleSection('accountDetails')}
            >
              <Text style={styles.accordionTitle}>Change Account Details</Text>
              <Ionicons name={expandedSections.includes('accountDetails') ? "chevron-up" : "chevron-down"} size={35} color="#fff" />
            </TouchableOpacity>

            {expandedSections.includes('accountDetails') && (
              <View style={styles.accordionBody}>
                <View style={styles.formRow}>
                  <Text style={styles.formLabel}>Name</Text>
                  <Pressable style={[styles.inputPill, !isEditing && styles.inputPillDisabled]} onPress={() => isEditing && nameInputRef.current?.focus()}>
                    <TextInput ref={nameInputRef} style={styles.inputText} value={name} onChangeText={setName} editable={isEditing} />
                  </Pressable>
                </View>

                <View style={styles.formRow}>
                  <Text style={styles.formLabel}>Email</Text>
                  <Pressable style={[styles.inputPill, !isEditing && styles.inputPillDisabled]} onPress={() => isEditing && emailInputRef.current?.focus()}>
                    <TextInput ref={emailInputRef} style={styles.inputText} value={email} onChangeText={setEmail} editable={isEditing} />
                  </Pressable>
                </View>

                <View style={styles.formRow}>
                  <Text style={styles.formLabel}>Password</Text>
                  <Pressable style={[styles.inputPill, !isEditing && styles.inputPillDisabled]} onPress={() => isEditing && passwordInputRef.current?.focus()}>
                    <TextInput ref={passwordInputRef} style={[styles.inputText, { flex: 1 }]} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} editable={isEditing} />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}><Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={30} color="#000" /></TouchableOpacity>
                  </Pressable>
                </View>

                <TouchableOpacity style={styles.buttonAction} onPress={handleActionButton}>
                  <Text style={styles.buttonTextRegular}>{isEditing ? "Save" : "Edit"}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.accordion}>
            <TouchableOpacity 
              style={[styles.accordionHeader, expandedSections.includes('appearance') && styles.accordionHeaderOpen]} 
              onPress={() => toggleSection('appearance')}
            >
              <Text style={styles.accordionTitle}>Change System Appearance</Text>
              <Ionicons name={expandedSections.includes('appearance') ? "chevron-up" : "chevron-down"} size={35} color="#fff" />
            </TouchableOpacity>

            {expandedSections.includes('appearance') && (
              <View style={styles.accordionBody}>
                <View style={styles.formRow}>
                  <Text style={styles.formLabel}>System Colors</Text>
                  <TouchableOpacity style={styles.inputPill} activeOpacity={0.8}>
                    <Text style={styles.inputText}>{systemTheme}</Text>
                    <Ionicons name="chevron-down" size={24} color="black"/>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.buttonBlueSmall} onPress={() => setSuccessVisible(true)}>
                  <Text style={styles.buttonTextBold}>Save</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

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
    elevation: 10 
  },
  headerBrand: { flexDirection: 'row', alignItems: 'center', gap: 40 },
  logoCompany: { width: 250, height: 120 },
  logoSms: { width: 220, height: 110 },
  headerLogout: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#fff', paddingBottom: 5 },
  headerLogoutText: { color: '#fff', fontSize: 32, fontFamily: 'Lexend_400Regular', marginLeft: 15 },

  // Main Content Area
  mainContent: { flex: 1, paddingHorizontal: 60, paddingTop: 40 },
  pageHeading: { color: '#fff', fontSize: 55, fontFamily: 'Lexend_700Bold', marginBottom: 25 },
  
  // Breadcrumb
  breadcrumb: { flexDirection: 'row', gap: 20, marginBottom: 30 },
  breadcrumbBack: { backgroundColor: '#505050', padding: 15, borderRadius: 15, justifyContent: 'center' },
  breadcrumbLabel: { flex: 1, backgroundColor: '#505050', borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, gap: 15 },
  breadcrumbText: { color: '#fff', fontSize: 45, fontFamily: 'Lexend_400Regular' },

  // Accordion Section
  accordion: { marginBottom: 15 },
  accordionHeader: { 
    backgroundColor: '#505050', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 25, 
    borderRadius: 20 
  },
  accordionHeaderOpen: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  accordionTitle: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular' },
  accordionBody: { 
    backgroundColor: '#505050', 
    paddingHorizontal: 40, 
    paddingBottom: 30, 
    borderBottomLeftRadius: 20, 
    borderBottomRightRadius: 20 
  },

  // Forms & Inputs
  formRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  formLabel: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular', width: 300 },
  inputPill: { 
    flex: 1, 
    backgroundColor: '#fff', 
    height: 60, 
    borderRadius: 30, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20 
  },
  inputPillDisabled: { backgroundColor: '#e2e8f0' },
  inputText: { 
    flex: 1, 
    height: '100%', 
    fontSize: 28, 
    color: '#000', 
    fontFamily: 'Lexend_400Regular', 
    textAlign: 'center' 
  },

  // Buttons
  buttonAction: { backgroundColor: '#333333', paddingVertical: 12, width: 250, borderRadius: 30, alignSelf: 'center', marginTop: 15, justifyContent: 'center', alignItems: 'center' },
  buttonBlueSmall: { backgroundColor: '#1DA1D9', paddingVertical: 12, width: 300, borderRadius: 15, alignSelf: 'center', marginTop: 15, justifyContent: 'center', alignItems: 'center' },
  buttonBlue: { backgroundColor: '#1DA1D9', width: '90%', paddingVertical: 25, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  buttonDark: { backgroundColor: '#505050', paddingVertical: 15, width: 350, borderRadius: 15, alignItems: 'center' },
  buttonTextRegular: { color: '#fff', fontSize: 32, textAlign: 'center', fontFamily: 'Lexend_400Regular' },
  buttonTextBold: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_700Bold', textAlign: 'center' },
  buttonLink: { paddingVertical: 10 },
  buttonLinkText: { color: '#fff', fontSize: 40, textDecorationLine: 'underline', fontFamily: 'Lexend_400Regular', textAlign: 'center' },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContainerSmall: { width: '50%', backgroundColor: '#2A2A2A', borderRadius: 30, padding: 50, alignItems: 'center', gap: 30 },
  modalContainerLarge: { width: '70%', backgroundColor: '#2A2A2A', borderRadius: 30, padding: 60, alignItems: 'center', gap: 30 },
  modalTitleLarge: { color: '#fff', fontSize: 75, fontFamily: 'Lexend_700Bold', textAlign: 'center' },
  modalTitleMedium: { color: '#fff', fontSize: 65, fontFamily: 'Lexend_400Regular', textAlign: 'center' },
  modalSubtitleLarge: { color: '#fff', fontSize: 45, textAlign: 'center', fontFamily: 'Lexend_400Regular', lineHeight: 55 },
  modalSubtitleMedium: { color: '#fff', fontSize: 35, textAlign: 'center' },
  inputVerification: { backgroundColor: '#fff', width: '90%', height: 120, borderRadius: 15, fontSize: 50, textAlign: 'center', fontFamily: 'Lexend_400Regular', marginTop: 20 },
});