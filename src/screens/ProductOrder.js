import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, Alert, Pressable, ScrollView } from 'react-native'
import Button from '../components/Button'
import Input from '../components/Input'
import { MaterialIcons } from '@expo/vector-icons';

export default class ProductOrder extends Component {


  static defaultProps = {
    quantity: 0,
    totalPrice: 0,
    productName: 'Légumes variés',
    contractor: {
      address: 'rue du magasin',
      name: 'magasin'
    },
    modalVisible: false,
  }

  state = {
    modalVisible: false,
    firstName: '',
    phoneNumber: '',
    email: '',
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  onChangeText = (key, val) => {
    this.setState(() => ({ [key]: val.trim() }), this.checkFormValidity)
  //this.setState(() => ({ [key]: val.trim() }),() => console.log("state", this.state))

  }

  handleFieldParamsChange = (valid, params) => {
    console.log(`
      Valid: ${valid}
      Number: ${params.number || '-'}
      Month: ${params.expMonth || '-'}
      Year: ${params.expYear || '-'}
      CVC: ${params.cvc || '-'}
    `)
  }

  isPaymentCardTextFieldFocused = () => this.paymentCardInput.isFocused()

  focusPaymentCardTextField = () => this.paymentCardInput.focus()

  blurPaymentCardTextField = () => this.paymentCardInput.blur()

  resetPaymentCardTextField = () => this.paymentCardInput.setParams({})


  render() {
    const { quantity, productName, totalPrice, contractor: {name, address} } = this.props;
    const { modalVisible, firstName, phoneNumber, email } = this.state;
    return (
      
        <View style={styles.container}>
          
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          //statusBarTranslucent={true}
          //backdropOpacity={0.3}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
        <ScrollView>
          
          <View style={styles.container}>
            <View style={styles.modalView}>
              <View style={{position: 'absolute', top: 5, right:5}}>
                <Pressable
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <MaterialIcons  name="close" size={24} color="black" />
                </Pressable>
              </View>
              <Text>{`Vous êtes sur le point de sauver:\n${quantity} panier(s) ${productName} chez ${name} pour ${totalPrice}€`}</Text>
              <Text>{`Adresse: ${address}`}</Text>
              <View>
                <Input
                  value={firstName}
                  label='Prénom'
                  name='firstName'
                  placeholder=''
                  autoCapitalize='none'
                  onChangeText={this.onChangeText}
                />
                <Input
                   value={phoneNumber}
                   label='Téléphone'
                   name='phoneNumber'
                   placeholder=''
                   autoCapitalize='none'
                   onChangeText={this.onChangeText}
                />
                <Input
                  value={email}
                  label='Email'
                  name='email'
                  placeholder=''
                  autoCapitalize='none'
                  onChangeText={this.onChangeText}
                />
                {/* <PaymentCardTextField
                  ref={ (ref) => {
                    this.paymentCardInput = ref;
                  }}
                  style={styles.field}
                  numberPlaceholder="XXXX XXXX XXXX XXXX"
                  expirationPlaceholder="MM/YY"
                  cvcPlaceholder="CVC"
                /> */}
                
              </View>
              <Text>Paiement sécurisé par stripe</Text>
              <Button title='payer' />
              <Text>Créneaux de collecte</Text>
              <Text>{`Lorem Ipsum\nLorem Ipsum`}</Text>
            </View>
          </View>
          </ScrollView>
        </Modal>
        
        </View>
        
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    //marginTop: 22,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
   // margin: 20,
    //width: '100%',
    backgroundColor: "white",
    //borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  field: {
    width: 300,
    color: '#449aeb',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  }
  
})
