


import { useRouter } from "expo-router";
import React from "react";
import {Dimensions, TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Image, StyleSheet, TouchableOpacity, View } from "react-native";


const { width, height } = Dimensions.get("window");

export default function PandaIntro() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/(infoPages)/3_panda_explain");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView style={styles.container}>

        <View style={styles.imageWrapper}>
          <Image
            source={require("@/assets/images/panda_intro.png")} // your image path
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
     </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    width: "80%",
    height: "60%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});