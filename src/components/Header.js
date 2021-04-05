import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.image}>
        <Image
          source={require("../assets/foodact_logo.png")}
          style={{ width: "50%" }}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 11,
            textAlign: "center",
            paddingTop: 4,
          }}
        >
          Click and Collect Remois Anti Surstocks Alimentaires
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#16214b",
    paddingTop: 40,
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
    width: "80%",
    paddingVertical: 20,
  },
});

export default Header;
