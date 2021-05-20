import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Favorites from "../components/Favorites";
import Basket from "../components/Basket";
import Price from "../components/Price";

const Card = () => {
  return (
    <View style={styles.card}>
      <View style={styles.image}>
        <Image
          //source={{uri: 'https://i.ibb.co/C9mFqqV/romabella.jpg'}}
          source={{
            uri:
              "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2FFAC.2Fvar.2Ffemmeactuelle.2Fstorage.2Fimages.2Fcuisine.2Fguides-cuisine.2Fcongeler-fruits-et-legumes-42221.2F14651477-1-fre-FR.2Fcomment-congeler-les-fruits-et-les-legumes.2Ejpg/850x478/quality/90/crop-from/center/comment-congeler-les-fruits-et-les-legumes.jpeg",
          }}
          style={{ height: "100%", width: "100%" }}
        />
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
        <Favorites />
      </View>
      <Basket quantity='4 paniers' />
      <Price price='6€' />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Card;
