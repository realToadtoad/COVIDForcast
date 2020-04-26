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
import * as Location from "expo-location";
import Papa from "papaparse";
import moment from "moment";

import { currentLocation, currentState } from "../../../App";

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let currentCases: number;
let beforeCases: number;
export { currentCases, beforeCases };

async function fetchCases(date: string) {
  let now = moment(date).subtract(1, "days");
  let dayStr = now.format("MM-DD-YYYY");
  let url =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/" +
    dayStr +
    ".csv";
  await Papa.parse(url, {
    download: true,
    complete: function (res) {
      currentCases = res.data.find(function (obj: any) {
        return obj[0] == currentState; // [0] is the column for the state
      })[5];
      console.log(currentCases);
    },
  });
  let dayStr2 = now.subtract(1, "days").format("MM-DD-YYYY");
  let url2 =
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/" +
    dayStr2 +
    ".csv";
  await Papa.parse(url2, {
    download: true,
    complete: function (res) {
      beforeCases = res.data.find(function (obj: any) {
        return obj[0] == currentState; // [0] is the column for the state
      })[5];
      console.log(beforeCases);
    },
  });
}

export class CurrentCases extends React.Component {
  async componentDidMount() {
    let now = moment();
    await fetchCases(now.format("YYYY-MM-DD"));
    await wait(1000); // if anyone has a more elegant solution, please tell me
    this.forceUpdate();
  }

  render() {
    return (
      <Layout style={styles.container}>
        <Layout style={styles.leftSide}>
          <Text category="h1" style={styles.headerText}>
            {currentCases}
          </Text>
          <Text category="c1" style={styles.lowerText}>
            CONFIRMED CASES
          </Text>
          <Text category="c1" appearance="hint">
            {"as of " + moment().subtract(1, "days").format("MMMM Do, YYYY")}
          </Text>
        </Layout>
        <Layout style={styles.rightSide}>
          <Layout style={styles.rightSideTop}>
            <View style={{ margin: 5 }}>
              <Text style={styles.lowerText}>DAY PRIOR</Text>
              <Text category="h2" style={styles.subheaderText}>
                {beforeCases}
              </Text>
            </View>
          </Layout>
          <Layout style={styles.rightSideBottom}>
            <View style={{ margin: 5 }}>
              <Text style={styles.lowerText}>PREDICTION</Text>
              <Text category="h2" style={styles.subheaderText}>
                ??????
              </Text>
            </View>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 25,
    height: deviceHeight / 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  leftSide: {
    flexDirection: "column",
    height: deviceHeight / 6,
    flex: 1,
    backgroundColor: "#292929",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rightSide: {
    flexDirection: "column",
    height: deviceHeight / 6,
    flex: 1,
  },
  rightSideTop: {
    borderColor: "#AAAAAA",
    borderBottomWidth: 1.5,
    flex: 1,
  },
  rightSideBottom: {
    borderColor: "#AAAAAA",
    borderTopWidth: 1.5,
    flex: 1,
  },
  headerText: {
    fontFamily: "Metropolis-Bold",
  },
  subheaderText: {
    fontFamily: "Metropolis-SemiBold",
  },
  lowerText: {
    letterSpacing: 2,
  },
});
