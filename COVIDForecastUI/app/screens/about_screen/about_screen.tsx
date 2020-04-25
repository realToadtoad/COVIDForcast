import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
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

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export class AboutScreen extends React.Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Text>
          Prediction model by Justin Yue, Bill Feng, and Eric Wang
          UI by Aiden Sato and Arvind Vivekanadan
          Logo modified from FreePik on www.flaticon.com
          NYTimes and Johns Hopkins COVID-19 datasets used
        </Text>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
