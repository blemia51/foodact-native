import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import RenderItem from "../components/RenderItem";
import {
  paniersAndFournisseur,
} from "../utils/dataToRenderFunctions";
import { updateDate } from '../utils/functions'

export default function MyFavorites(props) {
  const {
    favorites,
    navigation,
    categories,
    fournisseurs,
    paniers,
    paniersName,
    paniersPrice,
    creneauxFournisseurs,
  } = props;

  const [fav, setFav] = useState(favorites || []);
  const [datas, setDatas] = useState()
  const paniersFournisseur = paniersAndFournisseur(
    fournisseurs,
    paniers,
    creneauxFournisseurs,
    paniersName,
    paniersPrice
  );

  const paniersAndFournisseurByCategorie = (id) => {
    const date = new Date();
    const soldOut =
      paniersFournisseur &&
      paniersFournisseur.reduce((acc, data) => {
        if (
          data &&
          data.paniers &&
          data.paniers.isActivated &&
          data.paniers.categorie === `/api/categories/${id}` &&
          //data.paniers.categorie === `/api/categories/21` &&
  
          (data.paniers.qte < 1 ||
            //Date.parse(data.paniers.DateExpirAffichage) - Date.parse(date) <= 0)
            updateDate(data.paniers.DateExpirAffichage, data.creneaux) -
              Date.parse(date) <=
              0)
        ) {
          acc.push(data);
        }
        return acc;
      }, []);
  
    return (
      paniersFournisseur &&
      paniersFournisseur
        .filter(
          (cat) =>
            cat &&
            cat.paniers &&
            cat.paniers.isActivated &&
            cat.paniers.categorie === `/api/categories/${id}` &&
            //cat.paniers.categorie === `/api/categories/21` &&
  
            //Date.parse(cat.paniers.DateExpirAffichage) - Date.parse(date) > 0 &&
            updateDate(cat.paniers.DateExpirAffichage, cat.creneaux) -
              Date.parse(date) >
              0 &&
            cat.paniers.qte > 0
        )
        .sort((a, b) => a.panierprix - b.panierprix)
        .sort(
          (a, b) =>
            // Date.parse(a.paniers.DateExpirAffichage) -
            // Date.parse(b.paniers.DateExpirAffichage)
            updateDate(a.paniers.DateExpirAffichage, a.creneaux) -
            updateDate(b.paniers.DateExpirAffichage, b.creneaux)
        )
        .concat(soldOut)
    );
  };

  // useEffect(() => {
  //   const paniersFournisseur = paniersAndFournisseur(
  //     fournisseurs,
  //     paniers,
  //     creneauxFournisseurs,
  //     paniersName,
  //     paniersPrice
  //   );
  //   setDatas(paniersFournisseur)
  //   console.log("paniersFournisseur state", datas);
  // }, []);

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
    console.log("rerender?", datas )
  );

  const renderFavorites = () => {
    const categoriesFavorite =
      favorites &&
      categories &&
      favorites.map(
        (id) => ({
          id: id,
          nom: categories.find((categorie) => id === categorie.id).nom,
        })
      )
      console.log('categoriesFavorite', categoriesFavorite)

    return categoriesFavorite.map((data) => (
      <View key={`${data.id}`} >
        <Text  style={styles.category}>
          {data.nom}
        </Text>
        <FlatList
          horizontal
          removeClippedSubviews
          maxToRenderPerBatch={6}
          initialNumToRender={3}
          data={paniersAndFournisseurByCategorie(data.id)}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              latitude={49.258329}
              longitude={	4.031696}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.paniers.id.toString()}
        />
      </View>
    ))
  };

  if (!favorites || favorites.length < 1) {
    return (
      <View style={styles.nofavoritesContainer}>
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

  

  return <ScrollView style={styles.container}>{renderFavorites()}</ScrollView>
}

MyFavorites.defaultProps = {
  favorites: [],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 50,
    // justifyContent: "flex-start",
    // alignItems: "center",
    // paddingHorizontal: 24,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#16214b",
  },
  nofavoritesContainer: {
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
