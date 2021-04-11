import React, { Component } from "react";
import Item from "./Item";
import { convertCollectDay } from '../utils/functions'

export default class RenderItem extends Component {
  
  updateDate = (data, creneaux) => {
    let newDate = new Date(data);
    let collectDay = convertCollectDay(data)
    
    const getCollectTimeByDay = (creneaux) => {
      let collectTime = ''
      switch (collectDay) {
        case 'lundi':
          return collectTime = creneaux && creneaux.lundi && new Date(creneaux.lundi.end).getTime() / 3600 / 1000;
        case 'mardi':
          return collectTime = creneaux && creneaux.mardi && new Date(creneaux.mardi.end).getTime() / 3600 / 1000;
        case 'mercredi':
          return collectTime = creneaux && creneaux.mercredi && new Date(creneaux.mercredi.end).getTime() / 3600 / 1000;
        case 'jeudi':
          return collectTime = creneaux && creneaux.jeudi && new Date(creneaux.jeudi.end).getTime() / 3600 / 1000;
        case 'vendredi':
          return collectTime = creneaux && creneaux.vendredi && new Date(creneaux.vendredi.end).getTime() / 3600 / 1000;
        case 'samedi':
          return collectTime = creneaux && creneaux.samedi && new Date(creneaux.samedi.end).getTime() / 3600 / 1000;
        case 'dimanche':
          return collectTime = creneaux && creneaux.dimanche && new Date(creneaux.dimanche.end).getTime() / 3600 / 1000;
        default:
          return ''
      }
    }

    let collectTimeEnd = getCollectTimeByDay(creneaux)

    return (newDate = newDate
      .setTime(newDate.getTime() + (collectTimeEnd + 1) * 3600 * 1000)
      .toString());
  };

  timeOut = (value, creneaux) => {
    const date = new Date();
    const newDate = this.updateDate(value, creneaux);
    return newDate - Date.parse(date) > 0 ? false : true;
  };

  render() {
    const { item, navigation, latitude, longitude } = this.props;
    return (
      <Item
        navigation={navigation}
        date={
          this.updateDate(
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
