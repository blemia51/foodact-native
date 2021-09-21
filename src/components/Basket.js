import React, { PureComponent } from 'react';
import{ View, Text } from 'react-native';

export default class Basket extends PureComponent {
  
  static defaultProps = {
    quantite: null,
  }


  render() {
    const { quantite } = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'center', width: '40%', paddingHorizontal:10, position: 'absolute', top: 10, left: 0}}>
        <Text style={{backgroundColor:'#ff6600', color:'white', textAlign:'center', borderRadius: 5, paddingVertical:2}}>{quantite > 1 ?`${quantite} paniers` : `${quantite} panier` }</Text>
      </View>
    )
  }
}
