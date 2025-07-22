import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PandaIntro() {
  const router = useRouter();

  const handlePress = () => {
    router.push("/(infoPages)/chumpz_intro");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.imageWrapper} onPress={handlePress} activeOpacity={0.8}>
        <Image
          source={require("@/assets/images/panda_explain.png")} // check this path
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
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
