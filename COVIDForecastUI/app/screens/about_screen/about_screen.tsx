import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Linking,
  Image,
  TouchableNativeFeedback as Touchable,
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
} from "@ui-kitten/components";

import { LicenseScreen } from "./license_screen";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const logo = require("../../../assets/splash.png");

export class AboutScreen extends React.Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Layout
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
            height: (6 * deviceHeight) / 8,
          }}
        >
          <Image
            source={logo}
            style={{
              width: deviceWidth,
              height: (2 * deviceWidth) / 3,
            }}
          ></Image>
          <View style={{ flexDirection: "row", width: deviceWidth - 25 }}>
            <Text>Prediction model by </Text>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL("https://github.com/justinyue1643")
              }
            >
              Justin Yue
            </Text>
            <Text>, </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://github.com/billfeng2002")}
            >
              Bill Feng
            </Text>
            <Text>,</Text>
          </View>
          <View style={{ flexDirection: "row", width: deviceWidth - 25 }}>
            <Text>and </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://github.com/rice31415")}
            >
              Eric Wang
            </Text>
          </View>
          <View style={{ height: 12.5 }} />
          <View style={{ flexDirection: "row", width: deviceWidth - 25 }}>
            <Text>UI by </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://github.com/realToadtoad")}
            >
              Aiden Sato
            </Text>
            <Text> and </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://github.com/ArvindVivek")}
            >
              Arvind Vivekanadan
            </Text>
          </View>
          <View style={{ height: 12.5 }} />
          <View style={{ flexDirection: "row", width: deviceWidth - 25 }}>
            <Text>UI inspired by </Text>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL(
                  "https://play.google.com/store/apps/details?id=mobi.lockdown.weather&hl=en"
                )
              }
            >
              Today Weather
            </Text>
          </View>
          <View style={{ height: 12.5 }} />
          <View style={{ flexDirection: "row", width: deviceWidth - 25 }}>
            <Text>Logo modified from </Text>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL("https://www.flaticon.com/authors/freepik")
              }
            >
              FreePik
            </Text>
            <Text> on </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL("https://www.flaticon.com")}
            >
              www.flaticon.com
            </Text>
          </View>
          <View style={{ height: 12.5 }} />
          <View style={{ flexDirection: "row", width: deviceWidth - 25 }}>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL("https://github.com/nytimes/covid-19-data")
              }
            >
              NYTimes
            </Text>
            <Text>, </Text>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL("https://github.com/CSSEGISandData/COVID-19")
              }
            >
              Johns Hopkins
            </Text>
            <Text>, and </Text>
            <Text
              style={styles.link}
              onPress={() =>
                Linking.openURL("https://datahub.io/core/covid-19")
              }
            >
              DataHub
            </Text>
          </View>
          <View style={{ flexDirection: "row", width: deviceWidth - 25 }}>
            <Text>COVID-19 datasets used</Text>
          </View>
          <View style={{ height: 25 }} />
          <Touchable
            onPress={() => this.props.navigation.navigate("LicenseScreen")}
          >
            <Layout style={styles.listItem}>
              <Text style={styles.categoryText}>Open source licenses</Text>
            </Layout>
          </Touchable>
        </Layout>
      </Layout>
    );
  }
}

export const AboutNavigator = createStackNavigator({
  AboutScreen: {
    screen: AboutScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  LicenseScreen: {
    screen: LicenseScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    textDecorationLine: "underline",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#CCCCCC",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: deviceHeight / 12,
    width: deviceWidth,
  },
  categoryText: {
    marginHorizontal: 12,
  },
});
