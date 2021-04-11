import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import CheckBox from '@react-native-community/checkbox';
import Input from "../components/Input";
import Button from "../components/Button";

class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
    //isFormValid: false,
  };

  checkFormValidity = () => {
    const { username, password, isFormValid } = this.state;
    
    let isValid = [username, password].every((value) => value.length > 0);
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const emailError = emailRegex.test(username);
    isValid = isValid ? emailError : false;
    if (isValid !== isFormValid) {
      this.setState(() => ({ isFormValid: isValid }));
    }
  };

  onSubmit = async () => {
    //const { username, password } = this.state
    const { navigation } = this.props

    try {
      let response = await fetch("https://foodact.maresa.ma/api/login_check", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(this.state),
      });

      let datas = await response.json();
      console.log("le token", datas.token);
      datas &&
        (await AsyncStorage.setItem("token", datas.token),
        navigation.navigate('Home')
        );

    } catch (error) {
      console.error("erreur de connexion", error);
    }
  };

  onChangeText = (key, val) => {
    //this.setState(() => ({ [key]: val.trim() }), this.checkFormValidity)
    this.setState(
      () => ({ [key]: val.trim() }),
      () => console.log("testtttt", this.state)
    );
  };

  render() {
    const { navigation } = this.props;
    const { username, password, isFormValid } = this.state;
    console.log("state", this.state);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.signInContainer}>
          <Image
            source={require("../assets/foodact_logo_bleu.png")}
            style={{ width: "60%" }}
            resizeMode="contain"
          />
          <View style={{ width: "80%" }}>
            <Input
              value={username}
              label="email"
              name="username"
              placeholder=""
              autoCapitalize="none"
              onChangeText={this.onChangeText}
            />
            <Input
              value={password}
              label="Mot de passe"
              name="password"
              placeholder=""
              autoCapitalize="none"
              secureTextEntry
              onChangeText={this.onChangeText}
            />
          </View>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <CheckBox
                tintColors={{ true: '#ff6600', false: 'lightgrey'}}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              /> */}
              <Text>Se souvenir de moi</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <CheckBox
                tintColors={{ true: '#ff6600', false: 'lightgrey' }}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              /> */}
              <Text>Accepter les CGU</Text>
            </View>

            <Button
              style={styles.button}
              title="Se connecter"
              onPress={() => {
                this.onSubmit();
                //navigation.navigate('HomeConnected')
              }}
              size="sm"
              backgroundColor="#ff6600"
              //disabled={!isFormValid}
            />
            <Text>Nouveau chez FoodAct ?</Text>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <MaterialIcons
                  name="account-circle"
                  color="#ffce00"
                  size={60}
                />
                <Text>Inscription</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 0,
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    paddingLeft: 5,
    marginTop: 12,
    paddingTop: 12,
  },
  text: {
    paddingLeft: 10,
  },
  title: {
    textAlign: "left",
    fontSize: 24,
    textTransform: "uppercase",
    marginLeft: 5,
  },
  button: {
    marginTop: 0,
    width: "100%",
    marginBottom: 0,
  },
  logo: {
    marginTop: 120,
    marginBottom: 40,
    alignItems: "center",
  },
});

export default SignIn;
