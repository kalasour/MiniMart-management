import React, { Component } from 'react'
import { DrawerActions } from "react-navigation-drawer";
import { Text, Icon, Container, Header, Content, Form, Button, Item, Input, Label, List, ListItem, Card, CardItem, Col, Left, Right, Row } from 'native-base'
import * as firebase from "firebase";


export default class Sales extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => {
      return (<Icon style={{ width: 30, color: tintColor }} name="shopping-cart" type="Feather" />);
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      List: [],
      Stock: [],
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
          Stock: Object.keys(snapshot.val()).map(key => ({
            value: snapshot.val()[key],
            key: key
          }))
        });
      });

  };
  AddToList = async (key) => {
    let Item = await this.state.Stock.find(StockItem => {
      if (StockItem.key == key) { return StockItem }
    })
    let uniq = true;
    await this.state.List.map(listItem => {
      if (Item.key == listItem.key) {
        listItem.value.QT++; 
        uniq = false;
        this.setState({})
        return;
      }
    })
    if (uniq && Item != null) {
      console.log(Item)
      this.state.List.push(Item)
      this.setState({})
    }
  }
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
    Insale = this.state.List.map(Item => {
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

    SearchList = this.state.Stock.map(Item => {
      if (this.state.SearchField != '')
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
            <ListItem key={Item.key} button onPress={() => {
              this.AddToList(Item.key);
            }} >
              <Text >{Item.value.Detail}</Text>
            </ListItem>
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
            <Button transparent
              style={{ alignSelf: "center" }}
              onPress={() => {
                this.props.navigation.navigate("BarcodeSale");
              }}
            >
              <Icon style={{ color: "#87cefa" }} name="ios-qr-scanner"></Icon>
            </Button>
          </Item>
        </Header>
        <List>{SearchList}</List>
        <Content padder>{Insale}</Content>
      </Container>
    )
  }
}
