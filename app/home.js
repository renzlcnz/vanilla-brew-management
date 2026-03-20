import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Built-in Expo Icons
import { Ionicons } from '@expo/vector-icons';

// Lexend Google Fonts
import {
  Lexend_400Regular,
  Lexend_700Bold,
  Lexend_900Black,
  useFonts
} from '@expo-google-fonts/lexend';

export default function MainShellScreen() {
  const router = useRouter();

  // State to track the active tab
  const [activeTab, setActiveTab] = useState('Welcome');

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

  // Sidebar Button Component (JS version - no Type Annotations)
  const SidebarButton = ({ title, iconName, onPress, isActive = false }) => (
    <TouchableOpacity 
      style={[styles.menuButton, isActive && styles.activeMenuButton]} 
      activeOpacity={0.7} 
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <Ionicons name={iconName} size={42} color="#fff" style={styles.menuIcon} />
        <Text 
          style={[styles.menuText, isActive && styles.activeMenuText]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    console.log('Logging out Renz...');
    router.replace('/'); 
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'Inventory':
        return (
          <View style={styles.placeholderContainer}>
            <Ionicons name="cube-outline" size={80} color="#1DA1D9" />
            <Text style={styles.placeholderText}>Inventory Module</Text>
          </View>
        );
      case 'Registration':
        return (
          <View style={styles.placeholderContainer}>
            <Ionicons name="person-add-outline" size={80} color="#1DA1D9" />
            <Text style={styles.placeholderText}>Registration Module</Text>
          </View>
        );
      case 'Dashboard':
        return (
          <View style={styles.placeholderContainer}>
            <Ionicons name="clipboard-outline" size={80} color="#1DA1D9" />
            <Text style={styles.placeholderText}>Dashboard Analytics</Text>
          </View>
        );
      case 'Search':
        return (
          <View style={styles.placeholderContainer}>
            <Ionicons name="search-outline" size={80} color="#1DA1D9" />
            <Text style={styles.placeholderText}>Search Database</Text>
          </View>
        );
      case 'Maintenance':
        return (
          <View style={styles.placeholderContainer}>
            <Ionicons name="construct-outline" size={80} color="#1DA1D9" />
            <Text style={styles.placeholderText}>System Maintenance</Text>
          </View>
        );
      case 'Help':
        return (
          <View style={styles.placeholderContainer}>
            <Ionicons name="help-circle-outline" size={80} color="#1DA1D9" />
            <Text style={styles.placeholderText}>Help & Support</Text>
          </View>
        );
      case 'About':
        return (
          <View style={styles.placeholderContainer}>
            <Ionicons name="document-text-outline" size={80} color="#1DA1D9" />
            <Text style={styles.placeholderText}>About Vanilla Brew</Text>
          </View>
        );
      case 'Settings':
        return (
          <View style={styles.placeholderContainer}>
            <Ionicons name="settings-outline" size={80} color="#1DA1D9" />
            <Text style={styles.placeholderText}>System Settings</Text>
          </View>
        );
      
      case 'Welcome':
      default:
        return (
          <>
            <Image 
              source={require('../assets/images/company-logo.png')} 
              style={styles.bigLogo}
              resizeMode="contain" 
            />
            <Text style={styles.systemTitle}>SHOP</Text>
            <Text style={styles.systemTitle}>MANAGEMENT</Text>
            <Text style={styles.systemTitle}>SYSTEM</Text>
            <View style={styles.iconRow}>
              <Ionicons name="cafe-outline" size={50} color="#fff" />
              <Ionicons name="clipboard-outline" size={50} color="#fff" />
              <Ionicons name="desktop-outline" size={50} color="#fff" />
            </View>
          </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.layout}>
        <View style={styles.sidebar}>
          <ScrollView contentContainerStyle={styles.sidebarScroll} showsVerticalScrollIndicator={false}>
            
            <SidebarButton 
              title="Inventory" 
              iconName="cube-outline" 
              isActive={activeTab === 'Inventory'}
              onPress={() => setActiveTab('Inventory')} 
            />
            <SidebarButton 
              title="Registration" 
              iconName="person-add-outline" 
              isActive={activeTab === 'Registration'}
              onPress={() => setActiveTab('Registration')} 
            />
            <SidebarButton 
              title="Dashboard" 
              iconName="clipboard-outline" 
              isActive={activeTab === 'Dashboard'} 
              onPress={() => setActiveTab('Dashboard')} 
            />
            <SidebarButton 
              title="Search" 
              iconName="search-outline" 
              isActive={activeTab === 'Search'}
              onPress={() => setActiveTab('Search')} 
            />
            <SidebarButton 
              title="Maintenance" 
              iconName="construct-outline" 
              isActive={activeTab === 'Maintenance'}
              onPress={() => setActiveTab('Maintenance')} 
            />
            <SidebarButton 
              title="Help" 
              iconName="help-circle-outline" 
              isActive={activeTab === 'Help'}
              onPress={() => setActiveTab('Help')} 
            />
            <SidebarButton 
              title="About" 
              iconName="document-text-outline" 
              isActive={activeTab === 'About'}
              onPress={() => setActiveTab('About')} 
            />
            <SidebarButton 
              title="Settings" 
              iconName="settings-outline" 
              isActive={activeTab === 'Settings'}
              onPress={() => setActiveTab('Settings')} 
            />
            <SidebarButton 
              title="Log Out" 
              iconName="log-out-outline" 
              onPress={handleLogout} 
            />

          </ScrollView>
        </View>

        <View style={styles.mainContent}>
          {renderMainContent()}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#202020' },
  loadingContainer: { flex: 1, backgroundColor: '#202020', justifyContent: 'center', alignItems: 'center' },
  layout: { flex: 1, flexDirection: 'row', padding: 30, gap: 20 },
  sidebar: { width: 450, backgroundColor: '#333333', borderRadius: 30, paddingVertical: 40, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  sidebarScroll: { alignItems: 'center', paddingBottom: 40 },
  menuButton: { backgroundColor: '#555555', width: '90%', paddingVertical: 18, borderRadius: 15, marginBottom: 15 },
  buttonContent: { flexDirection: 'row', alignItems: 'center', paddingLeft: 30 },
  activeMenuButton: { backgroundColor: '#1DA1D9' },
  menuIcon: { marginRight: 15 },
  menuText: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_400Regular', flexShrink: 1 },
  activeMenuText: { fontFamily: 'Lexend_700Bold' },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333333', borderRadius: 30, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
  bigLogo: { width: 400, height: 250, marginBottom: 20 },
  systemTitle: { color: '#fff', fontSize: 50, fontFamily: 'Lexend_900Black', textAlign: 'center', lineHeight: 60 },
  iconRow: { flexDirection: 'row', justifyContent: 'space-around', width: 250, marginTop: 40 },
  placeholderContainer: { alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#fff', fontSize: 40, fontFamily: 'Lexend_700Bold', marginTop: 20 },
});