import React, { PureComponent } from "react";
import ItemCard from "./ItemCard";
import { updateDate } from '../utils/functions'

export default class RenderItem extends PureComponent {

  timeOut = (value, creneaux, quantity) => {
    const date = new Date();
    const newDate = updateDate(value, creneaux);
    return newDate - Date.parse(date) <= 0 || quantity < 1 ? true : false;
  };

  render() {
    const { item, navigation, latitude, longitude } = this.props;
    return (
      <ItemCard
        navigation={navigation}
        date={
          updateDate(
            item.paniers.DateExpirAffichage,
            item.creneaux
          )
        }
        creneaux={item.creneaux}
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
          item.creneaux,
          item.paniers.qte
        )}
      />
    );
  }
}
