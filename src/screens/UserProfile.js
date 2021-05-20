import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'

import Input from '../components/Input';
import Button from '../components/Button';

export default class UserProfile extends Component {

  state = {
    profil: {
      prenom: "",
      telephone: "",
      email: "",
      password: "",
    },
    user: [],
    isAdded: false,
  };


  // componentDidMount() {
  //   const { fetchUserProfile, userProfile } = this.props
  //   //fetchUserProfile(1074)
  //   console.log('userProfile', userProfile )
  // }

  // getClientProfile = () => {
  //   //userProfile &&
  //   const clientId = userProfile && userProfile.client.split('/')[3].toString('')*1
  //   console.log('clientId', clientId)
  // }

  
  static getDerivedStateFromProps(props, state) {
    const {
      nom,
      tel,
      email,
      password
    } = props.userProfile;

    const {
      profil: {
        prenom: statePrenom, 
        telephone: stateTelephone,
        email: stateEmail,
        password: statePassword
      }
    } = state;

    const stateNotHydrated = statePrenom === '' && 
        stateEmail === '' && 
        stateTelephone === '' ;

    if (stateNotHydrated) {
      return {
        profil: {
          nom, 
          tel,
          email,
          password
        }
      };
    }
    console.log('state', state)
    return state;
  }

  render() {
    const { userProfile, navigation } = this.props
    console.log('props user Profile', userProfile)
    const { profil: stateProfil } = this.state;

    const inputs = Object.keys(stateProfil).reduce((acc, input) => {
      acc.push(input);
      return acc;
    }, []);
    console.log('inputs', inputs)
    
    return (
      <ScrollView style={styles.comtainer}>
        <View style={styles.inputsContainer}>
          <View style={{width: '80%'}}>
            {React.Children.toArray(inputs.map(input => 
              input==='password' ?
              (<Input
                //noEdit
                defaultValue={stateProfil[input] || ''}
                label={'mot de passe'}
                name={input}
                placeholder=""
                autoCapitalize="none"
                secureTextEntry
                
                //onChange={(value) => this.handleChange(value, input)}
                // hasError={input === 'email' && error !== ''}
                // errorMessage={error}
              />)
              :
            
              <Input
                //noEdit
                defaultValue={stateProfil[input] || ''}
                label={input}
                name={input}
                placeholder=""
                autoCapitalize="none"
                
                //onChange={(value) => this.handleChange(value, input)}
                // hasError={input === 'email' && error !== ''}
                // errorMessage={error}
              />
            ))}
          </View>
          <Button
            title='Sauvegarder'
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
