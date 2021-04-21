import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Explore(props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text>EXPLORER</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
