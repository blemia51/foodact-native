import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function UserOrders(props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text>COMMANDES</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
