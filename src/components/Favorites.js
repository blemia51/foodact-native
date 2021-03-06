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

  componentDidMount() {
    const { isFavorite } = this.props
    this.setState({
      isFavorites: isFavorite
    })
  }

  render() {
    const { isFavorites } = this.state;
    const { categorie, addFavorites, removeFavorites, isFavorite } = this.props;
    //console.log("les props", this.props);
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            !isFavorites
              ? (this.setState({
                  isFavorites: !isFavorites,
                }),
                addFavorites(categorie))
              : 
                (this.setState({
                  isFavorites: !isFavorites,
                }),
                removeFavorites(categorie));
          }}
        >
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
