import React, { Component } from 'react'
import { Text, View, Button, Alert, StyleSheet, TextInput } from 'react-native'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            user2: '',
            pass: '',
            pass2: '',
            pass3: '',
            LoginFrom: true
        }
    }
    Login() {
        this.props.navigation.navigate('Main')
    }
    resetState() {
        this.setState({
            user: '',
            user2: '',
            pass: '',
            pass2: '',
            pass3: '',
            LoginFrom: true,
            dataUser: []
        })
    }
    render() {
        if (this.state.LoginFrom) {
            return (
                <View>
                    <TextInput
                        underlineColorAndroid='#3187f0'

                        value={this.state.user}
                        placeholder='Username'
                        onChangeText={(user) => this.setState({ user })} />

                    <TextInput
                        underlineColorAndroid='#3187f0'

                        placeholder='password'
                        secureTextEntry={true}
                        value={this.state.pass}
                        onChangeText={(pass) => this.setState({ pass })} />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}>
                        <Button
                            title="Create Account"
                            onPress={() => {
                                this.setState({ LoginFrom: false });
                            }} />
                        <Button
                            title="Login"
                            onPress={() => {
                                this.Login();
                            }} />
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <TextInput
                        underlineColorAndroid='#3187f0'

                        value={this.state.user2}
                        placeholder='Username'
                        onChangeText={(user2) => this.setState({ user2 })} />

                    <TextInput
                        underlineColorAndroid='#3187f0'

                        placeholder='password'
                        secureTextEntry={true}
                        value={this.state.pass2}
                        onChangeText={(pass2) => this.setState({ pass2 })} />
                    <TextInput
                        underlineColorAndroid='#3187f0'

                        placeholder='password'
                        secureTextEntry={true}
                        value={this.state.pass3}
                        onChangeText={(pass3) => this.setState({ pass3 })} />

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end'
                        }}>
                        <Button
                            title="Create"
                            onPress={() => {
                                // this.CreateAccount();
                            }} />
                        <Button
                            title="Bact to Login"
                            onPress={() => {
                                this.setState({ LoginFrom: true });
                            }} />
                    </View>
                </View>
            );
        }

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});