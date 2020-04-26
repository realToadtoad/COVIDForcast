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
import { currentLocation, currentState } from "../../../App";
import { UnsplashWidget } from "../../components/unsplash_widget/unsplash_widget";
import { SevenDayForecast } from "../../components/seven_day_forecast/seven_day_forecast";
import { MapViewComponent } from "../../components/map_view/map_view";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export class MainScreen extends React.Component {
  render() {
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
          <MapViewComponent />
          <View
            style={{
              marginRight: 12.5,
              alignItems: "flex-end",
              width: deviceWidth - 25,
            }}
          >
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
});
