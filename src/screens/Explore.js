import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import TOTO from '../assets/compass.png'
import  ExplorerCategories from '../containers/ExplorerCategoriesContainer'


const window = Dimensions.get("window");

export default function Explore(props) {
  const {
    navigation,
    location: { latitude, longitude },
    fournisseurs,
  } = props;

  const [dimensions, setDimensions] = useState({ window })

  const onChange = ({ window }) => {
    setDimensions({ window });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  

  const { width, height } = dimensions
  console.log('dimensions', dimensions)

  
  return (
    <View style={styles.container}>
      <MapView
        style={{width, height, flex: 1, zIndex: 10}}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton
        //mapPadding={{ top: 10, bottom: 100 }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.121,
        }}
      >
        {fournisseurs.filter((fournisseur) => fournisseur.longitude !== null && fournisseur.latitude !== null).map(
          data =>
          <Marker
            key={data.id}
            coordinate={{ 
              latitude: parseFloat(data.latitude),
              longitude: parseFloat(data.longitude),
            }}
            title={data.nom}
            //description=" blablabla blablabla"
            pinColor="orange"
          >
            <Callout style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
              <Text>{data.nom}</Text>
                <Text>
                 <Image source={TOTO} style={{ height: 30, width: 30 }} resizeMode="cover" />
                </Text>
              </View>

            </Callout>
          </Marker>
        )}
      </MapView>
      <View  style={styles.categoriesContainer} >
        <ExplorerCategories  />
      </View>
    </View>
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
    top: 30,
    left: 10,
    right: 10,
    zIndex: 20,
  }
});
