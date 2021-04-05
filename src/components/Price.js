import React, { PureComponent } from 'react';
import{ View, Text } from 'react-native';

export default class Price extends PureComponent {
  
  static defaultProps = {
    price: null,
  }


  render() {
    const { price } = this.props;
    return (
      <View style={{width: 65, paddingHorizontal:10, position: 'absolute', top: 10, right: 0}}>
        <Text style={{padding: 8, borderRadius:25, backgroundColor:'red', color:'white', textAlign:'center'}}>{`${price}€`}</Text>
      </View>
    )
  }
}
