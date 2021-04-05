import React, { Component } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';


const params = {
  // mandatory
  number: '4242424242424242',
  expMonth: 11,
  expYear: 17,
  cvc: '223',
  // optional
  // name: 'Test User',
  // currency: 'usd',
  // addressLine1: '123 Test Street',
  // addressLine2: 'Apt. 5',
  // addressCity: 'Test City',
  // addressState: 'Test State',
  // addressCountry: 'Test Country',
  // addressZip: '55555',
};


const options = {
  requiredBillingAddressFields: 'full',
  prefilledInformation: {
    billingAddress: {
      name: 'Gunilla Haugeh',
      line1: 'Canary Place',
      line2: '3',
      city: 'Macon',
      state: 'Georgia',
      country: 'US',
      postalCode: '31217',
    },
  },
};


export default class Payment extends Component {
  
  componentDidMount() {
    Stripe.setOptionsAsync({
      publishableKey: 'pk_test_51IaHc7GWapTjuaBLyg6WwLz4D4AUKM7SaSH1ij1Ia1RH7EnLwGHefFT2jxJEm9DEUueSs4nrPCpagZbFEiW2zG5u003B3l7P3Y',
      androidPayMode: 'test',
    });
    //this.requestPayment()
  }

  requestPayment = async () => {
    const token = await Stripe.paymentRequestWithCardFormAsync(options)
    //const token = await Stripe.createTokenWithCardAsync(params);
    console.log(token);

  };

  render() {
    
    return (
      <View style={styles.container}>
        <Button
          title="Make a payment"
          onPress={() => this.requestPayment()}
          disabled={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
