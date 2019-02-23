import React, { Component } from "react";
import { View, Alert } from "react-native";
import {  Container, Header, Content, Form, Item, Label, Input, Text, Button, Row, Col } from 'native-base';
import * as firebase from "firebase";
import {
  createStackNavigator,
  createAppContainer,
  StackActions,
  NavigationActions
} from "react-navigation";
export default class SelectedItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BarcodeID: "",
      JM_ID: "",
      BE_ID: "",
      Detail: "",
      QT: "",
      Unit_price: "",
      Discount_amount: "",
      Discount_per: ""
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ BarcodeID: navigation.getParam("BarcodeID", "NO-ID") });
    this.GetData();
  }
  GetData = async () => {
    let get;
    await firebase
      .database()
      .ref("Stock")
      .once("value")
      .then(snapshot => {
        get = snapshot.val()[this.state.BarcodeID];
      });

    if (get == null) {
      await firebase
        .database()
        .ref("Dataset")
        .once("value")
        .then(snapshot => {
          get = snapshot.val()[this.state.BarcodeID];
        });
    }
    if (get != null) this.setState(get);
  };
  AddToDataSet = async () => {
    let toAdd = {
      JM_ID: this.state.JM_ID,
      BE_ID: this.state.BE_ID,
      Detail: this.state.Detail,
      Unit_price: this.state.Unit_price
    };
    firebase
      .database()
      .ref("Dataset")
      .child(this.state.BarcodeID)
      .update(toAdd);
  };
  AddToStock = async () => {

    let toAdd = {
      JM_ID: this.state.JM_ID,
      BE_ID: this.state.BE_ID,
      Detail: this.state.Detail,
      QT: this.state.QT,
      Unit_price: this.state.Unit_price,
      Discount_amount: this.state.Discount_amount,
      Discount_per: this.state.Discount_per
    };
    let promiseAdd = firebase
      .database()
      .ref("Stock")
      .child(this.state.BarcodeID)
      .update(toAdd);
    setTimeout(() => {
      if (promiseAdd._65 == 0) {
        Alert.alert("Lost connections!");
      }
      return;
    }, 5000);
    await promiseAdd;
    
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Main" })]
    });
    this.props.navigation.dispatch(resetAction);

  };
  Delete = async () => {
    let promise = firebase
      .database()
      .ref("Stock")
      .child(this.state.BarcodeID)
      .remove();
    setTimeout(() => {
      if (promise._65 == 0) {
        Alert.alert("Lost connections!");
      }
      return;
    }, 5000);
    await promise;
    
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Main" })]
    });
    this.props.navigation.dispatch(resetAction);
    
  };
  render() {
    return (
      
        <Container>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Barcode ID</Label>
                <Input value={this.state.BarcodeID}
                  onChangeText={typing => this.setState({ BarcodeID: typing })} />
              </Item>
              <Item floatingLabel>
                <Label>JM ID</Label>
                <Input value={this.state.JM_ID}
                  onChangeText={typing => this.setState({ JM_ID: typing })} />
              </Item>
              <Item floatingLabel>
                <Label>BE ID</Label>
                <Input value={this.state.BE_ID}
                  onChangeText={typing => this.setState({ BE_ID: typing })} />
              </Item>
              <Item floatingLabel>
                <Label>Details</Label>
                <Input value={this.state.Detail}
                  onChangeText={typing => this.setState({ Detail: typing })} />
              </Item>
              <Item floatingLabel>
                <Label>Quantitiy</Label>
                <Input value={this.state.QT}
                  onChangeText={typing => this.setState({ QT: typing.replace(/[^0-9]/g, "") })} />
              </Item>
              <Item floatingLabel>
                <Label>Unit price</Label>
                <Input value={this.state.Unit_price}
                  onChangeText={typing => this.setState({ Unit_price: typing.replace(/[^0-9]/g, "") })} />
              </Item>
              <Item floatingLabel>
                <Label>Discount (%)</Label>
                <Input value={this.state.Discount_per}
                  onChangeText={typing => this.setState({ Discount_per: typing.replace(/[^0-9]/g, "") })} />
              </Item>
              <Item floatingLabel>
                <Label>Discount Amount</Label>
                <Input value={this.state.Discount_amount}
                  onChangeText={typing => this.setState({ Discount_amount: typing.replace(/[^0-9]/g, "") })} />
              </Item>
            </Form>
            <Button full style={{ marginTop: 10 }} info onPress={() => {
              if (this.state.BarcodeID == "") {
                alert("Please type Barcode ID.");
              } else {
                this.AddToStock();
                this.AddToDataSet();
              }
            }}><Text>Update</Text></Button>
            <Button full style={{ marginTop: 10 }} danger onPress={() => {
              if (this.state.BarcodeID == "") {
                alert("Please type Barcode ID.");
              } else Alert.alert(
                'Confirm',
                'Are you sure to delete from stock?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: () => this.Delete() },
                ],
                { cancelable: false },
              );
            }}><Text>Delete</Text></Button>
          </Content>
        </Container>
      
      // <View>
      //   <Input
      //     style={{ width: "70%" }}
      //     placeholder="Barcode ID"
      //     value={this.state.BarcodeID}
      //     onChangeText={typing => this.setState({ BarcodeID: typing })}
      //   />
      //   <Input
      //     style={{ width: "70%" }}
      //     placeholder="JM ID"
      //     value={this.state.JM_ID}
      //     onChangeText={typing => this.setState({ JM_ID: typing })}
      //   />
      //   <Input
      //     style={{ width: "70%" }}
      //     placeholder="BE ID"
      //     value={this.state.BE_ID}
      //     onChangeText={typing => this.setState({ BE_ID: typing })}
      //   />
      //   <Input
      //     style={{ width: "70%" }}
      //     placeholder="Details"
      //     value={this.state.Detail}
      //     onChangeText={typing => this.setState({ Detail: typing })}
      //   />
      //   <Input
      //     style={{ width: "70%" }}
      //     placeholder="Quantitiy"
      //     value={this.state.QT}
      //     keyboardType="numeric"
      //     onChangeText={typing =>
      //       this.setState({ QT: typing.replace(/[^0-9]/g, "") })
      //     }
      //   />
      //   <Input
      //     style={{ width: "70%" }}
      //     placeholder="Unit price"
      //     value={this.state.Unit_price}
      //     keyboardType="numeric"
      //     onChangeText={typing =>
      //       this.setState({ Unit_price: typing.replace(/[^0-9]/g, "") })
      //     }
      //   />
      //   <Input
      //     style={{ width: "70%" }}
      //     placeholder="Discount (%)"
      //     value={this.state.Discount_per}
      //     keyboardType="numeric"
      //     onChangeText={typing =>
      //       this.setState({ Discount_per: typing.replace(/[^0-9]/g, "") })
      //     }
      //   />
      //   <Input
      //     style={{ width: "70%" }}
      //     placeholder="Discount (Amount)"
      //     value={this.state.Discount_amount}
      //     keyboardType="numeric"
      //     onChangeText={typing =>
      //       this.setState({ Discount_amount: typing.replace(/[^0-9]/g, "") })
      //     }
      //   />
      //   <View style={{ height: 10 }} />
      //   <Button
      //     onPress={() => {
      //       if (this.state.BarcodeID == "") {
      //         alert("Please type Barcode ID.");
      //       } else {
      //         this.AddToStock();
      //         this.AddToDataSet();
      //       }
      //     }}
      //     title="Update"
      //   />
      //   <View style={{ height: 10 }} />
      //   <Button
      //     color="#ff0000"
      //     onPress={() => {
      //   if (this.state.BarcodeID == "") {
      //     alert("Please type Barcode ID.");
      //   } else this.Delete();
      // }}
      //     title="Delete"
      //   />
      // </View>
    );
  }
}
