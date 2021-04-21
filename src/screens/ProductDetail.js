import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Button from "../components/Button";
import Basket from "../components/Basket";
import Price from "../components/Price";
import Discount from "../components/Discount";
import ProductOrder from "../screens/ProductOrder";
import CountDown from "../components/CountDown";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import Navigation from "../stacks/Navigation";

export default class ProductDetail extends Component {
  state = {
    quantity: 1,
    price: 6,
    totalPrice: 6,
    basket: 5,
    modalVisible: false,
  };

  componentDidMount() {
    const { route } = this.props;
    const { quantite, price, discount } = route.params;

    this.setState((prevState) => ({
      ...prevState,
      totalPrice: price,
      basket: quantite,
      price: price,
    }));
  }

  handelIncrease = () => {
    const { quantity, totalPrice, basket } = this.state;
    const { route } = this.props;
    const { price, discount } = route.params;
    if (quantity < basket) {
      this.setState((prevState) => ({
        ...prevState,
        quantity: quantity + 1,
        totalPrice: totalPrice + price,
      }));
    }
  };

  handelDecrease = () => {
    const { quantity, totalPrice } = this.state;
    const { route } = this.props;
    const { price, discount } = route.params;
    if (quantity > 1) {
      this.setState((prevState) => ({
        ...prevState,
        quantity: quantity - 1,
        totalPrice: totalPrice - price,
      }));
    }
  };

  setModalVisible = (visible) => {
    this.setState((prevState) => ({ ...prevState, modalVisible: visible }));
  };

  render() {
    const { totalPrice, basket, modalVisible, quantity } = this.state;
    const { route, navigation } = this.props;
    const {
      slug,
      date,
      paniername,
      description,
      nom,
      quantite,
      price,
      discount,
      adresse,
      distance,
    } = route.params;
    //console.log('route', route);
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.image}>
            <Image
              source={{
                uri: `http://foodact.maresa.ma/${slug}`,
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
          <Basket quantity={`${quantite}`} />
          <Price price={`${price}`} />
          <Discount discount={discount} />
          <CountDown date={date} />
          <Text style={styles.title}>{`${paniername} chez ${nom}`}</Text>
          <Text style={styles.address}>
            {`${adresse}  - `}
            <EvilIcons name="location" size={18} color="grey" />
            {`${distance} km`}
          </Text>

          <View style={styles.lineStyle} />

          <Text style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
            {description && `${description}`}
          </Text>

          {description && <View style={styles.lineStyle} />}

          <View style={styles.quantity}>
            <TouchableOpacity
              onPress={() => {
                this.handelDecrease();
              }}
              disabled={quantity === 1}
            >
              <FontAwesome
                style={styles.icon}
                name="minus-square"
                size={36}
                color={quantity > 1 ? "#ffce00" : "lightgrey"}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {" "}
              {quantity}{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.handelIncrease();
              }}
              disabled={quantity >= basket}
            >
              <FontAwesome
                style={styles.icon}
                name="plus-square"
                size={36}
                color={quantity < basket ? "#ffce00" : "lightgrey"}
              />
            </TouchableOpacity>
            <Text
              style={{ position: "absolute", right: 20 }}
            >{`Total   ${totalPrice} €`}</Text>
          </View>

          <View style={styles.lineStyle} />

          <View style={{ alignItems: "center" }}>
            <Button
              title="Validez"
              backgroundColor="#ffce00"
              onPress={() =>
                navigation.navigate(
                  'ProductOrder', {
                    paniername: paniername,
                    nom: nom,
                    quantite: quantity,
                    price: totalPrice,
                    adresse: adresse,
  
                  }
              )}
            />
          </View>
          {/* <ProductOrder modalVisible={modalVisible} /> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 180,
  },
  title: {
    paddingHorizontal: 8,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "grey",
    paddingVertical: 8,
  },
  address: {
    paddingHorizontal: 8,
    fontSize: 12,
    textAlign: "center",
    color: "grey",
    paddingVertical: 4,
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  icon: {
    paddingHorizontal: 8,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    margin: 6,
  },
});
