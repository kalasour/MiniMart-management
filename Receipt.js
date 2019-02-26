import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Icon} from 'native-base'
export default class Receipt extends Component {
  static navigationOptions = {
    drawerIcon: ({tintColor}) => {
      return (<Icon style={{width:30,color:tintColor}} name="receipt" type="FontAwesome5" />);
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
