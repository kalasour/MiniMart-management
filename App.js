/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from "react-native";
import * as firebase from "firebase";
import Login from "./Login";
import Main from "./Main";
import Cam from "./Barcode";
import BarcodeSale from './BarcodeSale'
import ignoreWarnings from 'react-native-ignore-warnings';
ignoreWarnings('Setting a timer');
import {
  createStackNavigator,
  createAppContainer,
  StackActions,
  NavigationActions
} from "react-navigation";
import SelectedItem from "./SelectedItem";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

var config = {
  apiKey: "AIzaSyBjhx8MyGou8yMBFPrWmzahK1dCnTxG6NE",
  authDomain: "minimart-management.firebaseapp.com",
  databaseURL: "https://minimart-management.firebaseio.com",
  projectId: "minimart-management",
  storageBucket: "minimart-management.appspot.com",
  messagingSenderId: "265380541988"
};
firebase.initializeApp(config);

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { LoggedIn: true };
  }
  componentDidMount() {
    if (this.state.LoggedIn) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Main" })]
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Minimart-Management!</Text>
        <Text style={styles.instructions}>To get started, please Login</Text>
        <Button
          onPress={() => this.props.navigation.navigate("Login")}
          title="Login"
        />
      </View>
    );
  }
}
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: Login,
    Main: {
      screen: Main,
      navigationOptions: {
        header: null
      }
    },
    Cam: Cam,
    BarcodeSale:BarcodeSale,
    SelectedItem: SelectedItem
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
