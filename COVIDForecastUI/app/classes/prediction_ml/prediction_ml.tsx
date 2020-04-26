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
import * as tf from '@tensorflow/tfjs';
import 'tfjs-react-native-expo-fix';

import {default as dataJSON} from "./data.json";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let tfReady = false;

export async function tfGetReady() {
  await tf.ready();
  tfReady = true;
}

export {tfReady};

async function getData() {
  const data = dataJSON;

  return data;
}

function convertToTensor(data: any) {
  tf.util.shuffle(data);
}

function createModel() {
  const model = tf.sequential();

  model.add(tf.layers.dense({inputShape: [7], units: 64, useBias: true}));
  //model.add(tf.layers.dropout());
  model.add(tf.layers.dense({units: 64, useBias: true}));
  model.add(tf.layers.dense({units: 64, useBias: true}));
  model.add(tf.layers.dense({units: 1, useBias: true}));

  return model;
}

async function trainModel(model: any, inputs: any, labels: any) {
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse', 'mae'],
  });

  const batchSize = 7;
  const epochs = 1000;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs, 
    shuffle: true
  });
}

async function run() {
  const data = await getData();
}

//const model = createModel();
//trainModel(model, data, data);


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
