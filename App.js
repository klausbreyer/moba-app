import React from 'react';
import {StyleSheet, Text, View, WebView, TextInput, AsyncStorage, Button} from 'react-native';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: 'http://', validUrl: false};
    }

    componentDidMount() {
        try {
            AsyncStorage.getItem('@MobaAppStore:url', (err, result) => {
                console.log('result!');
                console.log(result);

                if (result !== null) {
                    console.log('// We have data!!');
                    console.log(result);
                    this.checkUrl(result);

                }
            });
        } catch (error) {
            console.log('error' + error);
        }
    }

    async setUrl(url) {
        try {
            await
                AsyncStorage.setItem('@MobaAppStore:url', url);
        } catch (error) {
            console.log('error' + error);
        }
    }

    async resetUrl(url) {
        try {
            await
                AsyncStorage.removeItem('@MobaAppStore:url');
            this.setState({url: 'http://'});
        } catch (error) {
            this.state = {url: 'http://', validUrl: false};
        }
    }

    checkUrl(url) {
        this.setState({url: url});
        this.setUrl(url);
        const testUrl = url + '/wp-content/plugins/moba/moba.css';
        return fetch(testUrl)
            .then((response) => {
                if (200 === response.status) {
                    console.log('true' + testUrl);
                    console.log(response);
                    this.setState({validUrl: true})
                }
                else {
                    console.log('false' + testUrl);
                    this.setState({validUrl: false})
                }

            })
            .catch((error) => {
                console.log('error' + testUrl);
                this.setState({validUrl: false})
            });
    }


    renderWelcome() {
        console.log('url');
        console.log(this.state.url);
        return (
            <View style={styles.container}>
                <Text>Willkommen in der App des moba Plugins!</Text>
                <Text>Wie ist die URL (Startseite) deines Blogs? </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder={'https://'}
                    onChangeText={(url) => this.checkUrl(url)}
                    value={this.state.url}
                />
                {this.state.url !== 'http://' ?
                    <Text style={styles.error}>Leider keine valide URL oder Plugin nicht gefunden. Falls du noch nicht
                        fertig bist, tippe einfach weiter. Falls hier schon die volle URL steht und diese Meldung nicht
                        verschwindet, solltest du überprüfen ob du das Plugin installiert hast. </Text> : null}
            </View>
        );
    }

    renderWebView() {
        console.log(this.state.url + '/wp-admin/admin.php?page=moba%2Finterface.php');
        return (
            <View style={styles.container}>
                <WebView
                    source={{uri: this.state.url + '/wp-admin/admin.php?page=moba%2Finterface.php'}}
                    style={styles.webView}
                />
                <Button
                    onPress={() => this.resetUrl()}
                    title="Logout"
                    color="#841584"
                    accessibilityLabel="Logout from your Blog Admin"
                />
            </View>
        )
    }

    render() {
        return (
            this.state.validUrl ?
                this.renderWebView() : this.renderWelcome()

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    textInput: {
        backgroundColor: '#ccc',
    },
    error: {
        backgroundColor: 'red',
    },
    success: {
        backgroundColor: 'green',
    },
    webView: {
        // marginTop: 20
    }
});
