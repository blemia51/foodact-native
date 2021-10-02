import React, { PureComponent } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'

import Input from '../components/Input';
import Button from '../components/Button';

export default class UserProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      profil: {
        userid: "",
        nom: "",
        adresse: "",
        email: "",
        phone: "",
        //password: "",
      },
      user: [],
      isAdded: false,
    };
  }
  
  static getDerivedStateFromProps(props, state) {
    const {
      id,
      user,
      nom,
      adresse,
      email,
      tel
    } = props.userProfile;

    const {
      profil: {
        userid: stateUserId ,
        nom: statePrenom,
        email: stateEmail,
        phone: stateTelephone
      }
    } = state;

    const stateNotHydrated = statePrenom === '' && 
        stateEmail === '' && 
        stateTelephone === '' &&
        stateUserId === ''

    if (stateNotHydrated) {
      return {
        profil: {
          userid: id,
          nom: nom,
          adresse: adresse,
          email: email,
          phone: tel
        }
      };
    }
    return state;
  }

  handleChange = (key, val) => {
    const { profil } = this.state;
    this.setState(() => ({
      profil: {
        ...profil,
        [key]: val,
      }
    }))
  }

  render() {
    const { userProfile, updateUserProfile, navigation, token } = this.props
    console.log('props user Profile', this.props)
    const { profil: stateProfil } = this.state;
    console.log('stateProfil', stateProfil)

    return (
      <ScrollView style={styles.comtainer}>
        <View style={styles.inputsContainer}>
          <View style={{width: '80%', marginBottom: 20}}>
            <Input
              defaultValue={stateProfil['nom'] }
              label='nom'
              name='nom'
              placeholder=""
              autoCapitalize="none"
              onChangeText={this.handleChange}
              //onChangeText={(value) => this.handleChange(input, value)}
              // hasError={input === 'email' && error !== ''}
              // errorMessage={error}
            />
            <Input
              defaultValue={stateProfil['email'] }
              label='email'
              name='email'
              placeholder=""
              autoCapitalize="none"
              onChangeText={this.handleChange}
              // hasError={input === 'email' && error !== ''}
              // errorMessage={error}
            />
            <Input
              defaultValue={stateProfil['phone'] }
              label='tel'
              name='phone'
              placeholder=""
              autoCapitalize="none"
              onChangeText={this.handleChange}
              // hasError={input === 'email' && error !== ''}
              // errorMessage={error}
            />
          </View>
          <Button
            title='Sauvegarder'
            onPress={() => {
              updateUserProfile(stateProfil, token)
              navigation.popToTop()
            }}
            size="sm"
          />
          <Button
            title='Mot de passe oublié ?'
            backgroundColor='red'
            onPress={() => {
              navigation.popToTop()
            }}
            size="sm"
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputsContainer: {
    alignItems: 'center',
    marginTop: 24
  }
})
