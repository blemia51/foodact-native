import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import { getLongDate } from "../utils/functions";

export default function UserOrders(props) {
  const { navigation, route, clientOrders, paniersName, paniers, userProfile, fetchClientOrders, orderStatus } = props;
  const [orders, setOrders] = useState([]);
  const [isOrder, setIsOrder] = useState(false)
  console.log("navigation", navigation);
  console.log("route", route);

  // useEffect(() => {
  //   const email = userProfile.email
  //   console.log('email', email)
  //   fetchClientOrders(email)
  //   setOrders(clientOrders)
  //   console.log('props order status', orderStatus)
  // }, []);

  useEffect(() => {
    setOrders(clientOrders);
    setIsOrder(true)
    console.log("client orders", clientOrders);
    console.log("orders state", orders);
  }, [clientOrders, orderStatus]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('status status', orderStatus)
      const email = userProfile.email
      console.log('email', email)
      fetchClientOrders(email)
      setOrders(clientOrders)
      setIsOrder(true)
      console.log('props order status', orderStatus)

      
      return () => {
        setIsOrder(false)
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('bye bye', orders)
        //navigation.popToTop()
      };
    }, [])
  );

if (orderStatus==='loading' || !isOrder) {
  return (
    <View style={styles.container}>
      <ActivityIndicator  size="large" color="#16214b" />
    </View>
  )
}

  if (orderStatus==='success' && isOrder && orders.length < 1 ) {
    return (
      <View style={styles.container}>
        <Text>Vous n'avez pas encore commandé de panier </Text>
      </View>
    );
  }

  if (isOrder && orderStatus==='success') {
    return (
      <View style={styles.container}>
        {clientOrders && clientOrders
          .filter((data) => data.paniers.length > 0)
          .map((order) => {
            return (
              <View key={order.id}>
                <Text>
                  {`${getLongDate(order.dateinsertion)} - ${order.quantite
                  } - ${order.paniers[0].paniername.nom} - ${order.fournisseur.nom} - ${order.prix} €`}
                </Text>
                <View style={styles.lineStyle} />
              </View>
            );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 12,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    margin: 6,
    width: "90%",
  },
});
