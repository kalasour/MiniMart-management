import React, { Component } from "react";
import { View, Alert } from "react-native";
import { } from "react-native-elements";
import { DrawerActions } from "react-navigation-drawer";
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
  Input,
  Button,
  Footer,
  FooterTab
} from "native-base";
import * as firebase from "firebase";
export default class Stock extends Component {
  static navigationOptions = {
    drawerIcon:({tintColor})=>{
      return(<Icon name="database" style={{width:30,color:tintColor}} type="AntDesign" />);
    }
  }
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
    resetSearchField = () => {
      if (this.state.SearchField != "")
        return (
          <Button
            transparent
            onPress={() => {
              this.setState({ SearchField: "" });
            }}
          >
            <Icon name="close" style={{ color: "#808080" }} />
          </Button>
        );
    };
    ListItem = this.state.List.map(Item => {
      if (
        Item.value.Detail.toLowerCase().search(
          this.state.SearchField.toLowerCase()
        ) != -1 ||
        Item.value.BE_ID.toLowerCase().search(
          this.state.SearchField.toLowerCase()
        ) != -1 ||
        Item.value.JM_ID.toLowerCase().search(
          this.state.SearchField.toLowerCase()
        ) != -1 ||
        Item.key.toLowerCase().search(this.state.SearchField.toLowerCase()) !=
        -1
      )
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
        <Header
          searchBar
          rounded
          androidStatusBarColor="#87cefa"
          style={{ backgroundColor: "#87cefa" }}
        >
          <Item>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Icon name="menu" style={{ color: "#87cefa" }} />
            </Button>

            <Input
              placeholder="Search"
              value={this.state.SearchField}
              onChangeText={typing => this.setState({ SearchField: typing })}
            />
            {resetSearchField()}
            <Icon name="ios-search" />
          </Item>
        </Header>
        <Content padder>{ListItem}</Content>
        <Footer  >
          <FooterTab style={{ backgroundColor: "#87cefa" }}>
            <Button
              vertical

              style={{ alignSelf: "center" }}
              onPress={() => {
                this.props.navigation.navigate("SelectedItem", {
                  BarcodeID: ""
                });
              }}
            >
              <Icon style={{ color: "#ffffff" }} name="ios-add"></Icon>
              <Text style={{ color: "#ffffff" }}>Add</Text>
            </Button>
            <Button vertical
              style={{ alignSelf: "center" }}
              onPress={() => {
                this.props.navigation.navigate("Cam");
              }}
            >
              <Icon style={{ color: "#ffffff" }} name="ios-qr-scanner"></Icon>
              <Text style={{ color: "#ffffff" }}>Scan</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>

    );
  }
}
