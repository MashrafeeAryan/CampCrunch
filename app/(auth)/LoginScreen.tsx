import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Image } from 'react-native';
import { useRouter } from "expo-router";
import { handleLogin } from "@/components/auth/authFunctions";
import { useUserAuthStore } from "@/components/zustandStore/AuthStore";


export default function WelcomeScreen() {
  //Zustand
  const setUserID = useUserAuthStore((s) => s.setUserID)
  const setUserEmail = useUserAuthStore((s) => s.setUserEmail)
  const setUserName = useUserAuthStore((s)=>s.setUserName)
  const setCampCrunchUserName = useUserAuthStore((s)=>s.setCampCrunchUserName)

  const router = useRouter()

  // useState hook to toggle the password view
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // error message
  const [error, setError] = useState(null)




  // handles login
	const loginFunction = async () => {
		setError(null)
		try {
			await handleLogin(email, password, router, setUserID, setUserEmail, setUserName, setCampCrunchUserName)
		} catch (error) {
			setError(error.message)
		}
	};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View className="flex-1 bg-gray-50 justify-center items-center px-6">
 <TouchableOpacity onPress={() => {router.replace('/(auth)/SignUpScreen')}}>
        <Text className="text-sm text-black underline">
          New to the app? Sign Up now!
        </Text>
      </TouchableOpacity>
      {/* Greeting on top */}
      <Text className="text-5xl font-extrabold text-gray-900 mb-2">
        Welcome!
      </Text>
      <Text className="text-center text-gray-600 mb-[35px]  text-base font-semibold">
        Start achieving your body goals with{`\n`}one simple click!
      </Text>

      {/* Email or Username Field */}
      <View className="w-full bg-white p-3 rounded-xl border border-gray-300 mb-4 flex-row items-center">
        <TextInput
          placeholder="Email or Username"
          className="flex-1 text-black"
          placeholderTextColor="#9CA3AF"
          onChangeText={setEmail}
        />
      </View>

      {/* Password Field */}
      <View className="w-full bg-white p-3 rounded-xl border border-gray-300 mb-2 flex-row items-center">
        <TextInput
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          className="flex-1 text-black"
          placeholderTextColor="#9CA3AF"
          onChangeText={setPassword}
        />

        {/* password view toggle */}
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Feather
            name={passwordVisible ? "eye-off" : "eye"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity className="self-start mb-2" onPress={() => console.log('Forgot Password')}>
        <Text className="text-sm text-gray-500">Forgot your Password?</Text>
      </TouchableOpacity>

      {/* Error message */}
      {error && (<View className="py-2">
        <Text className=" text-red-600 p-2 bg-red-200 border border-red-600 rounded-md">
          {error}
        </Text>
      </View>)}
      
      {/* Sign In Button */}
      <TouchableOpacity className="w-full bg-gray-800 p-4 rounded-xl mb-4" onPress={loginFunction}>
        <Text className="text-center text-white font-bold text-lg">Sign In</Text>
      </TouchableOpacity>

      {/* Seperator Or Line  --------or-------- */}
      <View className="flex-row items-center mb-4 w-full">
        <View className="flex-1 h-[5px] bg-gray-400" />
        <Text className="mx-2 text-gray-400">Or</Text>
        <View className="flex-1 h-[5px] bg-gray-400" />
      </View>

      {/* Log in with microsoft account */}
      <TouchableOpacity className="w-full bg-white p-4 rounded-xl border border-gray-300 mb-2 flex-row items-center justify-center" onPress={() => console.log('Logging in with Microsoft Account...')}>
        <Image
          source={require('../../assets/images/microsoft.png')}
          style={{ width: 24, height: 24, marginRight: 8 }}
          resizeMode="contain"
        />
        <Text className="text-gray-800">Log in with School Account</Text>
      </TouchableOpacity>

      {/* Log in with google account */}
      <TouchableOpacity className="w-full bg-white p-4 rounded-xl border border-gray-300 mb-6 flex-row items-center justify-center" onPress={() => console.log('Logging in with Google Account...')}>
        <Image
          source={require('../../assets/images/google.png')}
          style={{ width: 24, height: 24, marginRight: 8 }}
          resizeMode="contain"
        />
        <Text className="text-gray-800">Log in with Google Account</Text>
      </TouchableOpacity>

      {/* SignUp Page */}
     
    </View>
    </TouchableWithoutFeedback>
  );
}