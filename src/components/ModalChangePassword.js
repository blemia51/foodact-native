import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Pressable, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal'; // 2.4.0
import { MaterialIcons } from '@expo/vector-icons'
import Input from './Input';
import Button from './Button';
import { validateEmail } from '../utils/validatorUtils';

export default class ModalChangePassword extends Component {
  state = {
    isModalVisible: null,
    loading: null,
    requestStatus: null,
    userEmail: {
      email: '',
    },
    errors: {
      email: ''
    }
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  componentDidUpdate(prevProps) {
    console.log('prevprops', prevProps.passwordForgotten)
    console.log('props password', this.props.passwordForgotten)
    if (prevProps.passwordForgotten !== this.props.passwordForgotten) {
      console.log('new props', this.props.passwordForgotten)
      this.setState({loading: false})
    }
  }

  onChangeText = (key, val) => {
    const { errors } = this.state
    this.setState(() => ({ 
      userEmail: {
        [key]: val.trim(),
      },
      errors: {
        ...errors,
        [key] : ''
      }
    }))
  }

  handleBlur = () => {
    const { userEmail: { email }, errors } = this.state
    if (!validateEmail(email) && email !== '') {
      this.setState({
        errors: {
          ...errors,
          email: 'Veuillez insérer un email valide'
        }
      })
      return
    }
  }
  
  // _renderButton = (text, onPress) => (
  //   <TouchableOpacity onPress={onPress}>
  //     <View style={styles.button}>
  //       <Text style={{paddingVertical: 15}}>{text}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  _renderModalContent = () => {
    const { userEmail, userEmail: { email }, errors } = this.state
    const { title, token, postPasswordForgotten, passwordForgotten } = this.props
    console.log('props modal', this.props)

    return (
    <View style={styles.modalContent}>
      <View style={{ position: "absolute", top: 5, right: 10 }}>
        <Pressable onPress={() => this.setState({ isModalVisible: null })}>
          <MaterialIcons name="close" size={24} color="black" />
        </Pressable>
      </View>
      <Text style={{fontWeight: 'bold', color: '#16214b'}}>{title}</Text>
      <Text>Veuilez renseigner votre email</Text>
      <View style={styles.inputContainer}>
        <Input
          value={email}
          label="Email"
          name="email"
          placeholder=""
          autoCapitalize="none"
          onChangeText={this.onChangeText}
          onBlur={this.handleBlur}
          errorMessage={errors["email"]}
          hasError={errors["email"] !== ''}
        />
      </View>
      <Button 
        title='envoyer' 
        disabled={!validateEmail(email)} 
        onPress={() => {
          postPasswordForgotten(userEmail)
          console.log('message success', passwordForgotten.messageSuccess)
          this.setState({requestStatus: passwordForgotten.messageSuccess ?  passwordForgotten.messageSuccess :  passwordForgotten.messageErreur  })
        }} 
      />
      <View>
        {/* <ActivityIndicator animating={this.state.loading} size="large" color="#16214b" style={{paddingVertical: 12}} /> */}
        {/* <Text style={{paddingVertical: 12}}>
          Vos allez recevoir les instructions de réinitialisation de mot de passe par Email dans quelques instant.(Pensez à checker vos Spams)
        </Text> */}
        <Text style={{paddingVertical: 12}}>
          {this.state.requestStatus}
        </Text>
      </View>
    </View>
    )
  }
 
  render () {
    const { renderButton, title } = this.props
    
    return (
      <View style={styles.container}>
        {renderButton(`${title}`, () => this.setState({ isModalVisible: 1 }))}
        <Modal isVisible={this.state.isModalVisible === 1} style={styles.bottomModal} backdropOpacity={0.3}>
          {this._renderModalContent()}
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
    
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: 0
  },
  bottomModal: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  inputContainer: {
    width: '100%',
    height: 60,
    marginBottom: 20
  }
})