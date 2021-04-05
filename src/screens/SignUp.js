import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import Input from '../components/Input';
import Button from '../components/Button';


export default class SignUp extends Component {

  state = {
    firstName: '',
    phoneNumber: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isFormValid: true,
  }

  onChangeText = (key, val) => {
    this.setState(() => ({ [key]: val.trim() }), this.checkFormValidity)
  //this.setState(() => ({ [key]: val.trim() }),() => console.log("state",this.state))

}


  render() {
    const {
      firstName,
      phoneNumber,
      email,
      password,
      passwordConfirmation,
      isFormValid
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.signUpContainer}>
          <Image 
            source={require('../assets/foodact_logo_bleu.png')}
            style={{ width: "60%" }}
            resizeMode="contain"
          />
          <View style={{width: '80%'}}>
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
            <Input
              value={password}
              label='Mot de passe'
              name='password' 
              placeholder=''
              autoCapitalize='none'
              secureTextEntry
              onChangeText={this.onChangeText}
            />
            <Input
              value={passwordConfirmation}
              label='Confirmer votre mot de passe'
              name='password' 
              placeholder=''
              autoCapitalize='none'
              secureTextEntry
              onChangeText={this.onChangeText}
            />
          </View>
          <Button
            style={styles.button}
            title="S'inscrire" 
            onPress={() => {
              //navigation.navigate('HomeConnected')
            }}
            size="sm"
            backgroundColor="#ff6600"
            disabled={!isFormValid}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  signUpContainer:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 0,
  },
})
