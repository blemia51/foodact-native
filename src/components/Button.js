import PropTypes from "prop-types";
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

TouchableOpacity.defaultProps = { activeOpacity: 0.3 };

const Button = ({ onPress, title, size, backgroundColor, disabled }) => (
  
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.appButtonContainer,
      size === "sm" && {
        paddingHorizontal: 8,
        paddingVertical: 12,
        elevation: 6,
        width: 160,
      },
      backgroundColor && { backgroundColor },
      disabled && { 
        backgroundColor: 'lightgrey',
      },
      
    ]}
  >
    <Text style={[styles.appButtonText, size === "sm" && { fontSize: 14 }]}>
      {title}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.string,
  title: PropTypes.string,
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#ff6600",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 8,
    width: 130,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default Button;
