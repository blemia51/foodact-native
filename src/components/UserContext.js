import React from 'react'
import { View } from 'react-native'

export const UserContext = (props) => {
  const isLoggedContext = React.createContext(props.isLogged);
console.log('isLoggedContext', isLoggedContext)
return (
  <View>

  </View>
)
}