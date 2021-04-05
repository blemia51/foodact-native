import React, { PureComponent } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class CategorieProducts extends PureComponent {

  getCategories = async () => {
    try {
      let response = await fetch("https://foodact.maresa.ma/api/categories");
      let datas = await response.json();
      const categories = datas
        .filter((data) => data.isActive)
        .sort((a, b) => a.orderCategory - b.orderCategory);

      setState((prevState) => ({
        ...prevState,
        categories: categories,
      }));
      //console.log('categories', categories);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
