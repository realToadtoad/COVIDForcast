import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  createAppContainer,
  SafeAreaView,
  ThemeContext,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { default as appTheme } from "./custom-theme.json";
import { mapping } from "@eva-design/eva";
import { light as lightTheme } from "@eva-design/eva";
import { default as darkTheme } from "./dark-mapping.json";
import { default as customMapping } from "./custom-mapping.json";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as Font from "expo-font";

import { MainScreen } from "./app/screens/main_screen/main_screen";

const theme = { ...darkTheme };

function wait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class App extends React.Component {
  async loadFonts() {
    await Font.loadAsync({
      "Metropolis-Regular": require("./assets/fonts/metropolis/Metropolis-Regular.ttf")
    });
    await Font.loadAsync({
      "Metropolis-Medium": require("./assets/fonts/metropolis/Metropolis-Medium.ttf")
    });
    await Font.loadAsync({
      "Metropolis-SemiBold": require("./assets/fonts/metropolis/Metropolis-SemiBold.ttf")
    });
    await Font.loadAsync({
      "Metropolis-Bold": require("./assets/fonts/metropolis/Metropolis-Bold.ttf")
    });
    await Font.loadAsync({
      "Metropolis-ExtraBold": require("./assets/fonts/metropolis/Metropolis-ExtraBold.ttf")
    });
    await Font.loadAsync({
      "Metropolis-Black": require("./assets/fonts/metropolis/Metropolis-Black.ttf")
    });
    await Font.loadAsync({
      Manrope: require("./assets/fonts/ManropeGX.ttf")
    });
    await Font.loadAsync({
      Inter: require("./assets/fonts/Inter.otf")
    });
  }

  async initializeApp() {
    await this.loadFonts();
  }

  async componentDidMount() {
    await this.loadFonts();
    await wait(1000);
    this.forceUpdate();
  }

render() {
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={mapping}
        theme={theme}
        customMapping={customMapping}
      >
        <AppNavigator />
      </ApplicationProvider>
    </React.Fragment>
  );
}
}

export const StackNavigator = createStackNavigator({
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

export const AppNavigator = createAppContainer(StackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
