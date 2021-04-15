import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, createContext } from "react";
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
import { updateDate } from '../utils/functions'
const jwtDecode = require('jwt-decode')

//import Card from "../components/Card";
import Header from "../components/Header";
//import Nav from "../components/Nav";
//import Location from "./src/components/Location";
import Payment from "../components/Payment";
import foodact_animated from "../assets/foodact_fadein.gif";

import RenderItem from "../components/RenderItem";
import Favorites from '../containers/FavoritesContainer'

const initialState = {
  longitude: null,
  latitude: null,
  categories: null,
  fournisseurs: null,
  paniers: null,
  paniersName: null,
  paniersPrice: null,
  creneaux: null,
};

// const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MTgxNzU3NTEsImV4cCI6MTYxODQzNDk1MSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6IkZvb2RhY3RBZG1pbiJ9.FrI2VGRKNl0v801Q-cTAj24fH2ODD40G3B3EpbGflClmoqf7z6_OnPEKV67PWu3qUTwP80sGBeBJYAqUJZ9SuUYdKdQaxW9JrMt_bAkaxUPowMbjmgm-rcMo85fTuG3fHlczw6IhYDGmMdxrro0pqLR6DWJc5vmVL_QzoYOnFB2A4Al9-oMQMJaLmDEinrrGrt-meyWq-BwbVHyK27usAWWI3XGrSkMP2QFEHUwbFIe6tRm-gRUqdlEBL_r2nThptonuOKwNOzPTcmdXGpjGd3Gv1oGoskRzQ7GrjGdBzQAAnUmwtsVnKEAP1_jKk6lw39uNAN4Xdq392FeOj8HFzQm8ucmRGqzFwCjB_t3vEgMpQocJNkfanQaaFVZSVq8Z4gBBjX8Ke1x5D2Etwf2D4HCYei_usQh4ryT2y_Bb3bvZOXwNxwSMFLdfDdJI4FwFW926H8vWBdQJaWl-p35FIeK5OGHvcbtTChjst6zxBo61QBQ6ZKfW2NhvFl2RTpPUOmVL_os6h0Uz2956eRJR-SubbH1DvM6bseYXjcOl1QkHH3g_89XapLjni9bAFWnCrLsTY_e0tf8wNel_3u32gKEFB5qMwlFfSlr0QduI-N267kpgeTS124b3wU-zCAqOJ-L0jO2uxzpDlbbkD375VDgcXHFZTuQMvNRbJFpkdYo";

export const StoreContext = React.createContext(null)

