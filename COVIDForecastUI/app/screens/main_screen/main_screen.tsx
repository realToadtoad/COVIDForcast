import React from "react";
import { StyleSheet, View, Dimensions, StatusBar, ScrollView } from "react-native";
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

import { CurrentCases } from "../../components/current_cases/current_cases";
import { currentLocation, currentState, currentLat, currentLong } from "../../../App";
import { UnsplashWidget } from "../../components/unsplash_widget/unsplash_widget";

import mapStyleJSON from '../../../mapStyle.json';

import MapView,
{ Marker, Callout, Polygon, Circle }
  from 'react-native-maps';
  
let currLat = currentLat;
let currLong = currentLong;

export class MainScreen extends React.Component {
  
  render() {
    return (
      <Layout style={styles.container}>
        <ScrollView>
          <StatusBar />
          <UnsplashWidget />
          <CurrentCases />
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              marginLeft: 12.5,
              alignItems: "center",
              alignSelf: "flex-start"
            }}
          >
            <Icon style={styles.icon} name="pin-outline" />
            <Text style={{ letterSpacing: 2 }}>{currentState.toUpperCase()}</Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView style={styles.map} initialRegion={{
              latitude: currLat,
              longitude: currLong,
              latitudeDelta: 15,
              longitudeDelta: 15,
            }}
            customMapStyle={mapStyleJSON.mapStyle}
            >
              <Marker
              coordinate={{ latitude: currLat, longitude: currLong }}>

              <Callout>
                <Text style={styles.calloutText}>Your Location</Text>
              </Callout>

            </Marker>
            </MapView>
          </View>
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
  map: {
    width: Dimensions.get('window').width-25,
    height: Dimensions.get('window').height/2,
  },
  mapContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  calloutText: {
    color: 'black'
  }
});
