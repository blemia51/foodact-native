import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
//import Favorites from "../components/Favorites";
import Basket from "../components/Basket";
import Price from "../components/Price";
import Discount from "../components/Discount";
import RenderItemCards from "../components/RenderItemCards"

const ProductCards = ({ route, navigation }) => {
  console.log('route', route.params.data);
    const { data, id, title, latitude, longitude } = route.params

    useEffect(()=>{
      navigation.setOptions({ title: title })
  },[])
    
  return (
    <View style={styles.container}>
      
  
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {/* {route.params.title} */}
      </Text>
      
      {/* <View style={styles.card}>
        <View style={styles.image}>
          <TouchableOpacity onPress={() => {navigation.navigate('ProductDetail')}}>
            <Image
              source={{
                uri:
                //`https://files.meilleurduchef.com/mdc/photo/recette/viennoiserie-facile/viennoiserie-facile-640.jpg`,
                  "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fcuisine.2Fguides-cuisine.2Fcongeler-fruits-et-legumes-42221.2F14651477-1-fre-FR.2Fcomment-congeler-les-fruits-et-les-legumes.2Ejpg/850x478/quality/90/crop-from/center/comment-congeler-les-fruits-et-les-legumes.jpeg",
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingHorizontal: 5,
            height: 50,
          }}
        >
          <View style={styles.title}>
            <Text style={{ fontSize: 18 }}>Lorem ipsum</Text>
            <Text style={{ fontSize: 12 }}>Lorem lorem lorem ipsum</Text>
          </View>
        </View>
        <Basket quantity="3 paniers" />
        <Discount discount='-15%' />
        <Price price="4€" />
      </View> */}
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
      
      
      {/* </View> */}
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
