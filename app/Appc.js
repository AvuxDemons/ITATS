import React, { Component } from 'react';
import { View, BackHandler, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { WebView } from 'react-native-webview';
import InternetConnectionAlert from "react-native-internet-connection-alert";

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040'
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
    this.webviewRef = React.createRef();
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      isLoading: true,
      isError: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = () => {
    this.WEBVIEW_REF.current.goBack();
    return true;
  }
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  onRefresh = () => {
    this.webviewRef.current.reload();
  }

  hideSpinner = () => {
    this.setState({ isLoading: false });
  }
  showSpinner = () => {
    this.setState({ isLoading: true });
  }

  render() {
    return (
      <InternetConnectionAlert
        onChange={(connectionState) => {
          console.log(`${connectionState.isConnected ? 'Connected' : 'Disconnected'}`);
        }}
        title="⚠ Koneksi Internet Terputus"
        message="🔌 Periksa & Sambungkan Kembali Koneksi Internet Anda"
      >
        <View style={{ flex: 1 }}>
          <WebView
            onError={() => { }}
            onLoadStart={() => (this.showSpinner())}
            onLoad={() => this.hideSpinner()}
            source={{ uri: "https://komiksan.ml" }}
            ref={this.WEBVIEW_REF}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            refreshControl={
              <RefreshControl
                refreshing={true}
                onRefresh={this.onRefresh}
              />
            }
          />
          {
            this.state.isLoading && (
              <ActivityIndicator
                className={this.state.isLoading ? styles.fadeIn : styles.fadeOut}
                style={styles.loading}
                size="large"
                color="#007aff"
              />
            )
          }
        </View>
      </InternetConnectionAlert>
    )
  }
}