import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
import { RNCamera } from "react-native-camera";
import { Thumbnail } from "native-base";
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

  componentDidMount() {
    // this.requestCameraPermission();
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
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          onBarCodeRead={async(e) => {
            // console.log(e);
            // this.setState({ BarcodeID: e.data });
            // this.props.navigation.navigate("SelectedItem", {
            //   BarcodeID: e.data
            // });

            const { navigation } = this.props;
            await navigation.getParam("AddToList", "NO-ID")(e.data)
            await this.props.navigation.goBack();
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
        </RNCamera>
      </View>
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
