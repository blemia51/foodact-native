import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function MyFavorites(props) {
  const { myFavorites } = props;

  return (
    <>
      {myFavorites.length < 1 && (
        <View style={styles.container}>
          <Text>
            Vous n'avez pas encore enregitré de categorie dans vos favoris
          </Text>
          <View style={styles.noFavorites}>
            <Text>Cliquez sur le </Text>
            <MaterialIcons name="favorite-border" color="lightgrey" size={24} />
            <Text> pour les ajouter ! </Text>
          </View>
        </View>
      )}
    </>
  );
}

MyFavorites.defaultProps = {
  myFavorites: [],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  noFavorites: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    //alignItems: "flex-start"
  },
});
