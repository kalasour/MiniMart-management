import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Icon} from 'native-base'
export default class Discount extends Component {
  static navigationOptions = {
    drawerIcon: ({tintColor}) => {
      return (<Icon style={{width:30,color:tintColor}} name="burst-sale" type="Foundation" />);
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
