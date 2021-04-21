import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
//import Favorites from "../components/Favorites";
import RenderItemCards from "../components/RenderItemCards"

const ProductCards = ({ route, navigation }) => {
  //console.log('route', route.params.data);
    const { data, id, title, latitude, longitude } = route.params

    useEffect(()=>{
      navigation.setOptions({ title: title })
  },[])
    
  return (
    <View style={styles.container}>
      <FlatList
        removeClippedSubviews
        maxToRenderPerBatch={6}
        initialNumToRender={2}
        data={data}
        //data={paniersAndFournisseurByCategorie(21)}
        //renderItem={renderItem}
        renderItem={({ item }) => (
          <RenderItemCards
            item={item}
            latitude={latitude}
            longitude={longitude}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.paniers.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    backgroundColor: "#ffffff",
    height: 240,
    margin: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: "65%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  title: {
    height: "10%",
    //paddingHorizontal: 10,
  },
  content: {
    paddingHorizontal: 10,
  },
});

export default ProductCards;
