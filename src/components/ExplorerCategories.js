import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

export default function ExplorerCategories(props) {
  const { categories } = props

  const Item = ({nom, id}) => {
    return (
      <View style={styles.container}>
        <View style={styles.categorie}>
          <Text style={styles.categorieName}>{nom}</Text>
        </View>
      </View>
    )
  }

  const renderItem = ({item}) => {
    return(
      <Item
        id={item.id}
        nom={item.nom}
      />
    )
  }

  return (
    <FlatList
      horizontal
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8
  },
  categorie: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 12,
    //margin: 8,
    borderRadius:8
    
  },
  categorieName: {
    fontWeight: 'bold',
    color: 'lightgrey'
  }
})
