import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { getLongDate } from "../utils/functions";
import foodact_animated from "../assets/foodact_fadein.gif";

export default function UserOrders(props) {
  const { navigation, clientOrders, paniersName, paniers } = props;
  const [orders, setOrders] = useState([]);
  const [panierName, setPanierName] = useState([])

  //console.log("paniers nom", paniers)

  useEffect(() => {
    //fetchClientOrders()
  }, []);

  const getPanierId = 
    clientOrders &&
    clientOrders.filter(data => data.paniers.length > 0)
      .map(value => value.paniers.map(
        (name) => name
      )).flatMap(data => data).map(name => name.split('/')[3].toString(''))
      .filter(data => paniers.find(val => val.id === parseInt(data)))
      
      console.log("id panier", getPanierId)

  const getPanier =
    getPanierId.map(data => paniers.find(val => val.id === parseInt(data)).paniername)

    console.log("panier", getPanier)

  const getPanierName =
    getPanier.map(data => paniersName.find(val => `/api/panier_names/${val.id}` === data ).nom)

    console.log("nom panier", getPanierName)

 
  

  useEffect(() => {
    setOrders(clientOrders);
    
    //console.log("client orders", clientOrders);
  }, [clientOrders]);

  //clientOrders && console.log(clientOrders);

  // if (!clientOrders) {
  //   return (
  //     <View style={{
  //       flex: 1,
  //       }}>
  //         {/* <Header /> */}
  //         <View style={{
  //           flex: 1,
  //           alignItems: "center",
  //           justifyContent: "center"
  //         }}>
  //         <Image source={foodact_animated} />
  //       </View>
  //     </View>
  //   );
  // }
  if (clientOrders.length < 1 || getPanierId.length < 1) {
    return (
      <View style={styles.container}>
        <Text>Vous n'avez pas encore commandé de panier </Text>
      </View>
    );
  }
  //console.log("orders", orders);
  return (
    <View style={styles.container}>
      {orders
        .filter((data) => data.paniers.length > 0)
        .map((order) => {
          return (
            <View key={order.id}>
              <Text>
                {`${getLongDate(order.dateCreation)} - ${order.prenom} - ${
                  order.quantite
                } - ${getPanierName} - ${order.prix} €`}
              </Text>
              <View style={styles.lineStyle} />
            </View>
          );
        })}
    </View>
  );
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
