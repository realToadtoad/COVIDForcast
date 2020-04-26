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
import capitalsJSON2 from '../../../us-capitals2.json';

import MapView,
{ Marker, Callout, Polygon, Circle, Heatmap }
  from 'react-native-maps';

import Papa from "papaparse";
import moment from "moment";

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

let states = ["Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
"Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
   "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
   "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
   "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "West Virginia", "Wisconsin",  "Wyoming"];
let statesCases = new Array(50);

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const blueMarker = require("../../../assets/blue-marker.png");
const redMarker = require("../../../assets/red-marker.png");

async function fetchCases(date: string, state: string, index: number) {
  let now = moment(date).subtract(1, "days");
  let dayStr = now.format("MM-DD-YYYY");
  let url =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/" +
    dayStr +
    ".csv";
  let currentCases: number;
  await Papa.parse(url, {
    download: true,
    complete: function (res) {
      currentCases = res.data.find(function (obj: any) {
        return obj[0] == state; // [0] is the column for the state
      })[5];
      statesCases[index] = currentCases;
    },
  });
}

export class MainScreen extends React.Component {
  async UNSAFE_componentWillMount() {
    let now = moment();
    for(var i = 0; i < 48; i++) {
      await fetchCases(now.format("YYYY-MM-DD"), states[i], i);
    }
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
              <Callout tooltip>
                <View style={styles.calloutContent}>
                   <View style={styles.bubble2}>
                    <Text style={styles.calloutHeader}>Your Location</Text>
                  </View>
                  <View style={styles.arrowBorder2} />
                  <View style={styles.arrow2} />
                </View>
              </Callout>
              </Marker>
              {jsonVals.map((item) => (
                <Marker image = {blueMarker} 
                coordinate={{ latitude: parseFloat(item.lat), longitude:  parseFloat(item.long)}}>
                  <Callout tooltip>
                    <View style={styles.calloutContent}>
                      <View style={styles.bubble1}>
                        <Text style={styles.calloutHeader}>{item.name}</Text>
                        <Text style={styles.calloutText}>Cases: {statesCases[(states.indexOf(item.name))]}</Text>
                      </View>
                      <View style={styles.arrowBorder1} />
                      <View style={styles.arrow1} />
                    </View>
                  </Callout>
                </Marker>
              ))}
              {jsonVals.map((item) => (
                <Circle
                  center={{ latitude: parseFloat(item.lat), longitude:  parseFloat(item.long) }}
                  radius={item.cases * (Math.floor(Math.random() * 2) + 0.5)}
                  fillColor={'rgba(252, 36, 3, 0.25)'}
                />
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
  calloutHeader: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  calloutText: {
    color: 'black',
    fontSize: 16,
  },
  bubble1: {
    backgroundColor: "#4da2ab",
    padding: 10,
    borderRadius: 20,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  bubble2: {
    backgroundColor: "#eb4034",
    padding: 10,
    borderRadius: 20,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  arrow1: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#4da2ab',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder1: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  arrow2: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#eb4034',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder2: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#eb4034',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  calloutContent: {
    marginBottom: -15,
  },
});
