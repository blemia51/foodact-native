import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { faq_client } from "../utils/faq_client";

export default function FaqClient() {
  const initialState = { isExpanded: false, id: null };
  const [state, setState] = useState(initialState);
  const { isExpanded, id } = state;

  const handlePress = (id) => {
    setState((prevState) => ({
      ...prevState,
      isExpanded: !isExpanded,
      id: id,
    }));
  };

  const Item = ({ itemId, response }) => (
    <Text>{itemId === id  && response}</Text>
  )

  const renderFaq = () => (
    <View>
      {faq_client.map((faq) => (
        <View key={faq.id}>
          <TouchableOpacity onPress={() => handlePress(faq.id)}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.faq}>{faq.question}</Text>
              <MaterialIcons
                name={isExpanded ? "expand-less" : "expand-more"}
                color="grey"
                size={24}
              />
            </View>
            <Item itemId={faq.id} response={faq.response} />
          </TouchableOpacity>
          <View style={styles.lineStyle} />
        </View>
      ))}
    </View>
  );

  return <ScrollView style={styles.container}>{renderFaq()}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingHorizontal: 8,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    marginVertical: 12,
  },
  faq: {
    fontWeight: "bold",
    width: "80%",
    color: "#16214b",
  },
  rep: {
    display: "none",
  },
  repShow: {
    display: "flex",
  },
});
