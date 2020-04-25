import React from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
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
import moment from "moment";
import { currentCases } from "../current_cases/current_cases";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;
/*
let boxIsGrey = false;

function setBoxColor() {
  if (boxIsGrey) {
    boxIsGrey = false;
    return "#292929";
  } else {
    boxIsGrey = true;
    return "#1c1c1c";
  }
}
//*/
const sampleData = [
  {
    index: 0,
    date: "2020-04-25",
    prediction: 40000,
  },
  {
    index: 1,
    date: "2020-04-26",
    prediction: 40320,
  },
  {
    index: 2,
    date: "2020-04-27",
    prediction: 42949,
  },
  {
    index: 3,
    date: "2020-04-28",
    prediction: 47284,
  },
  {
    index: 4,
    date: "2020-04-29",
    prediction: 51392,
  },
  {
    index: 5,
    date: "2020-04-30",
    prediction: 56395,
  },
  {
    index: 6,
    date: "2020-05-01",
    prediction: 99999,
  },
];

function getStyle(item: any) {
  if (item.index % 2 == 0) {
    return {
      backgroundColor: "#1c1c1c",
      borderWidth: 3,
      borderColor: "#191919",
    };
  } else {
    return { backgroundColor: "#292929", elevation: 8 };
  }
}

function getCurrentStatusEmoji(item: any) {
  let prediction = item.prediction;
  let yesterday;
  if (item.index - 1 == -1) {
    yesterday = currentCases;
  } else {
    yesterday = sampleData[item.index - 1].prediction;
  }
  if (prediction - yesterday < 0) {
    return "🤔";
  } else if (prediction - yesterday == 0) {
    return "😃";
  } else if (prediction - yesterday <= 100) {
    return "🙂";
  } else if (prediction - yesterday <= 1000) {
    return "😐";
  } else if (prediction - yesterday <= 9000) {
    return "😟";
  } else {
    return "😫"; // I T ' S   O V E R   9 0 0 0 ! ! ! !
  }
}

export class SevenDayForecast extends React.Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Text
          category="h6"
          style={{
            marginLeft: 12.5,
            fontFamily: "Metropolis-Regular",
            letterSpacing: 2.5,
          }}
        >
          7 DAY FORECAST
        </Text>
        <ScrollView
          horizontal={true}
          style={{ width: deviceWidth, height: deviceHeight / 6 }}
        >
          {sampleData.map((item) => (
            <Layout style={[styles.forecastBox, getStyle(item)]}>
              <Text
                category="label"
                style={{ fontFamily: "Metropolis-Medium" }}
              >
                {moment(item.date).format("ddd").toUpperCase()}
              </Text>
              <Text category="h3">{getCurrentStatusEmoji(item)}</Text>
              <Text style={{ fontFamily: "Metropolis-Bold" }}>
                {item.prediction}
              </Text>
            </Layout>
          ))}
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight / 4,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  forecastBox: {
    width: deviceWidth / 5,
    height: deviceHeight / 6,
    marginVertical: 10,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
  },
});
