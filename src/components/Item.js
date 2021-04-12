import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import { getDistance, getPreciseDistance } from "geolib";
import { EvilIcons } from '@expo/vector-icons'; 
import Basket from './Basket'
import Price from './Price'
import Discount from './Discount'
import CountDown from './CountDown'

const Item = ({
  id,
  isTimeOut,
  date,
  paniername,
  description,
  slug,
  nom,
  adresse,
  quantity,
  price,
  discount,
  lat,
  lng,
  latitude,
  longitude,
  navigation,
}) => { 

  const distance = Math.round(getDistance(
    { latitude: latitude, longitude: longitude },
    { latitude: lat, longitude: lng }
  )/1000*10)/10

  return  (
    <View key={id} style={styles.item}>
      <TouchableOpacity 
        disabled={isTimeOut}
        onPress={() => {
          navigation.navigate('ProductDetail', {
            slug: slug,
            date: date,
            paniername: paniername,
            description: description,
            nom: nom,
            quantite: quantity,
            price: price,
            discount: discount,
            adresse: adresse,
            distance: distance,
          })
        }}
      >
        <View style={{width: '100%'}}>
        <Image
          source={{
            uri: `http://foodact.maresa.ma/${slug}`,
          }}
          style={{
            width: 220,
            height: 110,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            overflow: "hidden",
            opacity: isTimeOut ? 0.4 : 1,
          }}
          resizeMode="cover"
          alt="food"
        />
        </View>
        {!isTimeOut &&
          <Basket quantity={quantity} />
        }
        <Price price={price} />
        <Discount discount={discount} />
        <CountDown date={date} />
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
          <View style={{ justifyContent: "flex-start" }}>
            <Text style={styles.title}>{paniername}</Text>
            <View style={{flexDirection: 'row', alignItems: "center"}}>
            <Text style={{ fontSize: 11, marginTop: 0 }}>
              {`${nom}  - `}<EvilIcons name="location" size={18} color="black" />{`${distance} km`}
            </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
)}

export default Item;
  

const styles = StyleSheet.create({
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
})