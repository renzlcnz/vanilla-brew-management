import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Modal,
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

export default function SalesScreen() {
  const router = useRouter();
  
  // --- STATES ---
  const [orderMode, setOrderMode] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false); 
  const [confirmTransactionVisible, setConfirmTransactionVisible] = useState(false);
  const [finalReceiptVisible, setFinalReceiptVisible] = useState(false);
  const [isSummaryView, setIsSummaryView] = useState(false); 
  
  const [cart, setCart] = useState([]);
  const [editingId, setEditingId] = useState(null); 
  const [activeItem, setActiveItem] = useState(null); 
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  // Payment States
  const [amountGiven, setAmountGiven] = useState('');
  const [paymentError, setPaymentError] = useState(false); // New state for red border

  let [fontsLoaded] = useFonts({ Lexend_400Regular, Lexend_700Bold });
  if (!fontsLoaded) return null;

  // --- HANDLERS ---
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const openCustomization = (itemName) => {
    setEditingId(null); 
    setActiveItem(itemName);
    setQuantity(1);
    setSelectedSize('S');
    setSelectedAddons([]);
    setModalVisible(true);
  };

  const openEditCustomization = (item) => {
    setEditingId(item.id); 
    setActiveItem(item.name);
    setQuantity(item.qty);
    setSelectedSize(item.size);
    setSelectedAddons(item.addons ? item.addons.split(', ') : []);
    setModalVisible(true);
  };

  const toggleAddon = (addon) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleConfirmOrder = () => {
    const pricePerUnit = activeItem === "Cookies" ? 50 : 110;
    const currentAddonsString = selectedAddons.join(', ');

    const existingItemIndex = cart.findIndex(item => 
      item.name === activeItem && item.size === selectedSize && item.addons === currentAddonsString && item.id !== editingId
    );

    if (existingItemIndex !== -1 && !editingId) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].qty += quantity;
      updatedCart[existingItemIndex].totalPrice += (pricePerUnit * quantity);
      setCart(updatedCart);
    } else if (editingId) {
      const itemData = { id: editingId, name: activeItem, size: selectedSize, qty: quantity, addons: currentAddonsString, totalPrice: pricePerUnit * quantity };
      setCart(cart.map(item => item.id === editingId ? itemData : item));
    } else {
      const newItem = { id: Date.now(), name: activeItem, size: selectedSize, qty: quantity, addons: currentAddonsString, totalPrice: pricePerUnit * quantity };
      setCart([...cart, newItem]);
    }
    setModalVisible(false);
  };

  const handleRemove = () => {
    setCart(cart.filter(item => item.id !== editingId));
    setModalVisible(false);
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const changeAmount = amountGiven ? (parseFloat(amountGiven) - grandTotal) : 0;

  const handleProcessPayment = () => {
    const given = parseFloat(amountGiven);
    if (isNaN(given) || given < grandTotal) {
      // Instead of an Alert, we trigger the red border
      setPaymentError(true);
      return;
    }
    setPaymentError(false);
    setPaymentModalVisible(false);
    setConfirmTransactionVisible(true);
  };

  const handleConfirmComplete = () => {
    setConfirmTransactionVisible(false);
    setFinalReceiptVisible(true);
  };

  const resetAll = () => {
    setFinalReceiptVisible(false);
    setIsSummaryView(false);
    setCart([]);
    setAmountGiven('');
    setOrderMode(null);
    setCurrentCategory(null);
    setPaymentError(false);
  };

  // --- RENDER HELPERS ---
  const renderMenuCategories = () => (
    <>
      <View style={styles.columnHeader}><Text style={styles.columnHeaderText}>Menu</Text></View>
      <ScrollView contentContainerStyle={styles.menuList}>
        <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentCategory('Beverage')}>
          <Ionicons name="cafe-outline" size={32} color="#fff" />
          <Text style={styles.menuItemText}>Beverage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => setCurrentCategory('Snacks')}>
          <Ionicons name="fast-food-outline" size={32} color="#fff" />
          <Text style={styles.menuItemText}>Snacks</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );

  const renderProductList = (category) => {
    const itemName = category === 'Beverage' ? "Classic Mango Shake" : "Cookies";
    return (
      <>
        <View style={styles.columnHeaderWithBack}>
          <TouchableOpacity style={styles.goBackButton} onPress={() => setCurrentCategory(null)}>
              <Text style={styles.goBackText}>Go Back</Text>
          </TouchableOpacity>
          <Text style={styles.columnHeaderText}>{category}</Text>
          <View style={{ width: 100 }} /> 
        </View>
        <ScrollView contentContainerStyle={styles.menuList}>
          <TouchableOpacity style={styles.productItem} onPress={() => openCustomization(itemName)}>
            <Text style={styles.productItemText}>{itemName}</Text>
            <Ionicons name="add-circle-outline" size={45} color="#fff" />
          </TouchableOpacity>
        </ScrollView>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ================= MODAL: CUSTOMIZATION ================= */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              {/* Resizable Return Button via modalGoBack style */}
              <TouchableOpacity style={styles.modalGoBack} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalGoBackText}>Go Back</Text>
              </TouchableOpacity>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={styles.modalTitle}>Select Size and Add-Ons</Text>
                <Text style={styles.modalSubtitle}>{activeItem}</Text>
              </View>
              <View style={{ width: 100 }} />
            </View>
            <View style={styles.modalBody}>
              <View style={styles.customRow}>
                <View style={styles.flexRow}>
                  <Text style={styles.modalLabel}>Size</Text>
                  <TouchableOpacity style={[styles.sizeBtn, selectedSize === 'S' && styles.sizeBtnActive]} onPress={() => setSelectedSize('S')}>
                    <Text style={styles.sizeBtnText}>S</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.sizeBtn, selectedSize === 'M' && styles.sizeBtnActive]} onPress={() => setSelectedSize('M')}>
                    <Text style={styles.sizeBtnText}>M</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.modalLabel}>Quantity</Text>
                  <TouchableOpacity style={styles.qtyBtn} onPress={decrement}><Ionicons name="remove-outline" size={30} color="#fff" /></TouchableOpacity>
                  <View style={styles.qtyDisplay}><Text style={styles.qtyText}>{quantity}</Text></View>
                  <TouchableOpacity style={styles.qtyBtn} onPress={increment}><Ionicons name="add-outline" size={30} color="#fff" /></TouchableOpacity>
                </View>
              </View>
              <Text style={styles.modalLabel}>Add-Ons</Text>
              <View style={styles.addonsGrid}>
                {['Crushed Graham', 'Nata', 'Pearl', 'Crushed Oreo', 'Vanilla Ice Cream', 'Shredded Cheese'].map((item) => (
                  <TouchableOpacity key={item} style={styles.addonItem} onPress={() => toggleAddon(item)}>
                    <Text style={styles.addonText}>{item}</Text>
                    <View style={[styles.checkbox, selectedAddons.includes(item) && styles.checkboxActive]} />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.modalFooter}>
                {editingId ? (
                  <>
                    <TouchableOpacity style={styles.halfRemoveBtn} onPress={handleRemove}><Text style={styles.confirmBtnText}>Remove</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.halfUpdateBtn} onPress={handleConfirmOrder}><Text style={styles.confirmBtnText}>Update</Text></TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder}><Text style={styles.confirmBtnText}>Confirm</Text></TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL: PAYMENT DETAILS ================= */}
      <Modal animationType="fade" transparent={true} visible={paymentModalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.paymentModalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.modalGoBack} onPress={() => { setPaymentModalVisible(false); setPaymentError(false); }}>
                <Text style={styles.modalGoBackText}>Return</Text>
              </TouchableOpacity>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={styles.modalTitle}>Enter Payment Details</Text>
              </View>
              <View style={{ width: 100 }} />
            </View>
            <View style={styles.paymentModalBody}>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Amount Given:</Text>
                {/* Dynamically changing border color based on error state */}
                <TextInput 
                  style={[styles.paymentInput, paymentError && { borderColor: '#FF4444', borderWidth: 4 }]} 
                  value={amountGiven} 
                  onChangeText={(val) => { setAmountGiven(val); setPaymentError(false); }} 
                  keyboardType="numeric" 
                  placeholder="0.00" 
                />
              </View>
              <View style={styles.paymentInfoRow}>
                <Text style={styles.paymentLabel}>Total:</Text>
                <Text style={styles.paymentValue}>P {grandTotal.toFixed(2)}</Text>
              </View>
              <View style={styles.paymentInfoRow}>
                <Text style={styles.paymentLabel}>Change:</Text>
                <Text style={styles.paymentValue}>P {changeAmount < 0 ? '0.00' : changeAmount.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleProcessPayment}>
                <Text style={styles.confirmBtnText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL: TRANSACTION COMPLETE? ================= */}
      <Modal animationType="fade" transparent={true} visible={confirmTransactionVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.smallModalContainer}>
            <Text style={styles.successTitle}>Transaction Complete?</Text>
            <View style={styles.successBtnGroup}>
              <TouchableOpacity style={styles.successReturnBtn} onPress={() => setConfirmTransactionVisible(false)}>
                <Text style={styles.confirmBtnText}>Return</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.successConfirmBtn} onPress={handleConfirmComplete}>
                <Text style={styles.confirmBtnText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================= MODAL: FINAL RECEIPT SAVED ================= */}
      <Modal animationType="fade" transparent={true} visible={finalReceiptVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.receiptModalContainer}>
            <Text style={styles.receiptTitle}>Transaction Complete!</Text>
            <Text style={styles.receiptDescription}>
              This transaction details have been saved and is assigned as 
              <Text style={{ fontFamily: 'Lexend_700Bold' }}> SLS1030250003.</Text>
            </Text>
            <View style={styles.successBtnGroup}>
              <TouchableOpacity style={styles.successReturnBtn} onPress={resetAll}>
                <Text style={styles.confirmBtnText}>Return</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.receiptPrintBtn} onPress={resetAll}>
                <Text style={styles.confirmBtnText}>Print Receipt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================= MAIN INTERFACE ================= */}
      <View style={styles.topToolbar}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => isSummaryView ? setIsSummaryView(false) : router.back()}>
          <Ionicons name="close-circle-outline" size={40} color="#fff" />
          <Text style={styles.toolbarText}>{isSummaryView ? "Return" : "Cancel Order"}</Text>
        </TouchableOpacity>
        <View style={styles.modeContainer}>
          <Text style={styles.modeLabel}>Select Order Mode</Text>
          <View style={styles.toggleWrapper}>
            <TouchableOpacity style={[styles.toggleBtn, orderMode === 'DineIn' && styles.toggleBtnActive]} onPress={() => setOrderMode('DineIn')}>
              <Text style={[styles.toggleText, orderMode === 'DineIn' ? styles.textClicked : styles.textNotClicked]}>Dine In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toggleBtn, orderMode === 'TakeOut' && styles.toggleBtnActive]} onPress={() => setOrderMode('TakeOut')}>
              <Text style={[styles.toggleText, orderMode === 'TakeOut' ? styles.textClicked : styles.textNotClicked]}>Take Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {!isSummaryView ? (
        <View style={styles.mainGrid}>
          <View style={styles.menuColumn}>
            {currentCategory === null ? renderMenuCategories() : renderProductList(currentCategory)}
          </View>
          <View style={styles.orderColumn}>
            <View style={styles.columnHeader}><Text style={styles.columnHeaderText}>Order List</Text></View>
            <ScrollView style={styles.orderListContainer}>
              {cart.map((item) => (
                <TouchableOpacity key={item.id} style={styles.cartItem} onPress={() => openEditCustomization(item)}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cartItemName}>{item.qty} x {item.size} {item.name}</Text>
                    {item.addons !== "" && <Text style={styles.cartItemAddons}>{item.addons}</Text>}
                  </View>
                  <Text style={styles.cartItemPrice}>P {item.totalPrice}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.orderFooter}>
              <Text style={styles.totalText}>Total: ₱{grandTotal.toFixed(2)}</Text>
              <TouchableOpacity 
                style={[styles.completeButton, (cart.length === 0 || !orderMode) && { opacity: 0.3 }]} 
                onPress={() => setIsSummaryView(true)}
                disabled={cart.length === 0 || !orderMode}
              >
                <Text style={styles.completeButtonText}>Complete Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <View style={styles.columnHeader}><Text style={styles.columnHeaderText}>Summary</Text></View>
            <ScrollView style={styles.summaryList}>
              {cart.map((item) => (
                <TouchableOpacity key={item.id} style={[styles.cartItem, { paddingHorizontal: 40 }]} onPress={() => openEditCustomization(item)}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.cartItemName, { fontSize: 40 }]}>{item.qty} x {item.size} {item.name}</Text>
                    {item.addons !== "" && <Text style={[styles.cartItemAddons, { fontSize: 24 }]}>{item.addons}</Text>}
                  </View>
                  <Text style={[styles.cartItemPrice, { fontSize: 40 }]}>P {item.totalPrice}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.orderFooter}>
              <Text style={[styles.totalText, { fontSize: 60 }]}>Total: ₱ {grandTotal.toFixed(2)}</Text>
              <TouchableOpacity 
                style={[styles.completeButton, { width: '40%' }, (cart.length === 0 || !orderMode) && { opacity: 0.3 }]} 
                onPress={() => setPaymentModalVisible(true)}
                disabled={cart.length === 0 || !orderMode}
              >
                <Text style={styles.completeButtonText}>Proceed to Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#202020', padding: 30 },
  topToolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  cancelButton: { backgroundColor: '#555555', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, paddingVertical: 15, borderRadius: 15, gap: 15 },
  toolbarText: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular' },
  modeContainer: { flexDirection: 'row', alignItems: 'center', gap: 25 },
  modeLabel: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular' },
  toggleWrapper: { flexDirection: 'row', backgroundColor: '#151515', borderRadius: 15, overflow: 'hidden' },
  toggleBtn: { paddingHorizontal: 40, paddingVertical: 20, minWidth: 200, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: '#555555' },
  toggleText: { fontFamily: 'Lexend_700Bold' },
  textClicked: { fontSize: 60, color: '#fff' },
  textNotClicked: { fontSize: 45, color: '#888' },
  mainGrid: { flex: 1, flexDirection: 'row', gap: 30 },
  menuColumn: { flex: 0.6, backgroundColor: '#454545', borderRadius: 20, overflow: 'hidden' },
  orderColumn: { flex: 0.4, backgroundColor: '#454545', borderRadius: 20, overflow: 'hidden' },
  summaryContainer: { flex: 1, paddingBottom: 20 },
  summaryBox: { flex: 1, backgroundColor: '#454545', borderRadius: 25, overflow: 'hidden' },
  columnHeader: { paddingVertical: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#555' },
  columnHeaderWithBack: { paddingVertical: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#555' },
  columnHeaderText: { color: '#fff', fontSize: 50, fontFamily: 'Lexend_400Regular' },
  goBackButton: { backgroundColor: '#333', paddingHorizontal: 25, paddingVertical: 15, borderRadius: 12 },
  goBackText: { color: '#fff', fontSize: 24, fontFamily: 'Lexend_700Bold' },
  menuList: { padding: 20 },
  menuItem: { backgroundColor: '#333333', flexDirection: 'row', alignItems: 'center', padding: 30, borderRadius: 15, marginBottom: 20, gap: 20 },
  menuItemText: { color: '#fff', fontSize: 40, fontFamily: 'Lexend_400Regular' },
  productItem: { backgroundColor: '#333', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 40, borderRadius: 15, marginBottom: 15 },
  productItemText: { color: '#fff', fontSize: 40, fontFamily: 'Lexend_400Regular' },
  orderListContainer: { flex: 1, padding: 15 },
  summaryList: { flex: 1, paddingVertical: 20 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
  cartItemName: { color: '#fff', fontSize: 24, fontFamily: 'Lexend_400Regular', flexWrap: 'wrap', maxWidth: '80%' },
  cartItemAddons: { color: '#ccc', fontSize: 16, fontFamily: 'Lexend_400Regular', marginTop: 5, flexWrap: 'wrap' },
  cartItemPrice: { color: '#fff', fontSize: 24, fontFamily: 'Lexend_700Bold' },
  orderFooter: { padding: 30, alignItems: 'flex-end', gap: 20, borderTopWidth: 1, borderTopColor: '#555' },
  totalText: { color: '#fff', fontSize: 40, fontFamily: 'Lexend_700Bold' },
  completeButton: { backgroundColor: '#1DA1D9', paddingHorizontal: 40, paddingVertical: 20, borderRadius: 15, alignItems: 'center' },
  completeButtonText: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_700Bold', textAlign: 'center' },

  // --- MODALS ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '85%', height: '85%', backgroundColor: '#555555', borderRadius: 30, overflow: 'hidden' },
  paymentModalContainer: { width: '75%', backgroundColor: '#555555', borderRadius: 30, overflow: 'hidden', paddingBottom: 40 },
  smallModalContainer: { width: '55%', backgroundColor: '#555555', borderRadius: 30, padding: 50, alignItems: 'center', gap: 40 },
  receiptModalContainer: { width: '65%', backgroundColor: '#555555', borderRadius: 30, padding: 60, alignItems: 'center', gap: 30 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#666' },
  
  // ADJUST THESE FOR RETURN BUTTON SIZE
  modalGoBack: { backgroundColor: '#333', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 20 },
  modalGoBackText: { color: '#fff', fontSize: 25, fontFamily: 'Lexend_700Bold' },
  
  modalTitle: { color: '#fff', fontSize: 35, fontFamily: 'Lexend_400Regular' },
  modalSubtitle: { color: '#fff', fontSize: 50, fontFamily: 'Lexend_700Bold' },
  modalBody: { padding: 40, flex: 1 },
  paymentModalBody: { padding: 60, gap: 40 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  paymentInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#666', paddingTop: 20 },
  paymentLabel: { color: '#fff', fontSize: 45, fontFamily: 'Lexend_400Regular' },
  paymentValue: { color: '#fff', fontSize: 45, fontFamily: 'Lexend_700Bold' },
  paymentInput: { backgroundColor: '#fff', width: '50%', borderRadius: 20, padding: 25, fontSize: 40, fontFamily: 'Lexend_700Bold', textAlign: 'center' },
  
  successTitle: { color: '#fff', fontSize: 60, fontFamily: 'Lexend_400Regular', textAlign: 'center' },
  receiptTitle: { color: '#fff', fontSize: 70, fontFamily: 'Lexend_700Bold', textAlign: 'center' },
  receiptDescription: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_400Regular', textAlign: 'center', lineHeight: 45 },
  successBtnGroup: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 30, marginTop: 20 },
  successReturnBtn: { backgroundColor: '#404040', paddingVertical: 25, borderRadius: 15, alignItems: 'center', flex: 1 },
  successConfirmBtn: { backgroundColor: '#1DA1D9', paddingVertical: 25, borderRadius: 15, alignItems: 'center', flex: 1 },
  receiptPrintBtn: { backgroundColor: '#404040', paddingVertical: 25, borderRadius: 15, alignItems: 'center', flex: 1 },

  customRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  flexRow: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  modalLabel: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_400Regular' },
  sizeBtn: { backgroundColor: '#333', padding: 15, borderRadius: 10, minWidth: 60, alignItems: 'center' },
  sizeBtnActive: { backgroundColor: '#1DA1D9' },
  sizeBtnText: { color: '#fff', fontSize: 24, fontFamily: 'Lexend_700Bold' },
  qtyBtn: { backgroundColor: '#333', padding: 10, borderRadius: 10 },
  qtyDisplay: { backgroundColor: '#fff', paddingHorizontal: 25, paddingVertical: 10, borderRadius: 10 },
  qtyText: { color: '#000', fontSize: 30, fontFamily: 'Lexend_700Bold' },
  addonsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, marginTop: 20, marginBottom: 40 },
  addonItem: { width: '48%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  addonText: { color: '#fff', fontSize: 25, fontFamily: 'Lexend_400Regular' },
  checkbox: { width: 50, height: 50, backgroundColor: '#333', borderRadius: 10 },
  checkboxActive: { backgroundColor: '#1DA1D9' },
  modalFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' },
  halfRemoveBtn: { backgroundColor: '#FF4444', paddingVertical: 20, borderRadius: 15, alignItems: 'center', width: '48%' },
  halfUpdateBtn: { backgroundColor: '#1DA1D9', paddingVertical: 20, borderRadius: 15, alignItems: 'center', width: '48%' },
  confirmBtn: { backgroundColor: '#1DA1D9', paddingVertical: 20, borderRadius: 15, alignItems: 'center', width: '100%' },
  confirmBtnText: { color: '#fff', fontSize: 30, fontFamily: 'Lexend_700Bold' },
});