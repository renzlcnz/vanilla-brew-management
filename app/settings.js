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
  const [successVisible, setSuccessVisible] = useState(false); // Success Modal State
  const [expandedSections, setExpandedSections] = useState(['accountDetails']); 

  const [isEditing, setIsEditing] = useState(false);

  // User Data
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

  const handleActionButton = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      setPasskeyVisible(true);
    }
  };

  const handleFinalVerify = () => {
    // 1. Close the verification box
    setPasskeyVisible(false);
    setAdminPasskey('');
    // 2. Show the Success message
    setSuccessVisible(true);
  };

  const handleSuccessReturn = () => {
    setSuccessVisible(false);
    setIsEditing(false); // Lock the fields again
  };

  const toggleSection = (sectionId) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
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

      {/* ================= MODAL: VERIFICATION ================= */}
      <Modal animationType="fade" transparent={true} visible={passkeyVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.verifyModalContainer}>
            <Text style={styles.verifyTitle}>Verification</Text>
            <Text style={styles.verifySubtitle}>
              To <Text style={{ fontFamily: 'Lexend_700Bold' }}>Save</Text> the <Text style={{ fontFamily: 'Lexend_700Bold' }}>Changes</Text>, please enter a valid <Text style={{ fontFamily: 'Lexend_700Bold' }}>Admin Passkey.</Text>
            </Text>

            <TextInput
              ref={passkeyInputRef}
              style={styles.passkeyInput}
              value={adminPasskey}
              onChangeText={setAdminPasskey}
              secureTextEntry={true}
              placeholderTextColor="#ccc"
            />

            <TouchableOpacity style={styles.confirmBtn} onPress={handleFinalVerify}>
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.returnBtn} onPress={() => setPasskeyVisible(false)}>
              <Text style={styles.returnBtnText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL: CHANGES SAVED (image_42e95c) ================= */}
      <Modal animationType="fade" transparent={true} visible={successVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <Text style={styles.successTitle}>Changes Saved!</Text>
            <Text style={styles.successSubtitle}>All Changes have been{"\n"}saved</Text>

            <TouchableOpacity style={styles.darkReturnBtn} onPress={handleSuccessReturn}>
              <Text style={styles.darkReturnBtnText}>Return</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        <View style={styles.headerLeftGroup}>
          <Image source={require('../assets/images/company-logo.png')} style={styles.headerLogo} resizeMode="contain" />
          <Image source={require('../assets/images/sms-logo.png')} style={styles.smsLogo} resizeMode="contain" />
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => setLogoutVisible(true)}>
          <Ionicons name="log-out-outline" size={35} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* ================= MAIN CONTENT ================= */}
      <View style={styles.contentArea}>
        <View style={styles.breadcrumbBar}>
          <TouchableOpacity style={styles.backArrow} onPress={() => router.back()}>
            <Ionicons name="return-up-back" size={40} color="#fff" />
          </TouchableOpacity>
          <View style={styles.pageLabel}>
            <Ionicons name="settings-outline" size={40} color="#fff" />
            <Text style={styles.pageLabelText}>Settings</Text>
          </View>
        </View>

        <Text style={styles.selectText}>Select Action</Text>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="always">
          
          {/* ACCOUNT DETAILS */}
          <View style={styles.accordionWrapper}>
            <TouchableOpacity 
              style={[styles.accordionBtn, expandedSections.includes('accountDetails') && styles.accordionBtnExpanded]} 
              onPress={() => toggleSection('accountDetails')}
            >
              <Text style={styles.accordionBtnText}>Change Account Details</Text>
              <Ionicons name={expandedSections.includes('accountDetails') ? "chevron-up" : "chevron-down"} size={35} color="#fff" />
            </TouchableOpacity>

            {expandedSections.includes('accountDetails') && (
              <View style={styles.contentBox}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <Pressable 
                    style={[styles.pillContainer, !isEditing && { backgroundColor: '#e2e8f0' }]} 
                    onPress={() => isEditing && nameInputRef.current?.focus()}
                  >
                    <TextInput ref={nameInputRef} style={styles.input} value={name} onChangeText={setName} editable={isEditing} />
                  </Pressable>
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <Pressable 
                    style={[styles.pillContainer, !isEditing && { backgroundColor: '#e2e8f0' }]} 
                    onPress={() => isEditing && emailInputRef.current?.focus()}
                  >
                    <TextInput ref={emailInputRef} style={styles.input} value={email} onChangeText={setEmail} editable={isEditing} />
                  </Pressable>
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <Pressable 
                    style={[styles.pillContainer, !isEditing && { backgroundColor: '#e2e8f0' }]} 
                    onPress={() => isEditing && passwordInputRef.current?.focus()}
                  >
                    <TextInput ref={passwordInputRef} style={[styles.input, { flex: 1 }]} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} editable={isEditing} />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                      <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={30} color="#000" />
                    </TouchableOpacity>
                  </Pressable>
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={handleActionButton}>
                  <Text style={styles.actionButtonText}>{isEditing ? "Save" : "Edit"}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* SYSTEM APPEARANCE */}
          <View style={styles.accordionWrapper}>
            <TouchableOpacity 
              style={[styles.accordionBtn, expandedSections.includes('appearance') && styles.accordionBtnExpanded]} 
              onPress={() => toggleSection('appearance')}
            >
              <Text style={styles.accordionBtnText}>Change System Appearance</Text>
              <Ionicons name={expandedSections.includes('appearance') ? "chevron-up" : "chevron-down"} size={35} color="#fff" />
            </TouchableOpacity>

            {expandedSections.includes('appearance') && (
              <View style={styles.contentBox}>
                <View style={styles.inputRow}>
                  <Text style={styles.inputLabel}>System Colors</Text>
                  <TouchableOpacity style={styles.pillContainer} activeOpacity={0.8}>
                    <Text style={styles.dropdownText}>{systemTheme}</Text>
                    <Ionicons name="chevron-down" size={24} color="black"/>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.blueSaveButton} onPress={() => setSuccessVisible(true)}>
                  <Text style={styles.confirmBtnText}>Save</Text>
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
  container: { flex: 1, backgroundColor: '#333333' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 60, paddingTop: 50, paddingBottom: 50, backgroundColor: '#202020', borderBottomLeftRadius: 35, borderBottomRightRadius: 35, elevation: 10 },
  headerLeftGroup: { flexDirection: 'row', alignItems: 'center', gap: 40 },
  headerLogo: { width: 250, height: 120 },
  smsLogo: { width: 220, height: 110 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#fff', paddingBottom: 5 },
  logoutText: { color: '#fff', fontSize: 32, fontFamily: 'Lexend_400Regular', marginLeft: 15 },
  contentArea: { flex: 1, paddingHorizontal: 60, paddingTop: 40 },
  breadcrumbBar: { flexDirection: 'row', gap: 20, marginBottom: 30 },
  backArrow: { backgroundColor: '#505050', padding: 15, borderRadius: 15 },
  pageLabel: { flex: 1, backgroundColor: '#505050', borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, gap: 15 },
  pageLabelText: { color: '#fff', fontSize: 45, fontFamily: 'Lexend_400Regular' },
  selectText: { color: '#fff', fontSize: 55, fontFamily: 'Lexend_700Bold', marginBottom: 25 },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 100 },
  accordionWrapper: { marginBottom: 15 },
  accordionBtn: { backgroundColor: '#505050', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, borderRadius: 20 },
  accordionBtnExpanded: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  accordionBtnText: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular' },
  contentBox: { backgroundColor: '#505050', paddingHorizontal: 40, paddingBottom: 30, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  inputLabel: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular', width: 300 },
  pillContainer: { flex: 1, backgroundColor: '#fff', height: 60, borderRadius: 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 },
  input: { flex: 1, height: '100%', fontSize: 28, color: '#000', fontFamily: 'Lexend_400Regular', textAlign: 'center' },
  dropdownText: { flex: 1, fontSize: 28, color: '#000', textAlign: 'center', fontFamily: 'Lexend_400Regular' },
  eyeIcon: { paddingLeft: 10 },
  
  actionButton: { backgroundColor: '#333333', paddingVertical: 12, width: 250, borderRadius: 30, alignSelf: 'center', marginTop: 15, justifyContent: 'center', alignItems: 'center' },
  actionButtonText: { color: '#fff', fontSize: 32, textAlign: 'center', fontFamily: 'Lexend_400Regular' },
  
  blueSaveButton: { backgroundColor: '#1DA1D9', paddingVertical: 12, width: 300, borderRadius: 15, alignSelf: 'center', marginTop: 15, justifyContent: 'center', alignItems: 'center' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  logoutModalContainer: { width: '50%', backgroundColor: '#2A2A2A', borderRadius: 30, padding: 50, alignItems: 'center', gap: 30 },
  verifyModalContainer: { width: '70%', backgroundColor: '#2A2A2A', borderRadius: 30, padding: 60, alignItems: 'center', gap: 30 },
  
  // Success Modal Styles (image_42e95c)
  successModalContainer: { width: '60%', backgroundColor: '#2A2A2A', borderRadius: 30, padding: 60, alignItems: 'center', gap: 40 },
  successTitle: { color: '#fff', fontSize: 75, fontFamily: 'Lexend_700Bold', textAlign: 'center' },
  successSubtitle: { color: '#fff', fontSize: 45, textAlign: 'center', fontFamily: 'Lexend_400Regular', lineHeight: 55 },
  darkReturnBtn: { backgroundColor: '#505050', paddingVertical: 15, width: 350, borderRadius: 15, alignItems: 'center' },
  darkReturnBtnText: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular' },

  logoutTitle: { color: '#fff', fontSize: 60, fontFamily: 'Lexend_700Bold' },
  verifyTitle: { color: '#fff', fontSize: 65, fontFamily: 'Lexend_400Regular', textAlign: 'center' },
  logoutSubtitle: { color: '#fff', fontSize: 35, textAlign: 'center' },
  verifySubtitle: { color: '#fff', fontSize: 40, textAlign: 'center', lineHeight: 55 },
  passkeyInput: { backgroundColor: '#fff', width: '90%', height: 120, borderRadius: 15, fontSize: 50, textAlign: 'center', fontFamily: 'Lexend_400Regular', marginTop: 20 },
  confirmBtn: { backgroundColor: '#1DA1D9', width: '90%', paddingVertical: 25, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  confirmBtnText: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_700Bold', textAlign: 'center' },
  returnBtn: { paddingVertical: 10 },
  returnBtnText: { color: '#fff', fontSize: 40, textDecorationLine: 'underline', fontFamily: 'Lexend_400Regular', textAlign: 'center' },
});