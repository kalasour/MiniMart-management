import React, { Component } from "react";
import { StyleSheet, View, Alert, Image, Vibration, PermissionsAndroid } from "react-native";
import { RNCamera } from "react-native-camera";
import { Thumbnail, Text, Button, Toast, Root } from "native-base";
export default class BarcodeSale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torchMode: "off",
      cameraType: "back",
      CamOn: false,
      BarcodeID: ""
    };
  }
  async requestVibratePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.VIBRATE,
        {
          title: 'Vibration Permission',
          message:
            'this App needs access to your vibration ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the vibration');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  componentDidMount() {
    // this.requestVibratePermission();
  }
  barcodeReceived(e) {
    Alert.alert("Barcode: " + e.data);
    turnOff();
    // console.log("Type: " + e.type);
  }

  turnOff() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <Root>
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            onBarCodeRead={e => {
              if (e.data != this.state.BarcodeID) {
                Vibration.vibrate(100);

              }
              this.setState({ BarcodeID: e.data });
            }}
            permissionDialogTitle={"Permission to use camera"}
            permissionDialogMessage={
              "We need your permission to use your camera phone"
            }
          >
            <Image
              style={{ flex: 1, width: 250, height: 250, resizeMode: "contain" }}
              source={require("./assets/rect.png")}
            />
            <Button block bordered
              style={{ borderColor: "#87cefa" }}
              onPress={() => {
                const { navigation } = this.props;
                navigation.getParam("AddToList", "NO-ID")(this.state.BarcodeID)

                // this.props.navigation.goBack();
              }}><Text>{this.state.BarcodeID}</Text></Button>
          </RNCamera>
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
