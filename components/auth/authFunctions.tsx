// We are importing tools from Appwrite and our app configuration
import { account, DatabaseID, databases, userCollectionID } from "@/appwriteConfig";

// This helps us make a unique ID (like giving each person their own magic number)
import { ID } from "appwrite";

// Zustand is where we store our user's info, like ID, name, email (like a backpack for user data)
import { useUserAuthStore } from "../zustandStore/AuthStore";
import { useUserHealthStore } from "../zustandStore/UserHealthStore";
// This helps us move to different screens in the app (like changing pages)


// This function helps a new person sign up to our app
export async function handleSignUp(name, email, password, router, setUserID, setUserEmail, setUserName) {
  try {
    // Step 1: Create a new user account with Appwrite using their name, email, and password
    // ID.unique() gives them a random, special ID
    const user = await account.create(ID.unique(), email, password, name);

    // We save the user's ID so we can use it again
    const userID = user.$id;

    // Step 2: Save more info about the user in our app's own database (like writing their info on a notecard)
    await databases.createDocument(
      DatabaseID,          // Which database we are using
      userCollectionID,    // Which collection (group of user records)
      userID,              // Use the same ID we just got for this user
      {
        userID,            // Save their ID
        name,              // Save their name
        email,             // Save their email
      }
    );

    // Step 3: Log the user in right after signing up, so they don't need to do it again
    await account.createEmailPasswordSession(email, password);

    // Step 4: Save the user's data in our app's global state (so we can use it later)
    setUserID(user.$id);      // Save their ID
    setUserEmail(user.email); // Save their email
    setUserName(user.name);   // Save their name

    // Step 5: Move them to the home screen ("/") after successful signup
    router.replace("/(infoPages)/infoHome");
  } catch (error) {
    // If anything goes wrong, print the error and show a friendly message
    console.error("Signup Error:", error);
    throw new Error(error.message || "Signup failed");
  }
}


// This function helps someone log into the app if they already have an account
export async function handleLogin(email, password, router, setUserID, setUserEmail, setUserName) {
  try {
    // Step 1: Log in with email and password
    await account.createEmailPasswordSession(email, password);

    // Step 2: After login, get the user's info (like checking who just came in)
    const response = await account.get();

    // Step 3: Save their data so we know who is using the app
    setUserID(response.$id);       // Save their ID
    setUserEmail(response.email);  // Save their email
    setUserName(response.name);    // Save their name

    // Step 4: Send them to the home screen
    router.replace("/(tabs)");
  } catch (error) {
    // If logging in doesn’t work, show the error
    console.log("Login Error", error);
    throw new Error(error.message || "Login Failed");
  }
}


export async function handleLogout(router){
    try{
        await account.deleteSession("current")
    

        //Reset the store
        useUserHealthStore.getState().reset()
        useUserAuthStore.getState().reset()

        router.replace("/(auth)/LoginScreen")
    } catch(error){
        console.log("Logout Failed", error)
    }
}