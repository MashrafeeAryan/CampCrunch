import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useEffect, useState } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { handleSignUp } from "@/components/auth/authFunctions";
import { useUserAuthStore } from "@/components/zustandStore/AuthStore";

export default function  SignUpScreen() {
  //Zustand
  const setUserID = useUserAuthStore((s) => s.setUserID)
  const setUserEmail = useUserAuthStore((s) => s.setUserEmail)
  const setUserName = useUserAuthStore((s)=>s.setUserName)

  
  // Input Fields
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  // Eye toggle
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [retypeVisible, setRetypeVisible] = useState(false);

  // terms and conditons toggle
  const [agreed, setAgreed] = useState(false);


  // Birthdate Selection
  const [birthDate, setBirthDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const router = useRouter();

  const [error, setError] = useState()


  // to remove the error message as soon as the user corrects the error being thrown
  useEffect(() => {
  switch (error) {
    case "Full name is required.":
      if (username.trim()) setError(null);
      break;
    case "Email is required.":
      if (email.trim()) setError(null);
      break;
    case "Password is required.":
      if (password.trim()) setError(null);
      break;
    case "Please retype your password.":
      if (rePassword.trim()) setError(null);
      break;
    case "Passwords do not match.":
      if (password === rePassword) setError(null);
      break;
    case "Please select your birth date.":
      if (birthDate) setError(null);
      break;
    case "You must agree to the Terms and Conditions.":
      if (agreed) setError(null);
      break;
    default:
      // Handle password strength error
      if (
        error?.startsWith("Password must") &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{8,}$/.test(
          password
        )
      ) {
        setError(null);
      }
      break;
  }
  }, [ error, username, email, password, rePassword, birthDate, agreed,]);



  const signUpFunction = async () => {
    setError(null);

    // Validate required fields
    if (!username.trim()) return setError("Full name is required.");
    if (!email.trim()) return setError("Email is required.");
    if (!password.trim()) return setError("Password is required.");
    if (!rePassword.trim()) return setError("Please retype your password.");
    if (password !== rePassword) return setError("Passwords do not match.");
    if (!birthDate) return setError("Please select your birth date.");
    if (!agreed) return setError("You must agree to the Terms and Conditions.");

    // Password strength check
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and a special character."
      );
    }

    try {
    await handleSignUp(username,email, password, router, setUserID, setUserEmail, setUserName);
    } catch (error) {
    setError(error.message || "Something went wrong. Please try again.");
    }
  };

  // for password strength check live feedback
  const getPasswordCriteria = (password) => ({
  length: password.length >= 8,
  hasUppercase: /[A-Z]/.test(password),
  hasLowercase: /[a-z]/.test(password),
  hasNumber: /\d/.test(password),
  hasSpecialChar: /[@$!%*?#&^_-]/.test(password),
  });


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View className="flex-1 bg-gray-50 justify-center items-center px-6">
      <Text className="text-4xl font-extrabold text-gray-900 mb-[45px]">
        Sign Up
      </Text>

      {/* Full Name Input */}
      <View className="w-full bg-white p-3 rounded-xl border border-gray-300 mb-4 flex-row items-center">
        <TextInput
          placeholder="Your Full Name"
          className="flex-1 text-black"
          placeholderTextColor="#9CA3AF"
          onChangeText={setName}
        />
      </View>

      {/* Email Input */}
      <View className="w-full bg-white p-3 rounded-xl border border-gray-300 mb-4 flex-row items-center">
        <TextInput
          placeholder="Your E-mail"
          className="flex-1 text-black"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
      </View>

      {/* Create Password Field */}
      <View className="w-full bg-white p-3 rounded-xl border border-gray-300 mb-4 flex-row items-center">
        <TextInput
          placeholder="Create your Password"
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


      {/* Live Password Strength Feedback */}
      {password.length > 0 && (
        <View className="w-full mb-3">
          <Text className="text-xs text-gray-500">Password must include:</Text>
          {Object.entries(getPasswordCriteria(password)).map(([key, passed]) => {
            const labelMap = {
              length: "• At least 8 characters",
              hasUppercase: "• One uppercase letter",
              hasLowercase: "• One lowercase letter",
              hasNumber: "• One number",
              hasSpecialChar: "• One special character (@$!%*?#&^_-)",
            };
            return (
              <Text
                key={key}
                className={`text-xs ${passed ? "text-green-600" : "text-gray-500"}`}
              >
                {labelMap[key]}
              </Text>
            );
          })}
        </View>
      )}


      {/* Retype Password Field */}
      <View className="w-full bg-white p-3 rounded-xl border border-gray-300 mb-2 flex-row items-center">
        <TextInput
          placeholder="Re-type your Password"
          secureTextEntry={!retypeVisible}
          className="flex-1 text-black"
          placeholderTextColor="#9CA3AF"
          onChangeText={setRePassword}
        />

        {/* password view toggle */}
        <TouchableOpacity onPress={() => setRetypeVisible(!retypeVisible)}>
          <Feather
            name={retypeVisible ? "eye-off" : "eye"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
      </View>

      {/* Birth Date Input*/}
      <View className="w-full flex-row mb-4 relative">

        {/* Birth Date Selection */}
        <View className="flex-1 relative">
          <TouchableOpacity
            className="bg-white p-4 rounded-xl border border-gray-300 flex-row justify-between items-center"
            onPress={() => setShowDatePicker(true)}
          >
            <Text
              className={`text-base ${
                birthDate ? "text-black" : "text-gray-400"
              } truncate`}
            >
              {birthDate ? moment(birthDate).format("MMM DD, YYYY") : "Birth"}
            </Text>
            <FontAwesome name="calendar" size={16} color="#6B7280" />
          </TouchableOpacity>
					
					{/* Pop up for Date Selection */}
          {showDatePicker && (
            <DateTimePicker
              value={birthDate || new Date(2000, 0, 1)}
              mode="date"
              display="default"
              maximumDate={new Date()} // prevent future dates
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setBirthDate(selectedDate);
                }
              }}
            />
          )}
        </View>
      </View>

      {/* Terms and Conditions Toggle */}
      <View className="flex-row items-center mb-6 self-start">
        <CheckBox
          value={agreed}
          onValueChange={setAgreed}
          color={agreed ? "#111827" : undefined}
        />
        <Text className="text-xs text-gray-500 ml-2">
          I agree to the Terms and Conditions
        </Text>
      </View>
      
      {/* Error message */}
      {error && (<View className="pb-2 w-[100%]">
        <Text className=" text-red-600 p-2 bg-red-200 border border-red-600 rounded-md">
          {error}
        </Text>
      </View>)}


      {/* Create Account Button */}
      <TouchableOpacity
        className="w-full bg-gray-800 p-4 rounded-xl mb-4"
        onPress={signUpFunction}
      >
        <Text className="text-center text-white font-bold text-lg">
          Create your Account
        </Text>
      </TouchableOpacity>

      {/* Sign In Page Redirect */}
      <TouchableOpacity>
        <Text
          className="text-sm text-black underline"
          onPress={() => router.replace("/(auth)/LoginScreen")}
        >
          Already have an account? Sign In now
        </Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}
