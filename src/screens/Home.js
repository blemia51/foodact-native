import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Platform,
  Linking,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
//import * as Permissions from "expo-permissions";
import * as Application from 'expo-application';
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { StatusBar } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from "expo-app-loading";
import { updateDate } from "../utils/functions";

import RenderItem from "../components/RenderItem";
import Favorites from "../containers/FavoritesContainer";
import Header from "../components/Header";

import foodact_animated from "../assets/foodact_anim.gif";

const initialState = {
  longitude: null,
  latitude: null,
};

export default function Home(props) {
  const {
    navigation,
    fetchCategories,
    fetchFournisseurs,
    fetchPaniers,
    fetchPaniersName,
    fetchPaniersPrice,
    fetchCreneauxFournisseurs,
    fetchClientOrders,
    userProfile,
    token,
    categories,
    fournisseurs,
    paniers,
    paniersName,
    paniersPrice,
    creneauxFournisseurs,
    orderStatus,
    favorites,
    favoritesDatas,
    uploadLocation,
    putUserPushToken,
    postPushToken,
    getPushToken,
    pushTokens,
  } = props;

  const [userLocation, setUserLocation] = useState(null);
  const [state, setState] = useState(initialState);
  const [isLogged, setIsLogged] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  const { latitude, longitude } = state;

  //console.log('userProfile Home', userProfile)

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        //await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        loadRessources();
        getTokenNotification();
        fetchCategories();
        fetchFournisseurs();
        fetchPaniers();
        fetchPaniersName();
        fetchPaniersPrice();
        fetchCreneauxFournisseurs();
        getPushToken()
        await new Promise(resolve => setTimeout(resolve, 4000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
    // loadRessources();
    // getTokenNotification();
    // fetchCategories();
    // fetchFournisseurs();
    // fetchPaniers();
    // fetchPaniersName();
    // fetchPaniersPrice();
    // fetchCreneauxFournisseurs();
    // getPushToken()
    //fetchClientOrders()
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      latitude,
      longitude,
    }));
    uploadLocation({ latitude: latitude, longitude: longitude });
  }, [latitude, longitude]);

  //console.log("orderstatus", orderStatus);
  //console.log("categorie", categories);
  //console.log("fournisseurs", fournisseurs);


  const loadRessources = async () => {
    try {
      const result = await new Promise.all([
        Location.requestForegroundPermissionsAsync(),
        //Permissions.askAsync(Permissions.LOCATION),
        //Permissions.askAsync(Permissions.NOTIFICATIONS),
      ]);
      const status = result[0].status;
      //const statusNotification = result[1].status;
      console.log("status", result);
      //console.log("statusNotif", statusNotification);

      const pkg = Constants.manifest.releaseChannel
        ? Constants.manifest.android.package
        : "host.exp.exponent";

        console.log('pkg', pkg)

      if (status === "granted") {
        getUserLocation();
      }
    } catch (e) {
      console.error("problem loading ressources", e);
    }
  };

  const getUserLocation = async () => {
    try {
      const {
        coords,
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        LocationActivityType: Location.ActivityType.OtherNavigation,
        maximumAge: 5000,
        timeout: 15000,
      })
      // await Location.getCurrentPositionAsync({ accuracy: 6 });
      console.log("userlocation", latitude, longitude);
      console.log("coords", coords);
      //console.log("Locatopn", Location)
      uploadLocation({ latitude: latitude, longitude: longitude });

      setState((prevState) => ({
        ...prevState,
        latitude,
        longitude,
      }));
    } catch {
      const {
        coords,
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        LocationActivityType: Location.ActivityType.OtherNavigation,
        maximumAge: 5000,
        timeout: 15000,
        });
        uploadLocation({ latitude: latitude, longitude: longitude });

      setState((prevState) => ({
        ...prevState,
        latitude,
        longitude,
      }));
    }
  };

  const getTokenNotification = async () => {
    
    if (Constants.isDevice) {
      const pkg = Constants.manifest.releaseChannel
        ? Constants.manifest.android.package
        : Application.applicationId;

        console.log('pkg', pkg)
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        //alert('Failed to get push token for push notification!');
        Alert.alert(
          "Les Notifications ne sont pas activées",
          "Les activer manuellement dans les parametres ?",
          [
            { text: "Annuler", onPress: () => console.log("cancel") },
            {
              text: "Configurer",
              onPress: () =>
                Platform.OS === "ios"
                  ? Linking.openURL("app-settings:")
                  : IntentLauncher.startActivityAsync(
                      IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
                      { data: `package:${pkg}` }
                    ),
            },
          ],
          { cancelable: false }
        );
        return;
      }
      const tokenNotification = (await Notifications.getExpoPushTokenAsync())
        .data;
      console.log("tokenNotification", tokenNotification);
      if (userProfile && tokenNotification && token) {
        const userId  = userProfile.user.split('/')[4].toString('')*1
        const pushToken  = { pushToken: tokenNotification }
        putUserPushToken(userId, pushToken, token)
      }
      if (tokenNotification && !userProfile) {
        console.log('pushTokens', pushTokens)
        const pushToken  = { pushToken: tokenNotification }
        if (pushTokens.some(e => e.pushToken === tokenNotification)) {
          return
        }
        postPushToken(pushToken)
      }

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

  const favoritesCategories =
    favorites.length > 0
      ? categories &&
        categories.map((data) => ({
          ...data,
          isFavorite: favorites.find((favorite) =>
            data.id === favorite ? true : false
          ),
        }))
      : categories;

  const paniersAndFournisseur =
    fournisseurs &&
    paniers &&
    fournisseurs.flatMap((val) =>
      val.paniers.map((key) => ({
        ...val,
        paniers: paniers.find((data) => data.id === parseInt(key)),
      }))
    );

  const paniersAndFournisseurAddCreneaux =
    creneauxFournisseurs &&
    paniersAndFournisseur &&
    paniersAndFournisseur.map(
      (data) =>
        data && {
          ...data,
          creneaux: creneauxFournisseurs.find(
            (creneau) =>
              `/api/expiration_creaneaus/${creneau.id}` === data.creneaux
          ),
        }
    );

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
          //data.paniers.categorie === `/api/categories/3` &&

          (data.paniers.qte < 1 ||
            //Date.parse(data.paniers.DateExpirAffichage) - Date.parse(date) <= 0)
            updateDate(data.paniers.DateExpirAffichage, data.creneaux) -
              Date.parse(date) <=
              0)
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
            //cat.paniers.categorie === `/api/categories/3` &&

            //Date.parse(cat.paniers.DateExpirAffichage) - Date.parse(date) > 0 &&
            updateDate(cat.paniers.DateExpirAffichage, cat.creneaux) -
              Date.parse(date) >
              0 &&
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
    const favorites = props.favorites;
    console.log("fav", favorites);
    if (favorites.indexOf(id) === -1) {
      favorites.push(id);
      console.log("favfavfav", favorites);
      props.uploadFavorite(favorites);
    }
  };

  const handleRemoveFavorites = (id) => {
    const favorites = props.favorites;
    if (favorites.indexOf(id) !== -1) {
      favorites.splice(favorites.indexOf(id), 1);
      props.uploadFavorite(favorites);
    }
  };


