import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Vibration
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function SoundIntro() {
  const router = useRouter();

  useEffect(() => {
    Vibration.vibrate(500);
    }, []);

  const handlePress = () => {
    router.push("/(infoPages)/pandaAppears"); // navigate on tap
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Ohh.. What is that sound?</Text>
        <Image
          source={require("@/assets/images/sound-intro.png")}
          style={styles.image}
          resizeMode="contain"
        />
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
  image: {
    position: "absolute",
    width: width * 0.4,
    height: width * 0.4,
    bottom: 10,
    right: 10,
  },
});
