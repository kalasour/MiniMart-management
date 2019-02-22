import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Button } from "react-native-elements";
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Left,
  Right,
  Grid,
  Row,
  Header,
  Body,
  Col,
  Icon,
  Item,
  Input
} from "native-base";
import * as firebase from "firebase";
import { createStackNavigator, createAppContainer } from "react-navigation";
export default class Stock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      List: [],
      SearchField: ""
    };
  }

  componentDidMount() {
    this.GetData();
  }
  GetData = async () => {
    await firebase
      .database()
      .ref("Stock")
      .on("value", snapshot => {
        this.setState({
          List: Object.keys(snapshot.val()).map(key => ({
            value: snapshot.val()[key],
            key: key
          }))
        });
      });
  };

  render() {
    ListItem = this.state.List.map(Item => {
      if(Item.value.Detail.search(this.state.SearchField)!=-1||Item.value.BE_ID.search(this.state.SearchField)!=-1||Item.value.JM_ID.search(this.state.SearchField)!=-1||Item.key.search(this.state.SearchField)!=-1)
      return (
        <Card key={Item.key}>
          <CardItem
            header
            button
            onPress={() => {
              this.props.navigation.navigate("SelectedItem", {
                BarcodeID: Item.key
              });
            }}
          >
            <Col>
              <Row>
                <Left>
                  <Text>{Item.value.Detail}</Text>
                </Left>
                <Right>
                  <Text>Unit:{Item.value.QT}</Text>
                </Right>
              </Row>
              <Row>
                <Left />
                <Right>
                  <Text>Price:{Item.value.Unit_price}</Text>
                </Right>
              </Row>
            </Col>
          </CardItem>
        </Card>
      );
    });

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              value={this.state.SearchField}
              onChangeText={typing => this.setState({ SearchField: typing })}
            />
          </Item>
        </Header>
        <Row style={{ height: 40, alignItems: "center", marginTop: 10 }}>
          <Col style={{ alignItems: "center" }}>
            <Button
              onPress={() => {
                this.props.navigation.navigate("SelectedItem", {
                  BarcodeID: ""
                });
              }}
              title="Add"
              type="outline"
            />
          </Col>
          <Col style={{ alignItems: "center" }}>
            <Button
              onPress={() => {
                this.props.navigation.navigate("Cam");
              }}
              title="Scan"
              type="outline"
            />
          </Col>
        </Row>
        <Content padder>{ListItem}</Content>
      </Container>
    );
  }
}
