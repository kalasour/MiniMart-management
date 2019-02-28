import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import {
  createDrawerNavigator,
} from "react-navigation";
import Stock from "./Stock";
import Sales from "./Sales";
import Receipts from "./Receipt";
import Report from "./Report";
import {Icon} from 'native-base'
import Discount from "./Discount";
class Main extends Component {
  static navigationOptions = {
    drawerIcon: ({tintColor}) => {
      return (<Icon style={{ width: 30, color: tintColor }} name="md-contact" type="Ionicons" />);
    }
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  signout() {
    this.props.navigation.navigate("Home");
  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
        <Button onPress={() => this.signout()} title="Logout" type="outline" />
      </View>
    );
  }
}

const AppNavigator = createDrawerNavigator(
  {
    Stock: Stock,
    Sales: Sales,
    Receipts: Receipts,
    Report: Report,
    Discount: Discount,
    Profile: Main
  },
  {
    initialRouteName: "Stock",
    drawerWidth: 200
  }
);
export default AppNavigator;
