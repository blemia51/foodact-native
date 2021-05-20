import React, { PureComponent } from 'react';
import{ View, Text, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default class Collect extends PureComponent {
  
  static defaultProps = {
    collectTime: 'uyuyuyuyuy',
  }


  render() {
    const { collectTime } = this.props;
    return (
      // <View style={{ justifyContent: 'center', width: '40%', paddingHorizontal:10, position: 'absolute', bottom: 10, left: 0}}>
      <View style={styles.container} >
        <EvilIcons name="clock" size={24} color="black" />
        <Text style={{color:'grey'}}>{collectTime}</Text>
      </View> 
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    position: 'absolute', 
    left: 10, 
    bottom: 10, 
    paddingHorizontal:4, 
    backgroundColor: 'white', 
    width: '40%',
    paddingVertical:2 ,
    borderRadius: 5
  },
})
