import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function ExplorerCategories(props) {
  const { categories, renderItem, selectedId } = props;

  //const [selectedId, setSelectedId] = useState(5);

  // aa

  // const renderItem = ({ item }) => {
  //   const color = item.id === selectedId ? "#16214b" : "lightgrey";
  //   return (
  //     <Item
  //       id={item.id}
  //       nom={item.nom}
  //       onPress={() => setSelectedId(item.id)}
  //       textColor={{ color }}
  //     />
  //   );
  // };

  return (
    <FlatList
      horizontal
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      extraData={selectedId}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categorie: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  categorieName: {
    fontWeight: "bold",
    color: "lightgrey",
  },
});
