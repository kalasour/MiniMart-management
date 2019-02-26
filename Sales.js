import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from 'native-base'
export default class Sales extends Component {
  static navigationOptions = {
    drawerIcon: ({tintColor}) => {
      return (<Icon style={{width:30,color:tintColor}} name="shopping-cart" type="Feather" />);
    }
  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
