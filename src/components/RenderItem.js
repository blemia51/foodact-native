import React, { Component } from "react";
import Item from "./Item";
import { updateDate } from '../utils/functions'

export default class RenderItem extends Component {

  timeOut = (value, creneaux) => {
    const date = new Date();
    const newDate = updateDate(value, creneaux);
    return newDate - Date.parse(date) > 0 ? false : true;
  };

  render() {
    const { item, navigation, latitude, longitude } = this.props;
    return (
      <Item
        navigation={navigation}
        date={
          updateDate(
            item.paniers.DateExpirAffichage,
            item.creneaux
          )
        }
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
        isTimeOut={this.timeOut(
          item.paniers.DateExpirAffichage,
          item.creneaux
        )}
      />
    );
  }
}