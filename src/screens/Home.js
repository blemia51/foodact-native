import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  Platform,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
//import MapView from "react-native-maps";


//import Card from "../components/Card";
import Header from "../components/Header";
//import Nav from "../components/Nav";
//import Location from "./src/components/Location";
import Payment from "../components/Payment";
import foodact_animated from "../assets/foodact_fadein.gif";

import RenderItem from "../components/RenderItem";

const initialState = {
  longitude: null,
  latitude: null,
  categories: null,
  fournisseurs: null,
  paniers: null,
  panierNames: null,
  prixPaniers: null,
  creneaux: null,
};

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MTgxNTk4NzQsImV4cCI6MTYxODQxOTA3NCwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6IkZvb2RhY3RBZG1pbiJ9.CzLe9c8ttWyp1UrLx5Y2rNNq6Mme2XeCWxM599af3rSOcN41zGkWuwB-oVRVt3PbQispwit0_c1P-cWvOtfrwQCINqdDpFEGDdr4zGds1EkcgGcFJkK1G1-34WWgbEtH1vY_AXFcp8d9iCHvO9yASiM_11yv4XcC0l7DbyVUCLkqs6wKoiTm992cKVRJ1TZbtA1iiM0Jsi5LfqW9l4SGdIhODY-zTqSQjLn-iAo2UdtHc6d90OHN1q3lokOWvIcZyzlOYSHNGXaOHQs0bGLYCpIEw8IzdLJ86jQZME_Yq8ysTOoL6RDiaS3zl40FNGvAq7OSrH80oiLtlz9f5vVcvCgJVRDg8tI1mdj0l55y8dHW4L5bpyk3w2eOdHFH0zDqqfpRYJSH_LSG5a21zKiizMfa23VEZaMvVcfJpJYmJ4uAgxeX2qnlVhItITOtV6hU-vZWBYbZIIK3cWOY4gH3cpj7ZsYtIQoQ15m0wepSozd73Mfq7SfJRGBS5_E9nVWRCpMJJiC4Q24BhSi-3-ZEPUq3memSQ_RXdotMJmlS7ErTv6d8P-Vc_l8ZaLI37j7rHxdpgtWDfWRvhzNetrGU02rabNpFLu_I2UPFkgIK_fVHibs5bi_Sr431FcW6N7YdYuZdmil9qEscWA2SIiq9XBY-6TMQrCbCXSN2pjAcAtw";

