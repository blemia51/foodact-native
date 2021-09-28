import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Prediction = ({
  main_text, secondary_text, onPress
}) => {
  const [val, setVal] = useState(`${main_text} ${secondary_text}`)
  //console.log('val', val)

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => onPress(val)}>
          <Text numberOfLines={1}>{main_text} {secondary_text}</Text>
        </TouchableOpacity>
        <View style={styles.lineStyle}></View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: 2,
    //width: '90%'
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    margin: 6,
    width: "90%",
  },
});

export default Prediction
