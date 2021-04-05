import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export default class Discount extends PureComponent {
  static defaultProps = {
    discount: null,
  };

  render() {
    const { discount } = this.props;

    if (!discount || discount==='') {
      return null;
    }

    return (
      <View
        style={{
          width: 70,
          paddingHorizontal: 10,
          position: "absolute",
          top: 10,
          right:50
        }}
      >
        <Text
          style={{
            padding: 8,
            borderRadius: 5,
            backgroundColor: "green",
            color: "white",
            textAlign: "center",
          }}
        >
          {`-${discount}%`}
        </Text>
      </View>
    );
  }
}

Discount.propTypes = {
  discount: PropTypes.string
}
