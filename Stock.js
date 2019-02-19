import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements';
export default class Stock extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}>
        <View style={{
          flex: 1,
          alignItems: 'flex-end',
        }}>

          <Button
            onPress={() => { }}
            title="Scan"
            type="outline"
          />
          <View style={{ width: 50, height: 50 }}></View>
        </View>
        <View style={{ width: 50, height: 50 }}></View>
      </View>
    )
  }
}
