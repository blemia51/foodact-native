import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function MyFavorites(props) {
  const { favorites } = props;
  const [fav, setFav] = useState()
  console.log('fav', fav)
  console.log('props favorites', favorites)

  useEffect(() => {
    setFav(favorites)
  }, [])

  useEffect(() => {
    setFav(favorites)
  }, [favorites], console.log('rerender?', fav))

  const renderFavorites = () => {
    return (
      <Text>TOTO</Text>
    )
  }

  return (
    <>
      {favorites.length < 1 ? (
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
      )
      :
      <View>
        {renderFavorites()}
      </View>
    }
    </>
  );
}

MyFavorites.defaultProps = {
  favorites: [],
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
