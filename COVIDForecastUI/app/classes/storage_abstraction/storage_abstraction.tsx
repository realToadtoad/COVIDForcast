import { AsyncStorage } from "react-native";

export class IHMEStorage {
  static setItem = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem("@IHME:" + key, value);
    } catch (error) {
      console.log(
        "error saving ihme storage " + key + " with value " + value + ": " + error
      );
    }
  };

  static getItem = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem("@IHME:" + key);
      if (value !== null) {
        return value;
      } else {
        console.log("error retrieving ihme storage " + key + "; value is null");
      }
    } catch (error) {
      console.log("error retrieving ihme storage " + key + ": " + error);
    }
  };

  static removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem("@IMHE:" + key);
    } catch (error) {
      console.log("error removing ihme storage " + key + ": " + error);
    }
  };

  static mergeItem = async (key: string, value: string) => {
    try {
      await AsyncStorage.mergeItem("@IMHE:" + key, value);
    } catch (error) {
      console.log(
        "error merging ihme storage " + key + " with value " + value + ": " + error
      );
    }
  };
}