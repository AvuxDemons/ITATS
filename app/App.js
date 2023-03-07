import React, { useRef, useEffect, useState } from 'react';
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

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [canGoBack, setCanGoBack] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const WEBVIEW_REF = useRef();

    useEffect(() => {
        const handleBackButton = () => {
            WEBVIEW_REF.current.goBack();
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, []);

    const onNavigationStateChange = (navState) => {
        setCanGoBack(navState.canGoBack);
    };

    const onRefresh = () => {
        setRefreshing(true);
        WEBVIEW_REF.current.reload();
    };

    const hideSpinner = () => {
        setIsLoading(false);
    };
    const showSpinner = () => {
        setIsLoading(true);
    };

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
                    cacheEnabled={true}
                    onError={() => { }}
                    onLoadStart={() => (showSpinner())}
                    onLoad={() => hideSpinner()}
                    source={{ uri: "https://1T4T5.ademons.repl.co" }}
                    ref={WEBVIEW_REF}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    onNavigationStateChange={onNavigationStateChange}
                />
                {
                    isLoading && (
                        <ActivityIndicator
                            className={isLoading ? styles.fadeIn : styles.fadeOut}
                            style={styles.loading}
                            size="large"
                            color="#cacaca"
                        />
                    )
                }
            </View>
        </InternetConnectionAlert>
    );
}

export default App;
