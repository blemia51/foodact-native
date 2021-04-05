import React, { Component } from 'react'
import Item from './Item'

export default class RenderItem extends Component {

  shouldComponentUpdate() {
    // returns true by default
    return false;
  }

  render() {
    const date = new Date();
    const { item, navigation, latitude, longitude } = this.props;
    //console.log('propsssssssss', this.props)
    return (
      <Item
        navigation={navigation}
        date={item.paniers.DateExpirAffichage}
        paniername={item.paniername}
        description={item.paniers.description}
        slug={item.paniers.image}
        nom={item.nom}
        adresse={item.adresse}
        quantity={item.paniers.qte}
        price={item.panierprix}
        discount={item.paniers.reduction}
        lat={item.latitude}
        lng={item.longitude}
        latitude={latitude}
        longitude={longitude}
        isTimeOut={
          Date.parse(item.paniers.DateExpirAffichage) - Date.parse(date) >= 0
            ? false
            : true
        }
      />
    )
  }
}
