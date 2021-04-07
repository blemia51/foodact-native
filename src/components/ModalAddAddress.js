import React, { Component } from 'react'
import { Text, StyleSheet, View, Modal } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

import Button from './Button'
import Input from './Input'

export default class ModalAddAddress extends Component {

  state = {
    modalVisible: false,
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
    const { address } = this.state;
    return (
      <View>
        <View style={{position: 'absolute', top: 5, right:5}}>
          <Pressable
            onPress={() => this.setModalVisible(!modalVisible)}
          >
            <MaterialIcons  name="close" size={24} color="black" />
          </Pressable>
        </View>
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
          <Text>Veuillez saisir un lieu ou une adresse</Text>
          <Input
            value={address}
            label='Adresse'
            name='address'
            placeholder=''
            autoCapitalize='none'
            onChangeText={this.onChangeText}
          />
          <Button title='ajouter' />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
