import React, { Component } from 'react'
import Item from './Item'

export default class RenderItem extends Component {

  shouldComponentUpdate() {
    // returns true by default
    return false;
  }

  render() {
    const date = new Date();
    
    //const dateTest = date.setDate(date.getDate() + 1) // tomorrow
    //console.log ('dateTest', new Date(dateTest))
    const { item, navigation, latitude, longitude } = this.props;
    console.log('propsssssssss', item.paniers.DateExpirAffichage)
    //new Date(item.paniers.DateExpirAffichage.setDate(item.paniers.DateExpirAffichage.getDate()+1))
    return (
      <Item
        navigation={navigation}
        date={item.paniers.DateExpirAffichage}
        //date={new Date(item.paniers.DateExpirAffichage.setDate(item.paniers.DateExpirAffichage.getDate()+1))}
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
