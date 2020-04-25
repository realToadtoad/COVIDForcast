// https://source.unsplash.com/collection/9717149/
import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Linking,
  ScrollView,
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

import { access_key } from "../../../api_key";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

let urlOld = "https://source.unsplash.com/collection/9717149/";
urlOld += "?random_number=" + new Date().getTime();

let url =
  "https://api.unsplash.com/photos/random?client_id=" +
  access_key +
  "&collections=9717149&?content_filter=high"; // 9717149 is the covid collection
let user: string;
let userLink: string;
let imgUrl: string;
const unsplashUrl = "https://unsplash.com/";

async function fetchPhoto() {
  let result = await fetch(url);
  let data = await result.json();
  console.log(data);
  imgUrl = data.urls.regular;
  let firstName = "";
  let lastName = "";
  let space = " ";
  if (data.user.first_name != null) {
    firstName = data.user.first_name;
  }
  if (data.user.last_name != null) {
    lastName = data.user.last_name;
  }
  if (firstName == "" || lastName == "") {
    space = "";
  }
  user = firstName + space + lastName;
  userLink = data.user.links.html;
}

// the wrong way: <Image source={{uri: urlOld}} style={styles.image} />
export class UnsplashWidget extends React.Component {
  async UNSAFE_componentWillMount() {
    await fetchPhoto();
    this.forceUpdate();
  }

  render() {
    return (
      <Layout style={styles.container}>
        <ScrollView>
          <Image source={{ uri: imgUrl }} style={styles.image} />
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              marginTop: 5,
              marginRight: 13.5,
            }}
          >
            <Text>Photo by </Text>
            <Text style={styles.link} onPress={() => Linking.openURL(userLink)}>
              {user}
            </Text>
            <Text> on </Text>
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(unsplashUrl)}
            >
              Unsplash
            </Text>
          </View>
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: deviceWidth + 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13.5
  },
  image: {
    height: deviceWidth - 25,
    width: deviceWidth - 25,
    borderRadius: 10,
  },
  link: {
    textDecorationLine: "underline",
  },
});
