import React, { Component } from 'react'
import { DrawerActions } from "react-navigation-drawer";
import { Badge, Text, Icon, Container, Header, Content, Form, Button, Item, Input, Label, List, ListItem, Card, CardItem, Col, Left, Right, Row, Footer, FooterTab } from 'native-base'
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
      List: {},
      Stock: {},
      SearchField: "",
      Customer_id: '',
      TotalPrice: () => {
        return Object.keys(this.state.List).map(key => {
          return this.state.List[key].Price;
        }).reduce((total, num) => {
          return total + num
        }, 0).toFixed(2)
      },
      TotalDiscounted: () => {
        return Object.keys(this.state.List).map(key => {
          return this.state.List[key].Discounted;
        }).reduce((total, num) => {
          return total + num
        }, 0).toFixed(2)
      },
      TotalOrdered: () => {
        return Object.keys(this.state.List).map(key => {
          return this.state.List[key].Price;
        }).reduce((total, num) => {
          return total + 1
        }, 0)
      },
      TotalPiece: () => {
        return Object.keys(this.state.List).map(key => {
          return this.state.List[key].QT;
        }).reduce((total, num) => {
          return total + num
        }, 0)
      }
    };
  }

  componentDidMount() {
    this.GetData();
  }

  calPrice = (key) => {
    let discount_per = 0, discount_amount = 0;
    if (this.state.List[key].Discount_per == null) {
      this.state.List[key].Discount_per = 0;
    }
    if (this.state.List[key].Discount_amount == null) {
      this.state.List[key].Discount_amount = 0;
    }
    if (this.state.List[key].Discount_per != 0) {
      discount_per = (this.state.List[key].Discount_per / 100) * this.state.List[key].Unit_price
    }
    discount_amount = this.state.List[key].Discount_amount;
    this.state.List[key].Discounted = (parseFloat(discount_amount) + parseFloat(discount_per)) * this.state.List[key].QT;
    this.state.List[key].Price = (this.state.List[key].Unit_price - discount_amount - discount_per) * this.state.List[key].QT;
  }
  GetData = async () => {
    await firebase
      .database()
      .ref("Stock")
      .on("value", snapshot => {
        this.setState({
          Stock: snapshot.val()
        });
      });
  };
  AddToList = async (key) => {
    if(this.state.Stock[key]==null){
      alert('No item in Stock'); return;
    }
    if (this.state.List[key] != null) { if (this.state.List[key].QT < this.state.Stock[key].QT) this.state.List[key].QT++; else { alert('No more item in Stock'); return; } }
    else {
      if (this.state.Stock[key].QT <= 0) { alert('No more item in Stock'); return; }
      this.state.List[key] = Object.assign({}, this.state.Stock[key])
      this.state.List[key].QT = 1;
      this.state.List[key].Price = 0;
    }
    this.setState({})
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
    Insale = () => {
      if (Object.keys(this.state.List).length <= 0) return (<Text style={{ alignSelf: 'center', color: '#c0c0c0' }}>Empty List!</Text>)
      else
        return Object.keys(this.state.List).map(key => {
          return (
            <Card key={key}>
              <CardItem
                header
              >
                <Left >
                  <Col >
                    <Row><Text>{this.state.List[key].Detail}    {this.state.List[key].Unit_price}.-</Text></Row>
                    <Row><Text>:{key}</Text></Row>
                    <Row style={{ alignItems: 'center' }} >
                      <Badge success><Text>Discount: </Text></Badge>
                      <Badge>
                        <Text>-{this.state.List[key].Discount_per}%</Text>
                      </Badge>
                      <Badge>
                        <Text>-{this.state.List[key].Discount_amount}.-</Text>
                      </Badge>
                    </Row>
                  </Col>
                </Left>
                <Right>
                  <Col style={{ alignItems: 'flex-end' }}>
                    <Row ><Button
                      style={{ width: 30, height: 30 }}
                      transparent
                      onPress={() => {
                        delete this.state.List[key];
                        this.setState({});
                      }}
                    >
                      <Icon style={{ fontSize: 30 }} name="close" style={{ color: "#808080" }} />
                    </Button></Row>
                    <Row><Button disabled={(this.state.List[key].QT <= 1)} onPress={() => { this.state.List[key].QT--; this.setState({}) }} transparent style={{ width: 30, height: 30, alignSelf: 'center' }} ><Icon style={{ fontSize: 30 }} type='Entypo' name='squared-minus'></Icon></Button><Button bordered style={{ marginHorizontal: 10 }} ><Text style={{ color: 'black' }}> {this.state.List[key].QT} </Text></Button><Button disabled={(this.state.List[key].QT >= this.state.Stock[key].QT)} onPress={() => { this.state.List[key].QT++; this.setState({}) }} transparent style={{ width: 30, height: 30, alignSelf: 'center' }} ><Icon style={{ fontSize: 30 }} type='Entypo' name='squared-plus'></Icon></Button></Row>
                    <Row>
                      {this.calPrice(key)}
                      <Text style={{ alignSelf: 'flex-end' }}>{"\n"}Price:{this.state.List[key].Price.toFixed(2)}</Text>
                    </Row>
                  </Col>
                </Right>
                {/* <Col>
                  <Row>
                    <Left style={{ alignSelf: 'flex-start' }}>
                      <Text>{this.state.List[key].Detail}    {this.state.List[key].Unit_price}.-    </Text>
                      <Badge>
                        <Text>-{this.state.List[key].Discount_per}%</Text>
                      </Badge>
                    </Left>
                    <Right>
                      <Button
                        style={{ width: 30, height: 30, alignSelf: 'flex-end' }}
                        transparent
                        onPress={() => {
                          delete this.state.List[key];
                          this.setState({});
                        }}
                      >
                        <Icon style={{ fontSize: 30 }} name="close" style={{ color: "#808080" }} />
                      </Button>

                    </Right>
                  </Row>
                  <Row>
                    <Left style={{ alignSelf: 'flex-start' }}>
                      <Row><Text>:{key}</Text></Row>
                    </Left>
                    <Right>
                      <Row><Button disabled={(this.state.List[key].QT <= 1)} onPress={() => { this.state.List[key].QT--; this.setState({}) }} transparent style={{ width: 30, height: 30, alignSelf: 'center' }} ><Icon style={{ fontSize: 30 }} type='Entypo' name='squared-minus'></Icon></Button><Button bordered style={{ marginHorizontal: 10 }} ><Text style={{ color: 'black' }}> {this.state.List[key].QT} </Text></Button><Button disabled={(this.state.List[key].QT >= this.state.Stock[key].QT)} onPress={() => { this.state.List[key].QT++; this.setState({}) }} transparent style={{ width: 30, height: 30, alignSelf: 'center' }} ><Icon style={{ fontSize: 30 }} type='Entypo' name='squared-plus'></Icon></Button></Row>
                      <Text />
                      {this.calPrice(key)}
                      <Text style={{ alignSelf: 'flex-end' }}>Price:{this.state.List[key].Price}</Text>
                    </Right>
                  </Row>
                </Col> */}
              </CardItem>
            </Card>
          );
        });
    }

    SearchList = Object.keys(this.state.Stock).map(key => {
      let Item = {};
      Item.value = this.state.Stock[key];
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
          key.toLowerCase().search(this.state.SearchField.toLowerCase()) !=
          -1
        )
          return (
            <ListItem key={key} button onPress={() => {
              this.AddToList(key);
              this.setState({ SearchField: '' })
            }} >
              <Left><Text >{Item.value.Detail}</Text></Left><Right><Text>In stock : {this.state.Stock[key].QT}</Text></Right>
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
                this.props.navigation.navigate("BarcodeSale",{AddToList:this.AddToList});
              }}
            >
              <Icon style={{ color: "#87cefa" }} name="ios-qr-scanner"></Icon>
            </Button>
          </Item>
        </Header>
        <List>{SearchList}</List>
        <Content padder>{Insale()}</Content>


        <Footer style={{ backgroundColor: "#87cefa", height: 70, borderTopWidth: 1, borderColor: '#808080' }}  >
          <FooterTab style={{ backgroundColor: "#ffffff", justifyContent: 'flex-end' }}>
            <Col style={{ justifyContent: 'flex-end', marginHorizontal: 5 }}>
              <Row style={{ justifyContent: 'flex-start' }}><Text style={{ fontSize: 12, color: "#000000" }}>Total Discounted : {this.state.TotalDiscounted().toString()} .-  </Text></Row>
              <Row style={{ justifyContent: 'flex-start' }}><Text style={{ fontSize: 12, color: "#000000" }}>Total Ordered : {this.state.TotalOrdered().toString()}  </Text></Row>
              <Row style={{ justifyContent: 'flex-start' }}><Text style={{ fontSize: 12, color: "#000000" }}>Total Piece : {this.state.TotalPiece().toString()}  </Text></Row>
              <Row style={{ justifyContent: 'flex-start' }}><Text style={{ fontSize: 18, color: "#000000" }}>Total Price : {this.state.TotalPrice().toString()} .-  </Text></Row>
            </Col>
          </FooterTab>
          <FooterTab style={{ backgroundColor: "#ffffff", justifyContent: 'center', borderLeftWidth: 1, borderColor: '#808080' }}>
            <Content >
              <Form >
                <Item floatingLabel >
                  <Label>Customer ID :</Label>
                  <Input value={this.state.JM_ID}
                    onChangeText={typing => this.setState({ Customer_id: typing })} />

                </Item>

              </Form>
            </Content>
          </FooterTab>

        </Footer>
        <Footer style={{ backgroundColor: "#87cefa" }} >
          <FooterTab >
            <Button info disabled={(Object.keys(this.state.List).length <= 0)} block onPress={() => {
              Object.keys(this.state.List).map(key=>{
                delete this.state.List[key]
              })
              this.setState({Customer_id:''})
              alert("Success!")
            }} ><Text style={{ color: 'white' }}>Sale</Text><Icon style={{ width: 30, color: "#ffffff" }} name="shopping-cart" type="Feather" /></Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
