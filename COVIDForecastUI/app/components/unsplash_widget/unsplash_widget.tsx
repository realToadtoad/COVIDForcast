// https://source.unsplash.com/collection/9717149/
import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
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

let url = "https://source.unsplash.com/collection/9717149/";
url += '?random_number=' + new Date().getTime();

export class UnsplashWidget extends React.Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Image source={{uri: url}} style={styles.image} />
        <Text style={{alignSelf: "flex-end", marginTop: 5, marginRight: 13.5}}>
          test
        </Text>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: deviceWidth+20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: deviceWidth-25,
    width: deviceWidth-25,
    borderRadius: 10
  }
});