function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = React.useState(false);

  const startAsync = React.useMemo(
    // If you use a local image with require(...), use `Asset.fromModule
    () => () => Asset.fromModule(image).downloadAsync(),
    [image]
  );

  const onFinish = React.useMemo(() => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
      <AppLoading
        // Instruct SplashScreen not to hide yet, we want to do this manually
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

   if (!appIsReady) {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
         onLayout={onLayoutRootView}>
  {/* //       <Text>SplashScreen Demo! 👋</Text> */}
        <Image source={foodact_animated} />
      </View>
     );
   } 
  // else {
  //   return (
  //     <View
  //       style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
  //       onLayout={onLayoutRootView}>
  //       <Text>SplashScreen Demo! 👋</Text>
  //     </View>
  //   );
  // }

  


  // if (
  //   !latitude ||
  //   !longitude ||
  //   !categories ||
  //   !fournisseurs ||
  //   !paniers ||
  //   !paniersPrice ||
  //   !paniersName ||
  //   !creneauxFournisseurs
  // ) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //       }}
  //     >
  //       {/* <Header /> */}
  //       <View
  //         style={{
  //           flex: 1,
  //           alignItems: "center",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <Image source={foodact_animated} />
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header />
      <ScrollView style={styles.container}>
        {favoritesCategories &&
          favoritesCategories.map((categorie) => {
            return (
              <View key={categorie.id}>
                <View style={styles.headerContainer}>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.category}>{categorie.nom}</Text>
                    <Favorites
                      categorie={categorie.id}
                      isFavorite={categorie.isFavorite}
                      //data={paniersAndFournisseurByCategorie(categorie.id)}
                      addFavorites={handleAddFavorites}
                      removeFavorites={handleRemoveFavorites}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ProductCards", {
                        title: categorie.nom,
                        id: categorie.id,
                        data: paniersAndFournisseurByCategorie(categorie.id),
                        latitude: latitude,
                        longitude: longitude,
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
                  initialNumToRender={3}
                  data={paniersAndFournisseurByCategorie(categorie.id)}
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
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 14,
    fontWeight: "bold",
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
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    margin: 0,
    marginTop: 4,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  field: {
    width: 300,
    color: "#449aeb",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
  },
});