export default function Home(props) {
  const { navigation } = props;
  const [userLocation, setUserLocation] = useState(null);
  const [state, setState] = useState(initialState);
  
  const {
    latitude,
    longitude,
    categories,
    fournisseurs,
    paniers,
    panierNames,
    prixPaniers,
    creneaux,
  } = state;

  const loadRessources = async () => {
    try {
      const result = await new Promise.all([
        Permissions.askAsync(Permissions.LOCATION),
        Permissions.askAsync(Permissions.NOTIFICATIONS),
      ]);
      const status = result[0].status;
      const statusNotification = result[1].status;
      console.log("status", result);
      console.log("statusNotif", statusNotification);

      if (status === "granted") {
        getUserLocation();
      }

      if (statusNotification !== "granted") {
        Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
    } catch (e) {
      console.error("problem loading ressources", e);
    }
  };

  const getUserLocation = async () => {
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setState((prevState) => ({
        ...prevState,
        latitude,
        longitude,
      }));
      //console.log("state", state);
    } catch (e) {
      console.error("error get userLocation", e);
    }
  };

  const getTokenNotification = async () => {
    //   try {
    //     const { status } = await Notifications.getPermissionsAsync();
    //     if (status !== 'granted') {
    //       const { status } = await Notifications.requestPermissionsAsync();
    //       console.log('statusssssssssssaaaaaaaaaaaaaaaaaa', status)
    //     }

    //     console.log('statusssssssssss', status)
    //     let token = await Notifications.getExpoPushTokenAsync()
    //     console.log(token)
    //   } catch (e) {
    //     console.error('token error', e)
    //   }
    // }
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        //alert('Failed to get push token for push notification!');
        Alert.alert(
          "No Notification Permission",
          "please goto setting and on notification permission manual",
          [
            { text: "cancel", onPress: () => console.log("cancel") },
            { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
          ],
          { cancelable: false }
        );
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      //this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  const loadProfie = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("token storage", token);
  };

  const getCategories = async () => {
    try {
      let response = await fetch("https://foodact.maresa.ma/api/categories", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      let datas = await response.json();
      const categories =
        datas &&
        datas
          .filter((data) => data.isActive && data.id !== 22)
          .sort((a, b) => a.orderCategory - b.orderCategory);

      setState((prevState) => ({
        ...prevState,
        categories: categories,
      }));
      //console.log('categories', categories);
    } catch (error) {
      console.error("connexion impossible", error);
    }
  };

  const getFournisseurs = async () => {
    try {
      let response = await fetch("https://foodact.maresa.ma/api/fournisseurs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      let datas = await response.json();
      const fournisseurs =
        datas &&
        datas
          .filter(
            (data) =>
              data.ville === "/api/villes/10" &&
              data.isEnabled &&
              data.paniers.length > 0
          )
          .map((fournisseur) => ({
            id: fournisseur.id,
            nom: fournisseur.nom,
            adresse: fournisseur.adresse,
            latitude: fournisseur.lat,
            longitude: fournisseur.lng,
            creneaux: fournisseur.expirationCreaneau,
            paniers: fournisseur.paniers.map((data) =>
              data.split("/")[3].toString("")
            ),
          }));

      setState((prevState) => ({
        ...prevState,
        fournisseurs: fournisseurs,
      }));
      //console.log("fournisseurs", fournisseurs);
    } catch (error) {
      console.error("connexion impossible", error);
    }
  };

  const getCreneaux = async () => {
    try {
      let response = await fetch(
        "https://foodact.maresa.ma/api/expiration_creaneaus",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let datas = await response.json();
      const creneaux = optimiseCreneaux(datas);

      setState((prevState) => ({
        ...prevState,
        creneaux: creneaux,
      }));

      console.log("creneaux", creneaux);
    } catch (error) {
      console.error(error);
    }
  };

  const optimiseCreneaux = (datas) => {
    const weekCreneaux =
      datas &&
      datas.map((value) => ({
        id: value.id,
        lundi: {
          dayName: 'lundi',
          id: 1,
          isActive: value.lunIsActive,
          start: value.lunStart,
          end: value.lunEnd,
          marche: value.marcheLun,
        },
        mardi: {
          dayName: 'mardi',
          id: 2,
          isActive: value.marIsActive,
          start: value.marStart,
          end: value.marEnd,
          marche: value.marcheMar,
        },
        mercredi: {
          dayName: 'mercredi',
          id: 3,
          isActive: value.merIsActive,
          start: value.merStart,
          end: value.merEnd,
          marche: value.marcheMer,
        },
        jeudi: {
          dayName: 'jeudi',
          id: 4,
          isActive: value.jeuIsActive,
          start: value.jeuStart,
          end: value.jeuEnd,
          marche: value.marcheJeu,
        },
        vendredi: {
          dayName: 'vendredi',
          id: 5,
          isActive: value.venIsActive,
          start: value.venStart,
          end: value.venEnd,
          marche: value.marcheVen,
        },
        samedi: {
          dayName: 'samedi',
          id: 6,
          isActive: value.samIsActive,
          start: value.samStart,
          end: value.samEnd,
          marche: value.marcheSam,
        },
        dimanche: {
          dayName: 'dimanche',
          id: 0,
          isActive: value.dimIsActive,
          start: value.dimStart,
          end: value.dimEnd,
          marche: value.marcheDim,
        }
      }));

    //console.log("week creneaux", weekCreneaux);
    return weekCreneaux

  };
  
  const getPaniers = async () => {
    try {
      let response = await fetch(
        "https://foodact.maresa.ma/api/paniers?is_activated=true&fournisseur.is_enabled=true",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let datas = await response.json();
      const date = new Date();
      //console.log("date", Date.parse(date));

      //.filter(
      //(data) => data.isActivated
      //&& Date.parse(data.DateExpirAffichage) - Date.parse(date) >= 0
      //);
      // const paniersdate = datas
      // .map((panier) => panier.DateExpirAffichage);
      // console.log('date panier', paniersdate)

      setState((prevState) => ({
        ...prevState,
        paniers: datas,
      }));

      //console.log("paniers", paniers);
    } catch (error) {
      console.error(error);
    }
  };

  const getPanierPrice = async () => {
    try {
      let response = await fetch("https://foodact.maresa.ma/api/prix_paniers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      let datas = await response.json();
      const prixPaniers = datas;

      setState((prevState) => ({
        ...prevState,
        prixPaniers: prixPaniers,
      }));

      //console.log('prix paniers', prixPaniers);
    } catch (error) {
      console.error(error);
    }
  };

  const getPanierName = async () => {
    try {
      let response = await fetch("https://foodact.maresa.ma/api/panier_names", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      let datas = await response.json();
      const panierNames = datas;

      setState((prevState) => ({
        ...prevState,
        panierNames: panierNames,
      }));

      //console.log('noms panier', panierNames);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadRessources();
    getTokenNotification();
    loadProfie();
    getCategories();
    getFournisseurs();
    getCreneaux();
    getPaniers();
    getPanierPrice();
    getPanierName();
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      latitude,
      longitude,
      categories,
      fournisseurs,
      paniers,
      prixPaniers,
      panierNames,
    }));
    //console.log("state mis a jour", state);
  }, [
    latitude,
    longitude,
    categories,
    fournisseurs,
    paniers,
    panierNames,
    prixPaniers,
  ]);

  const paniersAndFournisseur =
    fournisseurs &&
    paniers &&
    //categories &&
    fournisseurs.flatMap((val) =>
      val.paniers.map((key) => ({
        ...val,
        paniers: paniers.find((data) => data.id === parseInt(key)),
      }))
    );

  //console.log('paniersAndFournisseur', paniersAndFournisseur)

  const paniersAndFournisseurAddCreneaux =
    creneaux &&
    paniersAndFournisseur &&
    paniersAndFournisseur.map(
      (data) =>
        data && {
          ...data,
          creneaux: creneaux.find(
            (creneau) =>
              `/api/expiration_creaneaus/${creneau.id}` === data.creneaux
          ),
        }
    );

  //console.log('paniersAndFournisseurAddCreneaux', paniersAndFournisseurAddCreneaux)

  const paniersAndFournisseurAddPanierName =
    panierNames &&
    paniersAndFournisseurAddCreneaux &&
    paniersAndFournisseurAddCreneaux.map(
      (data) =>
        data &&
        data.paniers && {
          ...data,
          paniername: panierNames.find(
            (name) => `/api/panier_names/${name.id}` === data.paniers.paniername
          ).nom,
        }
    );

  //console.log('paniersAndFournisseurAddPanierName', paniersAndFournisseurAddPanierName)

  const paniersAndFournisseurAddPanierPrice =
    prixPaniers &&
    paniersAndFournisseurAddPanierName &&
    paniersAndFournisseurAddPanierName.map(
      (data) =>
        data &&
        data.paniers && {
          ...data,
          panierprix: prixPaniers.find(
            (prix) => `/api/prix_paniers/${prix.id}` === data.paniers.prix
          ).prix,
        }
    );

  //console.log('paniersAndFournisseurAddPanierPrice',paniersAndFournisseurAddPanierPrice)

  const paniersAndFournisseurByCategorie = (id) => {
    const date = new Date();
    const soldOut =
      paniersAndFournisseurAddPanierPrice &&
      paniersAndFournisseurAddPanierPrice.reduce((acc, data) => {
        if (
          data &&
          data.paniers &&
          data.paniers.isActivated &&
          data.paniers.categorie === `/api/categories/${id}` &&
          //data.paniers.categorie === `/api/categories/21` &&

          (data.paniers.qte < 1 ||
            Date.parse(data.paniers.DateExpirAffichage) - Date.parse(date) <= 0)
        ) {
          acc.push(data);
        }
        return acc;
      }, []);

    return (
      paniersAndFournisseurAddPanierPrice &&
      paniersAndFournisseurAddPanierPrice
        .filter(
          (cat) =>
            cat &&
            cat.paniers &&
            cat.paniers.isActivated &&
            cat.paniers.categorie === `/api/categories/${id}` &&
            //cat.paniers.categorie === `/api/categories/21` &&

            Date.parse(cat.paniers.DateExpirAffichage) - Date.parse(date) > 0 &&
            cat.paniers.qte > 0
        )
        .sort((a, b) => a.panierprix - b.panierprix)
        .sort(
          (a, b) =>
            Date.parse(a.paniers.DateExpirAffichage) -
            Date.parse(b.paniers.DateExpirAffichage)
        )
        .concat(soldOut)
    );
  };

  if (
    !latitude ||
    !longitude ||
    !state.categories ||
    !state.fournisseurs ||
    !state.paniers ||
    !state.prixPaniers ||
    !state.panierNames ||
    !state.creneaux
  ) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image source={foodact_animated} />
        {/* <ActivityIndicator size="large" color="lightgrey" /> */}
      </View>
    );
  }

  return (
    <>
      <Header />
      {/* <Payment /> */}
      <ScrollView style={styles.container}>
        {categories &&
          categories.map((categorie) => {
            return (
              <View key={categorie.id}>
                <View style={styles.headerContainer}>
                  <Text style={styles.category}>{categorie.nom}</Text>
                  {/* <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductCards", {
                        //title: category.nom,
                      });
                    }}
                  >
                    <Text style={styles.link}>Tout voir</Text>
                  </TouchableOpacity> */}
                </View>

                <FlatList
                  horizontal
                  removeClippedSubviews
                  maxToRenderPerBatch={6}
                  initialNumToRender={2}
                  data={paniersAndFournisseurByCategorie(categorie.id)}
                  //data={paniersAndFournisseurByCategorie(21)}
                  //renderItem={renderItem}
                  renderItem={({ item }) => (
                    <RenderItem
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
          })}
        {/* <PaymentCardTextField
          style={styles.field}
        /> */}
        {/* <Location /> */}
        <StatusBar style="auto" />
        <View
          style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
        >
          {/* <MapView
            style={{height: 150, width: 250 }}
            showsUserLocation
            followsUserLocation
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.025,
            }}
          /> */}
        </View>
      </ScrollView>
      {/* <Nav navigation={navigation} /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 50,
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    //paddingHorizontal: 5,
    fontSize: 14,
    fontWeight: "bold",
    //height: 60,
    marginTop: 0,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#16214b",
  },
  link: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#ff6600",
  },
  image: {
    // width: 50
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    margin: 0,
  },
  field: {
    width: 300,
    color: "#449aeb",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
});
