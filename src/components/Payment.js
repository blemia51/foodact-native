import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

import Button from "../components/Button";
import { API_URL } from "@env";

const Payment = (props) => {
  const {
    nomclient,
    telClient,
    mailclient,
    mailfournisseur,
    telFournisseur,
    nomFournisseur,
    adresseFournisseur,
    commande_id,
    amount,
    qte,
    nomPanier,
  } = props;
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  console.log("props de paiement", props);

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${API_URL}/stripe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          qte: qte,
          commande_id: commande_id,
          mailfournisseur: mailfournisseur,
          mailclient: mailclient,
          nomPanier: nomPanier,
          nomFournisseur: nomFournisseur,
          telFournisseur: telFournisseur,
          adresseFournisseur: adresseFournisseur,
          nomclient: nomclient,
          telClient: telClient,
        }),
      });
      const { client_secret } = await response.json();
      return client_secret;
    } catch (e) {
      console.log("erreur", e);
    }
  };

  const handlePayPress = async () => {
    console.log("detail carte", cardDetails);
    if (!cardDetails?.complete || !mailclient) {
      Alert.alert(
        "",
        "Veuillez compléter le detail de votre carte de credit ainsi que vos prénom, téléphone et email"
      );
      return;
    }
    const billingDetails = {
      email: mailclient,
    };

    const client_secret = await fetchPaymentIntentClientSecret();
    const { paymentIntent, error } = await confirmPayment(client_secret, {
      type: "Card",
      billingDetails,
    });
    if (error) {
      console.log("Payment confirmation error", error);
    } else if (paymentIntent) {
      //console.log('Success from promise', paymentIntent.status);
      Alert.alert("Paiement validé", "");
    }
  };

  return (
    <View style={styles.container}>
      <CardField
        style={styles.cardContainer}
        cardStyle={styles.card}
        postalCodeEnabled={false}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Button onPress={handlePayPress} title="Payer" disabled={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  cardContainer: {
    height: 50,
    marginVertical: 10,
  },
  card: {
    fontSize: 14,
  },
});

export default Payment;
