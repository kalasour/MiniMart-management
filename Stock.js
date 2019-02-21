import React, { Component } from "react";
import { Text, View, Alert } from "react-native";
import { Button } from "react-native-elements";

import { createStackNavigator, createAppContainer } from "react-navigation";
export default class Stock extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          <Button
            onPress={() => {
              this.props.navigation.navigate('SelectedItem',{BarcodeID:''})
            }}
            title="Add"
            type="outline"
          />
          <View style={{ width: 25, height: 50 }} />
          <Button
            onPress={() => {
              this.props.navigation.navigate("Cam");
            }}
            title="Scan"
            type="outline"
          />
        </View>
      </View>
    );
  }
}
