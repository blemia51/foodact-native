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
import { userProfileFailure } from "../redux/actions/user";
import { or } from "react-native-reanimated";

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
    modalVisible: false,
    firstName: "",
    phoneNumber: "",
    email: "",
  };

  

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  onChangeText = (key, val) => {
    this.setState(() => ({ [key]: val.trim() }), this.checkFormValidity);
    //this.setState(() => ({ [key]: val.trim() }),() => console.log("state", this.state))
  };


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
      mailfournisseur
    } = route.params;
    console.log("date", getTimeFromDate(parseInt(date)).toString());
    const { modalVisible, firstName, phoneNumber, mailclient } = this.state;
    const STRIPE_PUBLIC_KEY_TEST = "pk_test_51GuNRlCg4UkzpRv9jw3LhFRJ4M77Z5CgbxtxWPlZuq8diUEe78JTzzV7dMGGKwQXKtsXTlnuJZXhIaPhRlu2PEWN00zFpRWeVI"
    const STRIPE_PUBLIC_KEY_LIVE = "pk_live_51HlV34Cg8RcqQyrsT9VdMszf0mE6tIUo4eXGEBOfdfVov8T1iP35LzqaLWCEyr4wTFxKLTUHZxy5bdKtiZuxotzL00VXUupS63"
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
                    value={firstName}
                    label="Prénom"
                    name="firstName"
                    placeholder=""
                    autoCapitalize="none"
                    onChangeText={this.onChangeText}
                  />
                  <Input
                    value={phoneNumber}
                    label="Téléphone"
                    name="phoneNumber"
                    placeholder=""
                    autoCapitalize="none"
                    onChangeText={this.onChangeText}
                  />
                  <Input
                    value={mailclient}
                    label="Email"
                    name="mailclient"
                    placeholder=""
                    autoCapitalize="none"
                    onChangeText={this.onChangeText}
                  />
                  {/* <PaymentCardTextField
                    ref={ (ref) => {
                      this.paymentCardInput = ref;
                    }}
                    style={styles.field}
                    numberPlaceholder="XXXX XXXX XXXX XXXX"
                    expirationPlaceholder="MM/YY"
                    cvcPlaceholder="CVC"
                  /> */}
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
                
                <StripeProvider publishableKey={STRIPE_PUBLIC_KEY_TEST}>
                  <Payment 
                    prenom={firstName|| userProfile && userProfile.nom}
                    tel={phoneNumber || userProfile && userProfile.tel}
                    mailclient={mailclient || userProfile && userProfile.email}
                    commande_id={order && order.id}
                    amount={amount}
                    qte={quantite}
                    mailfournisseur={mailfournisseur}
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
    // margin: 20,
    //width: '100%',
    //backgroundColor: "white",
    //borderRadius: 20,
    //padding: 35,
    paddingTop: 20,
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
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
