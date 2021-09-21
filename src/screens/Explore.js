import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, SafeAreaView } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import ExplorerCategories from "../containers/ExplorerCategoriesContainer";
import { paniersAndFournisseur } from "../utils/dataToRenderFunctions";
import { updateDate } from "../utils/functions";

const window = Dimensions.get("window");

export default function Explore(props) {
  const {
    navigation,
    location: { latitude, longitude },
    fournisseurs,
    paniers,
    paniersName,
    paniersPrice,
    creneauxFournisseurs,
  } = props;

  const paniersFournisseur = paniersAndFournisseur(
    fournisseurs,
    paniers,
    creneauxFournisseurs,
    paniersName,
    paniersPrice
  );
  //console.log("paniersFournisseur", paniersFournisseur);

  const intitialLocation = {
    region: {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.121,
    }
  }

  const [selectedId, setSelectedId] = useState(5);
  const [dimensions, setDimensions] = useState({ window });
  const [location, setLocation] = useState(intitialLocation)

  const onChange = ({ window }) => {
    setDimensions({ window });
  };

  const onRegionChange = (region) => {
    setLocation(region)
    console.log('region', region)
    console.log('location', location)
  }

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  const { width, height } = dimensions;
  console.log("dimensions", dimensions);

  const Item = ({ nom, id, onPress, textColor }) => {
    return (
      <View style={styles.containerItem}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.categorie}>
            <Text style={[styles.categorieName, textColor]}>{nom}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const color = item.id === selectedId ? "#ff6600" : "#16214b";
    return (
      <Item
        id={item.id}
        nom={item.nom}
        onPress={() => setSelectedId(item.id)}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={{ width, height, flex: 1, zIndex: 10 }}
        showsUserLocation
        //followsUserLocation
        showsMyLocationButton
        loadingEnabled
        mapPadding={{ top: 1, bottom: 10, rigth:50 }}
        region={location.region}
        //onRegionChangeComplete={onRegionChange}
      >
        {paniersFournisseur &&
          paniersFournisseur
            .filter(
              (fournisseur) =>
                fournisseur &&
                fournisseur.longitude !== null &&
                fournisseur.latitude !== null &&
                fournisseur.paniers.categorie === `/api/categories/${selectedId}`
            )
            .map((data) => (
              <Marker
                icon={require('../assets/shop_orange.png')}
                key={data.paniers.id}
                coordinate={{
                  latitude: parseFloat(data.latitude),
                  longitude: parseFloat(data.longitude),
                }}
                title={data.nom}
                description={data.adresse}
                pinColor="orange"
              >
                {/* <Callout tooltip>
              <View style={{padding: 15, borderRadius: 12, backgroundColor: 'white'}}>
                <Text>{data.nom}
                <Image source={require('../assets/compass.png')} style={{ height: 60, width: 60 }} resizeMode="cover" />
                </Text> 
              </View>
            </Callout> */}
              </Marker>
            ))}
      </MapView>
      <View style={styles.categoriesContainer}>
        <ExplorerCategories renderItem={renderItem} selectedId={selectedId} />
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
    width,
    height,
  },
  categoriesContainer: {
    position: "absolute",
    top: 55,
    left: 10,
    right: 10,
    zIndex: 20,
    paddingVertical: 5,
  },
  categorie: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  categorieName: {
    fontWeight: "bold",
    color: "lightgrey",
  },
  containerItem: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
