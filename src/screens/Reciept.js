import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";

import { EvilIcons, Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import Input from "../components/Input";

import { MaterialIcons,  MaterialCommunityIcons } from "@expo/vector-icons";


export default class Reciept extends Component {
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

  render() {
    const { navigation } = this.props;
    const { route } = this.props;
    const {
      quantite,
      nompanier,
      price,
      nomFournisseur,
      adresseFournisseur,
      telFournisseur,
      code,
      nom,
      adresse,
      creneaux,
      date,
      amount,
      mailfournisseur,
      
    } = route.params;
    console.log(route.params)
    
    // const { nomclient, telClient, mailClient, errors } = this.state;
    // const collectDays = Object.values(creneaux).reduce((acc, day) => {
    //   if (day !== "id") {
    //     acc.push(day);
    //   }
    //   return acc;
    // }, []);
    // console.log("order redux", order);

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
                Merci pour votre commande
              </Text>
                <Text style={{ fontWeight: "normal" }}>Vous venez de sauver:</Text>
                
                <Text style={{ fontWeight: "bold" }}>{`${quantite}`}<Text style={{ fontWeight: "normal" }}> panier(s) </Text>{ `${nompanier} `}<Text style={{ fontWeight: "normal" }}> pour </Text>{ `${price} €`}</Text> 
                <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Code <Text style={{ fontWeight: "bold", color: '#ff6600' }}>{code}</Text> </Text>
              
                <Text style={{ fontSize: 12 }}>{`Partenaire: ${nomFournisseur}`}</Text>
                
                <Text style={{ fontSize: 12 }}><Ionicons name="md-location-outline" size={16} color="black" />{adresseFournisseur}</Text>
                <Text style={{ fontSize: 12 }}>{`Telephone: ${telFournisseur}`}</Text>
                
              <View style={styles.lineStyle} />
              <Text style={{ fontWeight: "normal", textAlign: 'center' }}>Un<Text style={{ fontWeight: "bold" }}> email de confirmation</Text></Text>
              <Text style={{ fontWeight: "normal", textAlign: 'center' }}>va vous être envoyé dans quelques instants</Text>
              <Text style={{ fontWeight: "normal", textAlign: 'center' }}>(pensez à verifier vos Spam)</Text>
              <View style={styles.lineStyle} />
              <Text style={{ fontWeight: "bold" }}>Numéros d'urgence : 07.50.50.61.27</Text>
              
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
