import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  StatusBar,
} from "react-native";
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
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { AppLoading } from "expo";
import ReverseGeocode, {
  ILocation,
  IGeocode,
} from "bigdatacloud-reverse-geocoding";

import { MainScreen } from "./app/screens/main_screen/main_screen";
import { AboutNavigator as AboutScreen } from "./app/screens/about_screen/about_screen";
import {tfGetReady, tfReady} from "./app/classes/prediction_ml/prediction_ml";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const theme = { ...darkTheme };

function wait(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

let currentLocation: any;
let currentState: string;
export { currentLocation, currentState };

const geocode = new ReverseGeocode();

export default class App extends React.Component {
  fontsLoaded = false;

  async loadFonts() {
    await Font.loadAsync({
      "Metropolis-Regular": require("./assets/fonts/metropolis/Metropolis-Regular.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-Medium": require("./assets/fonts/metropolis/Metropolis-Medium.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-SemiBold": require("./assets/fonts/metropolis/Metropolis-SemiBold.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-Bold": require("./assets/fonts/metropolis/Metropolis-Bold.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-ExtraBold": require("./assets/fonts/metropolis/Metropolis-ExtraBold.ttf"),
    });
    await Font.loadAsync({
      "Metropolis-Black": require("./assets/fonts/metropolis/Metropolis-Black.ttf"),
    });
    await Font.loadAsync({
      Manrope: require("./assets/fonts/ManropeGX.ttf"),
    });
    await Font.loadAsync({
      Inter: require("./assets/fonts/Inter.otf"),
    });
    this.fontsLoaded = true;
  }

  async initializeApp() {
    await this.loadFonts();
    await tfGetReady();
  }

  async getLocationPermissions() {
    let currentStatus = await Permissions.getAsync(Permissions.LOCATION);
    console.log("test");
    if (currentStatus.status != "granted") {
      await Permissions.askAsync(Permissions.LOCATION);
      currentStatus = await Permissions.getAsync(Permissions.LOCATION);
      if (currentStatus.status != "granted") {
        console.log("location permissions not granted");
        alert("you cannot use this app without location permissions. sorry.");
        return false;
      }
    }
    console.log("location permissions granted");
    return true;
  }

  async getCurrentLocation() {
    let temp = await Location.getCurrentPositionAsync({});
    console.log(temp);
    currentLocation = temp;
    let temp2 = await geocode.locate({
      lat: temp.coords.latitude,
      long: temp.coords.longitude,
    });
    let temp3: any;
    temp3 = temp2.localityInfo.administrative;
    if (temp3 == undefined) {
      temp3 = [];
    }
    let temp4 = temp3.filter((obj) => {
      return obj.adminLevel == 4;
    });
    let state = temp4[0].name;
    console.log(state);
    currentState = state;
  }

  async UNSAFE_componentWillMount() {
    await this.initializeApp();
    let checkPerms = this.getLocationPermissions();
    while(typeof checkPerms == undefined) {
      await wait(500);
    }
    if (!checkPerms) {
      BackHandler.exitApp();
    }
    await this.getCurrentLocation();
    this.forceUpdate();
  }

  render() {
    if (!this.fontsLoaded || !tfReady) {
      return <AppLoading />;
    } else {
      return (
        <React.Fragment>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider
            mapping={mapping}
            theme={theme}
            customMapping={customMapping}
          >
            <AppNavigator theme="dark" />
          </ApplicationProvider>
        </React.Fragment>
      );
    }
  }
}

export const StackNavigator = createStackNavigator({
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  AboutScreen: {
    screen: AboutScreen,
    navigationOptions: {
      headerShown: true,
      title: "About",
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


