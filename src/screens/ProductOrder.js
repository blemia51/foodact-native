import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Modal,
  Alert,
  Pressable,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { EvilIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import Input from "../components/Input";
import Payment from "../components/Payment";
import { MaterialIcons } from "@expo/vector-icons";
import { getTimeFromDate, getLongDate } from "../utils/functions";
import { STRIPE_PUBLIC_KEY_TEST , STRIPE_PUBLIC_KEY_LIVE } from "@env"
import { validateEmail, validatePhone} from "../utils/validatorUtils"
import Reciept from "../screens/Reciept"


export default class ProductOrder extends Component {
  static defaultProps = {
    quantity: 0,
    totalPrice: 0,
    productName: "Légumes variés",
    contractor: {
      address: "rue du magasin",
      name: "magasin",
    },
    modalVisible: false,
  };

  state = {
    nomclient: "",
    telClient: "",
    mailClient: "",
    isFormValid: false,
    errors: {
      mailClient: '',
      telClient: '',
    }
  }

  onChangeText = (key, value) => {
    const { errors } = this.state;
    this.setState(() => ({ 
      [key]: value.trim(), 
      errors: {
        ...errors,
        [key] : '',
      }
    }), this.checkFormValidity);
  };

  checkFormValidity = () => {
    const { nomclient, mailClient, telClient, isFormValid } = this.state;
    let isValid = [nomclient, mailClient, telClient].every((value) => value.length > 0);
    const emailError = validateEmail(mailClient);
    const telError = validatePhone(telClient)
    isValid = isValid ? emailError && telError: false;
    console.log("isValid", isValid);
    if (isValid !== isFormValid) {
      this.setState(() => ({ isFormValid: isValid }));
    }
  };

  handleBlur = () => {
    const { mailClient, telClient, errors } = this.state
    if (!validateEmail(mailClient) && mailClient !== '') {
      this.setState({
        errors: {
          ...errors,
          mailClient: 'Veuillez insérer un email valide'
        }
      })
      return
    }
    
    if (!validatePhone(telClient) && telClient !== '' || telClient.length > 0 && telClient.length !== 10) {
      this.setState({
        errors: {
          ...errors,
          telClient: 'Veuillez insérer un numéro de téléphone valide'
        }
      })
      return
    }
  }

  render() {
    const { navigation, token, userProfile, order } = this.props;
    const { route } = this.props;
    const {
      quantite,
      price,
      paniername,
      nom,
      adresse,
      creneaux,
      date,
      amount,
      mailfournisseur,
      telFournisseur,
    } = route.params;
    
    const { nomclient, telClient, mailClient, errors } = this.state;
    const collectDays = Object.values(creneaux).reduce((acc, day) => {
      if (day !== "id") {
        acc.push(day);
      }
      return acc;
    }, []);
    console.log("order redux", order);

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Image
                source={require("../assets/foodact_logo_bleu.png")}
                style={{ width: "60%" }}
                resizeMode="contain"
              />
              <View style={{ position: "absolute", top: 10, right: 10 }}>
                <Pressable onPress={() => navigation.popToTop()}>
                  <MaterialIcons name="close" size={24} color="black" />
                </Pressable>
              </View>
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingHorizontal: 14,
                }}
              >
                {`Vous êtes sur le point de sauver\n${quantite} `}
                <Text style={{ fontWeight: "normal" }}>panier(s)</Text>{" "}
                {`${paniername} `}
                <Text style={{ fontWeight: "normal" }}>chez</Text> {`${nom} `}
                <Text style={{ fontWeight: "normal" }}>pour</Text> {`${price}€`}
              </Text>
              {/* <View style={styles.lineStyle} /> */}
              <View style={{ flexDirection: "row", paddingVertical: 6 }}>
                <Text style={{ fontSize: 12, textAlign: "center" }}>
                  <EvilIcons name="location" size={20} color="black" />
                  {`${adresse}`}
                </Text>
              </View>
              {/* <View style={styles.lineStyle} /> */}
              <Text>
                {`Limite de retrait le`}
                <Text style={{ fontWeight: "bold", color: "#ff6600" }}>
                  {" "}
                  {`${getLongDate(parseInt(date))} `} {getTimeFromDate(
                    parseInt(date))!=='00h00' && `à ${getTimeFromDate(
                      parseInt(date))}`}
                  
                </Text>
              </Text>
              {!token && (
                <View style={{ width: "85%" }}>
                  <Input
                    value={nomclient}
                    label="Prénom"
                    name="nomclient"
                    placeholder=""
                    autoCapitalize="none"
                    onChangeText={this.onChangeText}
                  />
                  <Input
                    value={telClient}
                    label="Téléphone"
                    name="telClient"
                    placeholder=""
                    autoCapitalize="none"
                    onChangeText={this.onChangeText}
                    onBlur={this.handleBlur}
                    errorMessage={errors["telClient"]}
                    hasError={errors["telClient"] !== ''}
                  />
                  <Input
                    value={mailClient}
                    label="Email"
                    name="mailClient"
                    placeholder=""
                    autoCapitalize="none"
                    onChangeText={this.onChangeText}
                    onBlur={this.handleBlur}
                    errorMessage={errors["mailClient"]}
                    hasError={errors["mailClient"] !== ''}
                  />
                </View>
              )}

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>
                  Paiement sécurisé par stripe
                </Text>
                <Image
                  source={require("../assets/stripe-payment_7.png")}
                  style={{ width: "25%", height: 50 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ width: "85%", paddingBottom: 12 }}>
                
                <StripeProvider publishableKey={STRIPE_PUBLIC_KEY_LIVE}>
                  <Payment
                    navigation={navigation}
                    nomclient={nomclient|| userProfile && userProfile.nom}
                    telClient={telClient || userProfile && userProfile.tel}
                    mailclient={mailClient || userProfile && userProfile.email}
                    commande_id={order && order.id}
                    amount={amount}
                    qte={quantite}
                    mailfournisseur={mailfournisseur}
                    telFournisseur={telFournisseur}
                    adresseFournisseur={adresse}
                    nomFournisseur={nom}
                    nomPanier={paniername}
                    token={token}
                    price={price}
                  /> 
                </StripeProvider>
              </View>
              <Text style={{ fontWeight: "bold" }}>{`Créneaux de collecte`}</Text>
              <View style={{ alignItems: "center", paddingBottom: 14 }}>
                {collectDays
                  .filter((collectDay) => collectDay.isActive)
                  .map((day) => (
                    <View key={day.id} style={{ alignItems: "center" }}>
                      <Text>
                        {`${day.dayName}: ${getTimeFromDate(
                          day.start
                        )} - ${getTimeFromDate(day.end)}`}
                      </Text>
                      {(day.marche !== "Aucun" && day.marche)
                        && (
                          <Text style={{ fontSize: 11, color: "#ff6600" }}>
                            {day.marche}
                          </Text>
                        )}
                    </View>
                  ))}
              </View>
            </View>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    );
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
    paddingTop: 20,
    alignItems: "center",
  },
  field: {
    width: 300,
    color: "#449aeb",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    margin: 6,
    width: "90%",
  },
});