export default function Home(props) {
  const { 
    navigation,
    fetchCategories,
    fetchFournisseurs,
    fetchPaniers,
    fetchPaniersName,
    fetchPaniersPrice,
    categories,
    fournisseurs,
    paniers,
    paniersName,
    paniersPrice

  } = props;
  //console.log('prix des paniers',props.paniersPrice)
  const [userLocation, setUserLocation] = useState(null);
  const [state, setState] = useState(initialState);
  const [isLogged, setIsLogged] = useState(false)

  const {
    latitude,
    longitude,
    //categories,
    //fournisseurs,
    //paniers,
    //paniersName,
    //paniersPrice,
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
      const tokenNotificaion = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('tokenNotificaion', tokenNotificaion);
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
    try {
      const token = await AsyncStorage.getItem("token");
      const tokenDecoded = jwtDecode(token)
      console.log("username", tokenDecoded);
      if (!token) {
        return
      }  
      token && setIsLogged(true)
      console.log("connecté ?", isLogged)
      
    } catch (error) {
      console.error(error)
    }
  };

  
  const getCategories = () => {
    fetchCategories()
    setState((prevState) => ({
      ...prevState,
      categories: categories,
    }));
  }
  // const getCategories = async () => {
  //   try {
  //     let response = await fetch("http://foodact.maresa.ma/api/categories", {
  //       method: "GET",
  //       headers: {
  //         ////Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     let datas = await response.json();
  //     const categories =
  //       datas &&
  //       datas
  //         .filter((data) => data.isActive && data.id !== 22)
  //         .sort((a, b) => a.orderCategory - b.orderCategory);

  //     setState((prevState) => ({
  //       ...prevState,
  //       categories: categories,
  //     }));
  //     //console.log('categories', categories);
  //   } catch (error) {
  //     console.error("connexion impossible", error);
  //   }
  // };

  const getFournisseurs = () => {
    fetchFournisseurs()
    setState((prevState) => ({
      ...prevState,
      fournisseurs: fournisseurs,
    }));

  }

  // const getFournisseurs = async () => {
  //   try {
  //     let response = await fetch("http://foodact.maresa.ma/api/fournisseurs", {
  //       method: "GET",
  //       headers: {
  //         //Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     let datas = await response.json();
  //     const fournisseurs =
  //       datas &&
  //       datas
  //         .filter(
  //           (data) =>
  //             data.ville === "/api/villes/10" &&
  //             data.isEnabled &&
  //             data.paniers.length > 0
  //         )
  //         .map((fournisseur) => ({
  //           id: fournisseur.id,
  //           nom: fournisseur.nom,
  //           adresse: fournisseur.adresse,
  //           latitude: fournisseur.lat,
  //           longitude: fournisseur.lng,
  //           creneaux: fournisseur.expirationCreaneau,
  //           paniers: fournisseur.paniers.map((data) =>
  //             data.split("/")[3].toString("")
  //           ),
  //         }));

  //     setState((prevState) => ({
  //       ...prevState,
  //       fournisseurs: fournisseurs,
  //     }));
  //     //console.log("fournisseurs", fournisseurs);
  //   } catch (error) {
  //     console.error("connexion impossible", error);
  //   }
  // };

  const getCreneaux = async () => {
    try {
      let response = await fetch(
        "http://foodact.maresa.ma/api/expiration_creaneaus",
        {
          method: "GET",
          headers: {
            //Authorization: `Bearer ${token}`,
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

      //.log("creneaux", creneaux);
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

  const getPaniers =  () => {
    fetchPaniers()
    setState((prevState) => ({
      ...prevState,
      paniers: paniers,
    }));


  }
  
  // const getPaniers = async () => {
  //   try {
  //     let response = await fetch(
  //       "http://foodact.maresa.ma/api/paniers?is_activated=true&fournisseur.is_enabled=true",
  //       {
  //         method: "GET",
  //         headers: {
  //           //Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     let datas = await response.json();
  //     const date = new Date();
  //     //console.log("date", Date.parse(date));

  //     //.filter(
  //     //(data) => data.isActivated
  //     //&& Date.parse(data.DateExpirAffichage) - Date.parse(date) >= 0
  //     //);
  //     // const paniersdate = datas
  //     // .map((panier) => panier.DateExpirAffichage);
  //     // console.log('date panier', paniersdate)

  //     setState((prevState) => ({
  //       ...prevState,
  //       paniers: datas,
  //     }));

  //     //console.log("paniers", paniers);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getPanierPrice = () => {
    fetchPaniersPrice()
    setState((prevState) => ({
      ...prevState,
      paniersPrice: paniersPrice,
    }));

  }

  // const getPanierPrice = async () => {
  //   try {
  //     let response = await fetch("http://foodact.maresa.ma/api/prix_paniers", {
  //       method: "GET",
  //       headers: {
  //         //Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     let datas = await response.json();
  //     const prixPaniers = datas;

  //     setState((prevState) => ({
  //       ...prevState,
  //       prixPaniers: prixPaniers,
  //     }));

  //     //console.log('prix paniers', prixPaniers);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getPanierName = () => {
    fetchPaniersName()
    setState((prevState) => ({
      ...prevState,
      paniesrName: paniersName,
    }));
  }

  // const getPanierName = async () => {
  //   try {
  //     let response = await fetch("http://foodact.maresa.ma/api/panier_names", {
  //       method: "GET",
  //       headers: {
  //         //Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     let datas = await response.json();
  //     const panierNames = datas;

  //     setState((prevState) => ({
  //       ...prevState,
  //       panierNames: panierNames,
  //     }));

  //     //console.log('noms panier', panierNames);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
      paniersPrice,
      paniersName,
    }));
  }, [
    latitude,
    longitude,
    categories,
    fournisseurs,
    paniers,
    paniersName,
    paniersPrice,
  ]);

  useEffect(() => {
    setIsLogged
  }, [isLogged])
  


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
    paniersName &&
    paniersAndFournisseurAddCreneaux &&
    paniersAndFournisseurAddCreneaux.map(
      (data) =>
        data &&
        data.paniers && {
          ...data,
          paniername: paniersName.find(
            (name) => `/api/panier_names/${name.id}` === data.paniers.paniername
          ).nom,
        }
    );

  //console.log('paniersAndFournisseurAddPanierName', paniersAndFournisseurAddPanierName)

  const paniersAndFournisseurAddPanierPrice =
    paniersPrice &&
    paniersAndFournisseurAddPanierName &&
    paniersAndFournisseurAddPanierName.map(
      (data) =>
        data &&
        data.paniers && {
          ...data,
          panierprix: paniersPrice.find(
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
            //Date.parse(data.paniers.DateExpirAffichage) - Date.parse(date) <= 0)
            updateDate(data.paniers.DateExpirAffichage, data.creneaux) - Date.parse(date) <= 0)
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

            //Date.parse(cat.paniers.DateExpirAffichage) - Date.parse(date) > 0 &&
            updateDate(cat.paniers.DateExpirAffichage, cat.creneaux) - Date.parse(date) > 0 &&
            cat.paniers.qte > 0
        )
        .sort((a, b) => a.panierprix - b.panierprix)
        .sort(
          (a, b) =>
            // Date.parse(a.paniers.DateExpirAffichage) -
            // Date.parse(b.paniers.DateExpirAffichage)
            updateDate(a.paniers.DateExpirAffichage, a.creneaux) - 
            updateDate(b.paniers.DateExpirAffichage, b.creneaux)
        )
        .concat(soldOut)
    );
  };

  const handleAddFavorites = (id) => {
    const favorites = props.favorites
    if (favorites.indexOf(id) === -1) {
      favorites.push(id)
      props.uploadFavorite(favorites);
      console.log(favorites)
    }
  }

  if (
    !latitude ||
    !longitude ||
    !state.categories ||
    !state.fournisseurs ||
    !state.paniers ||
    !state.paniersPrice ||
    !state.paniersName ||
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
                  <View style={styles.categoryContainer}>
                    <Text style={styles.category}>{categorie.nom}</Text>
                    <Favorites categorie={categorie.id} onPress={handleAddFavorites}/>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductCards", {
                        title: categorie.nom,
                        id: categorie.id,
                        data: paniersAndFournisseurByCategorie(categorie.id),
                        latitude: latitude,
                        longitude: longitude
                        
                      });
                    }}
                  >
                    <Text style={styles.link}>{`Tout voir >`} </Text>
                  </TouchableOpacity>
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
  categoryContainer: {
    flexDirection: 'row'
  },
  field: {
    width: 300,
    color: "#449aeb",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
});
