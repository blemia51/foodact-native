import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
// import logoProposer from '../assets/logoProposer.png';
// import compass from '../assets/compass.png';
// import folder from '../assets/folder.png';
// import profile from '../assets/profile.png';
// import accueil from '../assets/accueil.png';
import { MaterialIcons } from '@expo/vector-icons'


export default function Nav({ navigation }) {
  return (
    <View style={styles.navContainer}>
      <View style={styles.icons}>
        <TouchableOpacity  onPress={() => {}}>
          {/* <Image style={styles.logo} source={accueil} /> */}
          <MaterialIcons name='home' color="#16214b" size={30} />

        </TouchableOpacity>
        <Text style={{fontSize:12}}>Accueil</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity  onPress={() => {}}>
          {/* <Image style={styles.logo} source={compass}/> */}
          <MaterialIcons name='explore' color='lightgrey' size={30} />

        </TouchableOpacity>
        <Text style={{fontSize:12}}>Explorer</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => {}}>
          {/* <Image style={styles.logo} source={logoProposer}/> */}
          <MaterialIcons name='favorite-border' color='lightgrey' size={30} />
        </TouchableOpacity>
        <Text style={{fontSize:12}}>Favoris</Text>
      </View>
      {/* <View style={styles.icons}>
        <TouchableOpacity onPress={() => {navigation.navigate('FormTravel')}}>
          <Image style={styles.logo} source={folder}/>
        </TouchableOpacity>
        <Text style={{fontSize:12}}>Voyages</Text>
      </View> */}
        <View style={styles.icons}>
        <TouchableOpacity onPress={() => {}}>
          {/* <Image style={styles.logo} source={profile}/> */}
          <MaterialIcons name='menu' color='lightgrey' size={30} />

        </TouchableOpacity>
        <Text style={{fontSize:12}}>Plus</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopColor: 'lightgrey',
    borderTopWidth: 0.25
  },
  icons: {
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  }
})
