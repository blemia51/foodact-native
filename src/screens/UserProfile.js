import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class UserProfile extends Component {

  state = {
    profil: {
      firstname: "",
      phone_number: "",
      email: "",
      password: "",
    },
    user: [],
    isAdded: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { 
      firstName,
      phoneNumber,
      email 
    } = props.userProfile;

    const {
      profil: {
        firstName: stateFirstName, 
        phoneNumber: statePhone,
        email: stateEmail,
      }
    } = state;

    const stateNotHydrated = stateFirstName === '' && 
        stateEmail === '' && 
        statePhone === '' ;

    if (stateNotHydrated) {
      return {
        profil: {
          firstName, 
          phoneNumber,
          email
        }
      };
    }
    return state;
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
