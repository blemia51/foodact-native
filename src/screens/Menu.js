import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Menu({ navigation }) {
  const islogged = false;
  return (
    <View style={styles.container}>
      <View style={styles.menuItems}>
        <TouchableOpacity
          style={styles.menuItems}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MaterialIcons name="shopping-cart" color="lightgrey" size={30} />
          <Text style={styles.textItems}>Commander</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lineStyle} />
      {islogged ? (
        <>
          <View style={styles.menuItems}>
            <MaterialIcons name="event-note" color="lightgrey" size={30} />
            <Text style={styles.textItems}>Mes Commandes</Text>
          </View>

          <View style={styles.menuItems}>
            <MaterialIcons name="account-circle" color="lightgrey" size={30} />
            <Text style={styles.textItems}>Mon Profil</Text>
          </View>

          <View style={styles.menuItems}>
            <MaterialIcons name="credit-card" color="lightgrey" size={30} />
            <Text style={styles.textItems}>Information Paiement</Text>
          </View>

          <View style={styles.menuItems}>
            <MaterialIcons name="logout" color="lightgrey" size={30} />
            <Text style={styles.textItems}>Déconnection</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.menuItems}>
            <TouchableOpacity
                style={styles.menuItems}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
              <MaterialIcons name="account-circle" color="lightgrey" size={30} />
              <Text style={styles.textItems}>S'inscrire</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItems}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <MaterialIcons name="login" color="lightgrey" size={30} />
              <Text style={styles.textItems}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.lineStyle} />

      <View style={styles.menuItems}>
        <TouchableOpacity
          style={styles.menuItems}
          onPress={() => {
            navigation.navigate("FAQ");
          }}
        >
          <MaterialIcons name="help-outline" color="lightgrey" size={30} />
          <Text style={styles.textItems}>Comment ça marche ?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lineStyle} />

      <View style={styles.menuItems}>
        <TouchableOpacity
          style={styles.menuItems}
          onPress={() => {
            navigation.navigate('ModalAddAddress')
          }}
        >
          <MaterialIcons name="location-on" color="lightgrey" size={30} />
          <Text style={styles.textItems}>Me Localiser</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuItems}>
        <TouchableOpacity
          style={styles.menuItems}
          onPress={() => { }}
        >

          <MaterialIcons name="event-note" color="lightgrey" size={30} />
          <Text style={styles.textItems}>CGU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    //backgroundColor: '#16214b',
  },
  menuItems: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  textItems: {
    paddingHorizontal: 8,
    fontWeight: "bold",
    color: "#16214b",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    margin: 10,
  },
});
