import React, { PureComponent } from "react";
import { StyleSheet, View, ScrollView, Image, DevSettings, Alert } from "react-native";
import _ from "lodash";

import Input from "../components/Input";
import Button from "../components/Button";
import { validateEmail, validatePhone} from "../utils/validatorUtils"

export default class SignUp extends PureComponent {
  state = {
    userProfile: {
      nom: "",
      mail: "",
      tel: "",
      Password: "",
      passwordConfirmation: "",
    },
    errors: {
      mail: '',
      tel: '',
      Password: '',
      passwordConfirmation: '',
    },
    isFormValid: false,
  };

  static defaultProps = {
    postSuccess: {
      client: 0,
      etat: "",
      user: 0,
    }
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postSuccess && prevProps.postSuccess !== this.props.postSuccess) {
      console.log ('toooooooooooooooooooooooooooooooooo', prevProps)
    }
  }

  handleBlur = () => {
    const { userProfile: { mail, Password, tel }, errors } = this.state
    if (!validateEmail(mail) && mail !== '') {
      this.setState({
        errors: {
          ...errors,
          mail: 'Veuillez insérer un email valide'
        }
      })
      return
    }
    
    if (!validatePhone(tel) && tel !== '' || tel.length > 0 && tel.length !== 10) {
      this.setState({
        errors: {
          ...errors,
          tel: 'Veuillez insérer un numéro de téléphone valide'
        }
      })
      return
    }

    if (Password !== '' && Password.length < 6) {
      this.setState({
        errors: {
          ...errors,
          Password : 'Votre mot de passe doit comporter au moins 6 caractères'
        }
      })
      return
    }
  }

  onChangeText = (key, val) => {
    const { userProfile, errors } = this.state;
    // if (key === 'mail' && val !== '' && !validateEmail(val)) {
    //   this.setState({
    //     userProfile: {
    //       ...userProfile, 
    //       [key]: val.trim() 
    //     },
    //     errors: {
    //       ...errors,
    //       [key] : 'Veuillez insérer un email valide'
    //     }
    //   });
    //   return;
    // }

    // if (key ==='Password' && val !== '' && val.length < 6 ) {
    //   this.setState({
    //     userProfile: {
    //       ...userProfile, 
    //       [key]: val.trim() 
    //     },
    //     errors: {
    //       ...errors,
    //       [key] : 'Votre mot de passe doit comporter au moins 6 caractères'
    //     }
    //   });
    //   return;

    // }

    console.log('validateEmail', validateEmail(val))

    
    this.setState(() => ({
      userProfile: {
        ...userProfile, 
        [key]: val.trim() 
      },
      errors: {
        ...errors,
        [key] : '',
      }
    }),
    //console.log('validateEmail', validateEmail(val)),
      this.checkFormValidity
    )
    //this.setState(() => ({ [key]: val.trim() }),() => console.log("state",this.state))
  };

  checkFormValidity = () => {
    const {
      userProfile: { 
        nom, mail, tel, Password, passwordConfirmation
      },
      isFormValid,
    } = this.state;
    
    let isValid = [nom, mail, tel, Password].every((value) => value.length > 0);
    const emailRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const passwordError = _.isEqual(Password, passwordConfirmation);
    const emailError = emailRegex.test(mail);
    const telError = tel.length === 10
    isValid = isValid ? emailError && passwordError && telError: false;
    console.log("pass error", passwordError);
    console.log("isValid", isValid);
    if (isValid !== isFormValid) {
      this.setState(() => ({ isFormValid: isValid }));
    }
  };

  render() {
    const {
      userProfile,
      userProfile: { 
        nom, mail, tel, Password, passwordConfirmation 
      },
      errors,
      isFormValid,
    } = this.state;
    console.log("stateuser", this.state);

    console.log("propsUser", this.props);

    const { postUserProfile, navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.signUpContainer}>
          <Image
            source={require("../assets/foodact_logo_bleu.png")}
            style={{ width: "60%" }}
            resizeMode="contain"
          />
          <View style={{ width: "80%", marginBottom: 10 }}>
            <Input
              value={nom}
              label="Prenom"
              name="nom"
              placeholder=""
              autoCapitalize="none"
              onChangeText={this.onChangeText}
            />
            <Input
              value={tel}
              label="Téléphone"
              name="tel"
              placeholder=""
              autoCapitalize="none"
              onChangeText={this.onChangeText}
              onBlur={this.handleBlur}
              errorMessage={errors["tel"]}
              hasError={errors["tel"] !== ''}
            />
            <Input
              value={mail}
              label="Email"
              name="mail"
              placeholder=""
              autoCapitalize="none"
              onChangeText={this.onChangeText}
              onBlur={this.handleBlur}
              errorMessage={errors["mail"]}
              hasError={errors["mail"] !== ''}
            />
            <Input
              value={Password}
              label="Mot de passe"
              name="Password"
              placeholder=""
              autoCapitalize="none"
              secureTextEntry
              onChangeText={this.onChangeText}
              onBlur={this.handleBlur}
              errorMessage={errors["Password"]}
              hasError={errors["Password"] !== ''}
            />
            <Input
              value={passwordConfirmation}
              label="Confirmer votre mot de passe"
              name="passwordConfirmation"
              placeholder=""
              autoCapitalize="none"
              secureTextEntry
              onChangeText={this.onChangeText}
            />
          </View>
          <Button
            style={styles.button}
            title="S'inscrire"
            onPress={() => {
              postUserProfile(userProfile);
              console.log('props ajout utilisateur', this.props)
              if (this.props.postSuccess.etat === 'success') {
                Alert.alert(
                  "Félicitation !",
                  "Bienvenue dans la famille FOODACT !\nValidez votre mail pour profiter de notre app.\nN'oubliez pas de checker vos SPAMS",
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressed') }
                  ],
                  { cancelable: false }
                  )
              }
              
              DevSettings.reload()
              //navigation.navigate('Home')
            }}
            size="sm"
            backgroundColor="#ff6600"
            disabled={!isFormValid}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
});
