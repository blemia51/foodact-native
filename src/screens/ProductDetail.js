import React, { PureComponent } from "react";
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
//import ProductOrder from "../screens/ProductOrder";
import CountDown from "../components/CountDown";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";

export default class ProductDetail extends PureComponent {
  state = {
    order: {
      fournisseur: '',
      prix: null,
      client: '',
      quantite: null,
      paniers: [],
      tel: null,
      prenom: null,
      email: null
    },
    price: null,
    basket: null,
    modalVisible: false,
  };

  componentDidMount() {
    const { route, userProfile } = this.props;
    const { qte, price, discount, fournisseur_id, panier_id } = route.params;

    console.log('la route pour commande', route.params)
    console.log('le profil existe ?', userProfile)

    this.setState((prevState) => ({
      ...prevState,
      order: {
        fournisseur: `api/fournisseurs/${fournisseur_id}`,
        paniers: [`api/paniers/${panier_id}`],
        client: userProfile ? `api/private/clients/${userProfile.id})` : null,
        prix: price,
        quantite: 1,
        prenom: userProfile ? userProfile.nom : null,
        tel: userProfile ? userProfile.tel : null,
        email: userProfile ? userProfile.email : null,
      },
      price: price,
      basket: qte,
      
    }),() => console.log('le state pour commande', this.state));

    //console.log('le state pour commande', this.state)
  }

  handelIncrease = () => {
    const { order: { quantite, prix }, basket } = this.state;
    const { route } = this.props;
    const { price, discount } = route.params;
    if (quantite < basket) {
      this.setState((prevState) => ({
        ...prevState,
        order: {
          quantite: quantite + 1,
          prix: prix + price,
        },
      }));
    }
  };

  handelDecrease = () => {
    const { order: { quantite, prix } } = this.state;
    const { route } = this.props;
    const { price, discount } = route.params;
    if (quantite > 1) {
      this.setState((prevState) => ({
        ...prevState,
        order: {
          quantite: quantite - 1,
          prix: prix - price,
        },
      }));
    }
  };

  

  setModalVisible = (visible) => {
    this.setState((prevState) => ({ ...prevState, modalVisible: visible }));
  };

  render() {
    const { basket, modalVisible, order, order: { quantite, prix } } = this.state;
    const { route, navigation, postOrder } = this.props;
    const {
      slug,
      date,
      creneaux,
      paniername,
      description,
      nom,
      qte,
      price,
      discount,
      adresse,
      distance,
      fournisseur_id,
      panier_id,
      mailfournisseur,
      telFournisseur,
    } = route.params;
    console.log('state detail', this.state);

    console.log('order', order)


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
          <Basket quantite={`${qte}`} />
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

          <View style={styles.quantite}>
            <TouchableOpacity
              onPress={() => {
                this.handelDecrease();
              }}
              disabled={quantite === 1}
            >
              <FontAwesome
                style={styles.icon}
                name="minus-square"
                size={36}
                color={quantite > 1 ? "#ffce00" : "lightgrey"}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {" "}
              {quantite}{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.handelIncrease();
              }}
              disabled={quantite >= basket}
            >
              <FontAwesome
                style={styles.icon}
                name="plus-square"
                size={36}
                color={quantite < basket ? "#ffce00" : "lightgrey"}
              />
            </TouchableOpacity>
            <Text
              style={{ position: "absolute", right: 20 }}
            >{`Total   ${prix} €`}</Text>
          </View>

          <View style={styles.lineStyle} />

          <View style={{ alignItems: "center" }}>
            <Button
              title="Validez"
              backgroundColor="#ffce00"
              onPress={() => {
                postOrder(order)
                navigation.navigate(
                  'ProductOrder', {
                    creneaux: creneaux,
                    date: date,
                    paniername: paniername,
                    nom: nom,
                    quantite: quantite,
                    price: prix,
                    adresse: adresse,
                    amount: price,
                    mailfournisseur: mailfournisseur,
                    telFournisseur: telFournisseur
                  }
              )}}
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
  quantite: {
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
