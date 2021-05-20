
import React, {Component} from 'react';
import { StyleSheet, ScrollView} from 'react-native';

import Accordion from '../components/Accordion';
import { faq_client } from "../utils/faq_client";

export default class FaqClient extends Component {

  constructor(props) {
    super(props);
    this.state = {
      faq_client: faq_client
     }
  }

  renderAccordions = () => {
    const { faq_client } = this.state;
    const items = [];
    faq_client.map(item => {
      items.push(
        <Accordion
          key={item.id}
          question={item.question}
          response={item.response}
        />
      )
    })
    return items
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        { this.renderAccordions() }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 14,
  }
});
