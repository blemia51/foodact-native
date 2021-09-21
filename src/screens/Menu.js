import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import ModalAddAddress from '../screens/ModalAddAddress'

export default function Menu({ route, navigation, status, token, logOut, ...props }) {

  //console.log('route', route);
  //console.log('props du menu', props)
  
  
  const [isLogged, setIsLogged] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)  
  
  const loadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    //const tokenDecoded = jwtDecode(token)
    console.log("status", status);
    token && setIsLogged(token || '')
  };

  const removeToken = () => {
    logOut()
    setIsLogged(token)
    navigation.navigate('Home')
    console.log('Done.')
    }

  useEffect(() => {
    setIsLogged(token)
    console.log("rerender menu", token)
  }, [token])

  const load = () => {
      token && setIsLogged(true)
    }
  
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      setIsLogged(token)
      console.log('isLogged', isLogged)
      //console.log('le token dans menu', token)
      //console.log('props du menu', props)
      

      
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        //!token && setIsLogged(false)
        console.log('bye bye')
      };
    }, [])
  );

  const setModalVisible = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuItems}>
        <TouchableOpacity
          style={styles.menuItems}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <MaterialIcons name="shopping-cart" color="lightgrey" size={30} />
          <Text style={styles.textItems}>Paniers</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lineStyle} />
      {token ? (
        <>
          <View style={styles.menuItems}>
            <TouchableOpacity
                style={styles.menuItems}
                onPress={() => {
                  navigation.navigate("UserOrders");
                }}
              >
              <MaterialIcons name="event-note" color="lightgrey" size={30} />
              <Text style={styles.textItems}>Mes Paniers</Text>
              </TouchableOpacity>
            </View>

          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItems}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
            <MaterialIcons name="account-circle" color="lightgrey" size={30} />
            <Text style={styles.textItems}>Mon Profil</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.menuItems}>
            <MaterialIcons name="credit-card" color="lightgrey" size={30} />
            <Text style={styles.textItems}>Information Paiement</Text>
          </View> */}

          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItems}
              onPress={() => {
                removeToken()
              }}
            >
              <MaterialIcons name="logout" color="lightgrey" size={30} />
              <Text style={styles.textItems}>Déconnection</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.menuItems}>
            <TouchableOpacity
                style={styles.menuItems}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
              <MaterialIcons name="account-circle" color="lightgrey" size={30} />
              <Text style={styles.textItems}>S'inscrire</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItems}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <MaterialIcons name="login" color="lightgrey" size={30} />
              <Text style={styles.textItems}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.lineStyle} />

      <View style={styles.menuItems}>
        <TouchableOpacity
          style={styles.menuItems}
          onPress={() => {
            navigation.navigate("FAQ");
          }}
        >
          <MaterialIcons name="help-outline" color="lightgrey" size={30} />
          <Text style={styles.textItems}>Comment ça marche ?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lineStyle} />

      <View style={styles.menuItems}>
        <TouchableOpacity
          style={styles.menuItems}
          onPress={() => {
           
          }}
        >
          <MaterialIcons name="location-on" color="lightgrey" size={30} />
          <Text style={styles.textItems}>Me Localiser</Text>
        </TouchableOpacity>
      </View>

      <ModalAddAddress modalVisible={isModalVisible}/>

      <View style={styles.menuItems}>
        <TouchableOpacity
          style={styles.menuItems}
          onPress={() => { }}
        >
          <MaterialIcons name="event-note" color="lightgrey" size={30} />
          <Text style={styles.textItems}>CGU</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    //backgroundColor: '#16214b',
  },
  menuItems: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  textItems: {
    paddingHorizontal: 8,
    fontWeight: "bold",
    color: "#16214b",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    margin: 10,
  },
});
