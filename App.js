import React from 'react';
import {StyleSheet, Text, View, WebView, TextInput} from 'react-native';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: 'https://', validUrl: false};
    }

    setUrlValidity(url) {
        console.log('hi');
        const testUrl  = this.state.url + '/wp-content/plugins/moba/moba.css';
        return fetch(testUrl)
            .then((response) => {
            console.log('true' + testUrl);
                this.setState({validUrl: true})
            })
            .catch((error) => {
                console.log('error' + testUrl);
                this.setState({validUrl: false})
            });
    }

    onChangeUrl(url) {
        this.setState({url: url});
        this.setUrlValidity(url);
    }

    renderWelcome() {

        return (
            <View style={styles.container}>
                <Text>Willkommen in der App des moba Plugins!</Text>
                <Text>Wie ist die URL (Startseite) deines Blogs? </Text>
                <TextInput
                    placeholder={'https://'}
                           onChangeText={(url) => this.onChangeUrl(url)}
                />
                {this.state.validUrl ? <Text style={styles.success}>Valide URL</Text> : <Text style={styles.error}>Leider keine valide URL</Text>}
            </View>
        );
    }

    renderWebView() {
        return (
            <WebView
                source={{uri: 'http://breyer.berlin/wp-admin/admin.php?page=moba%2Finterface.php'}}
                style={styles.webView}
            />
        )
    }

    render() {
        return (
            true ?
                this.renderWelcome() : this.renderWebView()

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
      backgroundColor: 'red',
    },
    success: {
      backgroundColor: 'green',
    },
    webView: {
        marginTop: 20,

        width: 350,
        height: 350,

    }
});
