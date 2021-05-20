import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function LogoHeader()  {
  return (
    <View style={styles.header}>
      <View style={styles.image}>
        <Image
          source={require("../assets/foodact_logo_text.png")}
          style={{ width: "100%" }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    //backgroundColor: "#16214b",
    paddingTop: 20,
    paddingBottom: 15,
    //borderBottomColor: "#ffffff",
    //borderBottomWidth: 1,
    alignItems: "center",
  },
  image: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //width: "80%",
    paddingVertical: 20,
  },
});
