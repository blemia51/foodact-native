
import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordion extends Component {

	constructor(props) {
		super(props);
		this.state = {
			response: props.response,
			expanded: false,
		}

		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	toggleExpand = () => {
		const { expanded } = this.state;
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expanded: !expanded })
	}

	render() {
		const { expanded } = this.state;
		const { question, response } = this.props;
		return (
			<View>
				<TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
					<Text style={[styles.title, styles.font]}>{question}</Text>
					<Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color='grey' />
				</TouchableOpacity>
				
				{expanded &&
					<View style={styles.child}>
						<Text>{response}</Text>
					</View>
				}
				<View style={styles.lineStyle} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 14,
		fontWeight: 'bold',
    color: "#16214b",
		width: '80%'
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 38,
		paddingLeft: 25,
		paddingRight: 18,
		alignItems: 'center',
		//backgroundColor: 'lightgrey',
	},
	lineStyle: {
    borderWidth: 0.5,
    borderColor: "lightgrey",
    marginVertical: 12,
  },
	child: {
		//backgroundColor: 'lightgrey',
		paddingLeft: 25,
	}

});
