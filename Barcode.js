import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Scanbarcode from "react-native-scan-barcode";
import { RNCamera } from "react-native-camera";
export default class Barcode extends Component {
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
          onBarCodeRead={e => {
            // console.log(e);
            // this.setState({ BarcodeID: e.data });
            this.props.navigation.navigate('SelectedItem',{BarcodeID:e.data})
          }}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          barcodeFinderVisible={true}
          barcodeFinderWidth={280}
          barcodeFinderHeight={220}
          barcodeFinderBorderColor="red"
          barcodeFinderBorderWidth={2}
        >
          {/* <Text
            style={{
              backgroundColor: "white"
            }}
          >
            {this.state.BarcodeID}
          </Text> */}
        </RNCamera>
      </View>

      //   <Scanbarcode
      //     onBarCodeRead={e => {
      //       Alert.alert("Barcode: " + e.data);
      //       this.turnOff();
      //     }}
      //     style={{ flex: 1 }}
      //     torchMode={this.state.torchMode}
      //     cameraType={this.state.cameraType}
      //   />
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
