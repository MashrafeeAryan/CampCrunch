import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function SoundStart() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/(infoPages)/panda_intro");
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Wait who is that?</Text>

        <View style={styles.imageWrapper}>
          <Image
            source={require("@/assets/images/panda_appear.png")} // your image path
            style={styles.peekImage}
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
  text: {
    fontSize: 22,
    color: "#000",
    textAlign: "center",
  },
  imageWrapper: {
    position: "absolute",
    bottom: -125, // 👈 pushes the image *below* screen for peeking effect
    right: -110,
    width: width * 1.1,
    height: height * 0.55,
    overflow: "visible",
  },
  peekImage: {
    width: "100%",
    height: "100%",
  },
});
