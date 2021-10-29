import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Modal,
  Pressable
} from "react-native";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Button from "../components/Button";
import { API_KEY } from "@env"


export default class ModalAddAddress extends Component {
  state = {
    modalVisible: null,
    address: "",
    predictions: []
  };

  onPlaceSelect = (val) => {
    this.setState(
      () => ({ address: val })
    )
  }

  onChangeText = (key, val) => {
    //this.setState(() => ({ [key]: val.trim() }), this.checkFormValidity)
    this.setState(
      () => ({ [key]: val }),
      () => console.log("state", this.state.address)
    );
  };

  _attemptGeocodeAsync = async () => {
    this.setState({ inProgress: true, error: null });
    try {
      const response = await Location.geocodeAsync(this.state.address);
      this.setState({ response });
    } catch (e) {
      this.setState({ error: e.message });
    } finally {
      this.setState({ inProgress: false });
      console.log('le state modaladress', this.state)
    }
  };


  render() {
    const { address, predictions } = this.state;
    const { navigation, modalVisible, setModalVisible, backgroundColor } = this.props;
    //console.log('props modal', this.props)
    return (
     
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        //statusBarTranslucent={true}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          this.setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>  
          <Pressable style={{ position: "absolute", top: 18, right: 8 }}
            onPress={() => setModalVisible(!modalVisible)}
            //onPress={() => navigation.pop()}
          >
            <MaterialIcons name="close" size={24} color="black" />
          </Pressable>
          <Text style={{fontWeight: "bold"}}>Veuillez saisir votre adresse</Text>
          <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log('les details',data, details);
            }}
            query={{
              key: API_KEY,
              language: 'fr',
              //type: 'geocode'
            }}
            currentLocation={true}
            currentLocationLabel='Utiliser ma position'
            filterReverseGeocodingByType={['locality']}
            isRowScrollable={false}

            styles={{
              container: {
                //flex: 1,
                //justifyContent: 'flex-start',
                //alignItems: 'center',
                marginTop: 18,
                width: "90%",
                //marginBottom:50
              },
              textInputContainer: {
                flexDirection: "row",
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: 'lightgrey',
                alignItems: "center"
              },
              textInput: {
                backgroundColor: '#FFFFFF',
                height: 40,
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 10,
                fontSize: 15,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
                paddingHorizontal: 8,
                width: "90%"
              },
              description: {
                paddingHorizontal: 8,
                width: "90%"
              },
              row: {
                width: "90%"
              }
            }}
          />
          <Button
            title="ajouter"
            onPress={() => {
              this._attemptGeocodeAsync()
              //navigation.navigate("Home");
              //DevSettings.reload();
            }}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "flex-end",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "white",
    
  },
  modalView: {
    flex: 1,
   //height: 280,
    // margin: 20,
    width: '100%',
    backgroundColor: "white",
    //borderRadius: 20,
    paddingVertical: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
