import React from "react";

import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  createAppContainer,
  SafeAreaView,
  ThemeContext,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";
import { WebView } from "react-native-webview";

import { CurrentCases } from "../../components/current_cases/current_cases";
import { currentLocation, currentState} from "../../../App";
import { UnsplashWidget } from "../../components/unsplash_widget/unsplash_widget";
import { SevenDayForecast } from "../../components/seven_day_forecast/seven_day_forecast";

import mapStyleJSON from '../../../mapStyle.json';
import capitalsJSON from '../../../us-capitals.json';

import MapView,
{ Marker, Callout, Polygon, Circle }
  from 'react-native-maps';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

/*async function trainModel(model, inputs, labels) {
  model.compile({

  })
}*/

const blueMarker = require("../../../assets/blue-marker.png");
const redMarker = require("../../../assets/red-marker.png");

export class MainScreen extends React.Component {

  async UNSAFE_componentWillMount() {
    await wait(3000);
    this.forceUpdate();
  }
  
  render() {
    let jsonVals = Object.values(capitalsJSON);
    return (
      <Layout style={styles.container}>
        <StatusBar />
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          style={{ height: deviceHeight, width: deviceWidth }}
        >
          <UnsplashWidget />
          <CurrentCases />
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              marginLeft: 12.5,
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <Icon style={styles.icon} name="pin-outline" />
            <Text style={{ letterSpacing: 2 }}>
              {currentState.toUpperCase()}
            </Text>
          </View>
          <View style={{ height: 25 }} />
          <SevenDayForecast />
          <View style={{ height: 25 }} />
          <View style={styles.webEmbed}>
            <WebView
              source={{ uri: "https://datahub.io/core/covid-19/view/1" }}
              style={styles.webEmbed}
            />
          </View>
          <View style={{ height: 12.5 }} />
          <View style={styles.mapContainer}>
            <MapView style={styles.map} initialRegion={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 15,
              longitudeDelta: 15,
            }}
            customMapStyle={mapStyleJSON.mapStyle}>
              <Marker image = {redMarker}
              coordinate={{ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }}>
              <Callout>
                <View style={styles.calloutContent}>
                   <View style={styles.bubble}>
                    <Text style={styles.calloutText}>Your Location</Text>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
              </Marker>
              {jsonVals.map((item) => (
                <Marker image = {blueMarker} 
                coordinate={{ latitude: parseFloat(item.lat), longitude:  parseFloat(item.long)}}>
                  <Callout tooltip>
                    <View style={styles.calloutContent}>
                      <View style={styles.bubble}>
                        <Text style={styles.calloutText}>{item.capital}, {item.name}</Text>
                      </View>
                      <View style={styles.arrowBorder} />
                      <View style={styles.arrow} />
                    </View>
                  </Callout>

                </Marker>
              ))}
            </MapView>
          </View>
          <View style={{ marginRight: 12.5, alignItems: "flex-end", width: deviceWidth-25 }}>
            <Text
              appearance="hint"
              style={[styles.link, { textAlign: "right" }]}
              onPress={() => this.props.navigation.navigate("AboutScreen")}
            >
              About this app
            </Text>
          </View>
          <View style={{ height: 12.5 }} />
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  webEmbed: {
    width: deviceWidth - 25,
    height: (3.1 * deviceHeight) / 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  link: {
    textDecorationLine: "underline",
  },
  map: {
    width: deviceWidth-25,
    height: deviceHeight*0.75,
  },
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: deviceWidth-25,
    height: deviceHeight*0.75,
    borderRadius: 10,
    overflow: "hidden"
  },
  calloutText: {
    color: 'black'
  },
  bubble: {
    backgroundColor: "#4da2ab",
    padding: 10,
    borderRadius: 20,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#4da2ab',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  calloutContent: {
    marginBottom: -15,
  },
});
