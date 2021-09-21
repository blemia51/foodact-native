import React, { PureComponent } from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native';


export default class Input extends PureComponent {

  render() {
    const { 
      value,
      defaultValue,
      label,
      name, 
      placeholder, 
      onChangeText, 
      hasError,
      errorMessage,
      onBlur,
      ...props
    } = this.props;
    console.log('les props input', this.props)
    return (
      <View style={styles.inputcontainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          value={value}
          defaultValue={defaultValue}
          name={name}
          style={[
            styles.Input,
            hasError && {
              borderColor: 'red'
            }
          ]}
          placeholder={placeholder}
          onChangeText={(value)=> onChangeText(name, value) }
          onBlur={(e) => {onBlur && onBlur()}}
          {...props} 
        />
        <Text 
          style={[
            styles.error,
            hasError && {
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              textAlign: 'left'
            }
          ]}
        >
          {hasError && errorMessage && errorMessage}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputcontainer:{
    flex: 1, 
   // flexDirection: 'row', 
    //alignItems: 'center', 
    width: '100%', 
    justifyContent: 'center', 
    marginTop: 14,
  },
  Input: {
    width: '100%',
    paddingVertical: 1,
    paddingTop: 16,
    paddingLeft: 9,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#ccc',
  },
  label: {
    position: 'absolute',
    top: 8,
    left: 8,
    color: '#999',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  error: {
    display: 'none',
    color: 'red',
    fontSize: 10,
  }
});
