import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export default class Price extends PureComponent {
  static defaultProps = {
    price: null,
  };

  render() {
    const { price } = this.props;
    return (
      <View
        style={{
          width: 40,
          //paddingHorizontal: 10,
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "red",
          borderRadius: 25,
        }}
      >
        <Text
          style={{
            padding: 8,
            color: "white",
            textAlign: "center",
          }}
        >{`${price}€`}</Text>
      </View>
    );
  }
}
