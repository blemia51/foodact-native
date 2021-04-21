import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, Alert, Pressable, ScrollView } from 'react-native'
import Button from '../components/Button'
import Input from '../components/Input'
import Payment from '../components/Payment'
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
    const { quantity, productName, totalPrice, contractor: {name, address}, navigation } = this.props;
    const { route } = this.props;
    const { quantite, price, paniername, nom, adresse } = route.params;

    const { modalVisible, firstName, phoneNumber, email } = this.state;
    return (
      
          
        
        <ScrollView style={styles.container}>
          
          <View style={styles.container}>
            <View style={styles.modalView}>
              <View style={{position: 'absolute', top: 10, right:10}}>
                <Pressable
                  onPress={() => navigation.goBack()}
                >
                  <MaterialIcons  name="close" size={24} color="black" />
                </Pressable>
              </View>
              <Text style={{fontWeight:'bold'}}>{`Vous êtes sur le point de sauver:\n${quantite} panier(s) ${paniername} chez ${nom} pour ${price}€`}</Text>
              <Text>{`Adresse: ${adresse}`}</Text>
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
              <Text style={{marginBottom: 100}}>Paiement sécurisé par stripe</Text>
              <Payment />
              <Button title='payer'  />
              <Text>Créneaux de collecte</Text>
              <Text>{`Lorem Ipsum\nLorem Ipsum\nLorem Ipsum\nLorem Ipsum`}</Text>
            </View>
          </View>
          </ScrollView>
  
        // <View style={styles.container}>
        
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'flex-end',
    //alignItems: "center",
    //marginTop: 22,
    //backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
   // margin: 20,
    //width: '100%',
    //backgroundColor: "white",
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
