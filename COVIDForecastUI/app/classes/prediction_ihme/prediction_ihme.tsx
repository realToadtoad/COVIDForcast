import React from "react";
import { StyleSheet, View, Dimensions, Linking } from "react-native";
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
import * as FileSystem from 'expo-file-system';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';

import { IHMEStorage } from "../storage_abstraction/storage_abstraction";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

async function checkCache() {
  const cacheDate = await IHMEStorage.getItem("cacheDate");
  return cacheDate;
}

async function fetchCache(cacheDate: any) {
  let cacheCSV;
  if(typeof cacheDate != undefined || typeof cacheDate != null) {
    cacheCSV = await IHMEStorage.getItem(cacheDate);
  }
}

async function checkForLatestExt() {
  let now = moment();
  let str = now.format("YYYY-MM-DD");
  let url = "https://ihmecovid19storage.blob.core.windows.net/archive/" + str + "/ihme-covid19.zip";
  while (!Linking.canOpenURL(url)) {
    now = moment().subtract(1, "days");
    str = now.format("YYYY-MM-DD");
    url = "https://ihmecovid19storage.blob.core.windows.net/archive/" + str + "/ihme-covid19.zip";
  }
  return str;
}

async function downloadSaveExt(date: any) {
  let url = "https://ihmecovid19storage.blob.core.windows.net/archive/" + date + "/ihme-covid19.zip";
  let res = await FileSystem.downloadAsync(url, FileSystem.cacheDirectory + "covid-" + date + ".zip");

}

/*
export class Name extends React.Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Text>
          Hello, world!
        </Text>
      </Layout>
    );
  }
}
//*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
