import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default class Favorites extends PureComponent {
  static defaultProps = {
    isDisabled: false,
    isFavorites: false,
    onPress: () => {},
  };

  state = {
    favorites: [],
    isFavorites: false,
  };

  render() {
    const { isFavorites } = this.state;
    return (
      <View>
        <TouchableOpacity onPress={() => {this.setState({isFavorites: !isFavorites})}}>
          <MaterialIcons
            name="favorite-border"
            color={isFavorites ? "#ff6600" : "lightgrey"}
            size={28}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

Favorites.propTypes = {
  isDisabled: PropTypes.bool,
  isFavorites: PropTypes.bool,
  onClick: PropTypes.func,
};
