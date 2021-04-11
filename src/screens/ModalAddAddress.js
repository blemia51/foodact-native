import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal, Pressable, DevSettings } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import Button from '../components/Button'
import Input from '../components/Input'

export default class ModalAddAddress extends Component {

  state = {
    modalVisible: true,
    address: '',
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  onChangeText = (key, val) => {
    //this.setState(() => ({ [key]: val.trim() }), this.checkFormValidity)
  this.setState(() => ({ [key]: val.trim() }),() => console.log("state", this.state))

  }

  render() {
    const { address, modalVisible } = this.state;
    const { navigation } = this.props;
    return (
      
        
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
          <View style={styles.container}>
        <View style={styles.modalView}>
        <View style={{position: 'absolute', top: 5, right:5}}>
          <Pressable
            
            //onPress={() => this.setModalVisible(!modalVisible)}
            onPress={() => navigation.pop()}
          >
            <MaterialIcons  name="close" size={24} color="black" />
          </Pressable>
        </View>
          <Text>Veuillez saisir un lieu ou une adresse</Text>
          <Input
            value={address}
            //label='Adresse'
            name='address'
            placeholder=''
            autoCapitalize='none'
            onChangeText={this.onChangeText}
          />
          <Button title='ajouter' onPress={() => DevSettings.reload()} />
          </View>
          </View>
        </Modal>
    
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
})
