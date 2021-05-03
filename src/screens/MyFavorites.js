import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function MyFavorites(props) {
  const { favorites, navigation, categories } = props;
  const [fav, setFav] = useState(favorites || []);

  //console.log('props favorites', props)

  // useEffect(() => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     fav: favorites
  //   }));
  // }, [])

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setFav(favorites);
      //console.log('mis a jour', fav)
      renderFavorites();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setFav([]);
      };
    }, [])
  );

  // useEffect(() => {
  //   const isFocus = navigation.addListener('focus', () => {
  //     // Screen was focused
  //     // Do something
  //     setFav(favorites)
  //     console.log('mis a jour', fav)
  //     renderFavorites()
  //   });

  //   return isFocus;

  // }, [navigation])

  useEffect(
    () => {
      setFav(favorites);
    },
    [favorites],
    console.log("rerender?")
  );

  const renderFavorites = () => {
    const categoriesFavorite =
    favorites &&
    categories &&
      favorites.map(id =>
        categories.find(categorie => id === categorie.id).nom)
    return categoriesFavorite.map((data) => (
      <Text key={`${data}_0`} style={styles.category}>
        {data}
      </Text>
    ));
  };

  if (!favorites || favorites.length < 1) {
    return (
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
    );
  }

  return <View>{renderFavorites()}</View>;
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
  category: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#16214b",
  },
  noFavorites: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    //alignItems: "flex-start"
  },
});
