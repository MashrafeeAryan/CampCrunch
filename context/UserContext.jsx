// Importing necessary functions from React
// These help us manage data (state) and actions in our app
const { createContext, useState, useEffect } = require("react");

// Import necessary Appwrite setup from a config file
// This includes tools to manage accounts, database access, and unique IDs
import { account, DatabaseID, databases, userCollectionID } from "../appwriteConfig";

// Import a tool to generate a unique ID for each user
import { ID } from "react-native-appwrite";

// Create a box (called Context) where we can store and share user info across the app
export const UserContext = createContext()

// This function gives access to all children components in your app to know who the user is,
// whether they're logged in, and lets them log in, register, or log out
export function UserProvider({children}) {

    // user: stores information about the logged-in user (or null if no one is logged in)
    const [user, setUser] = useState(null)

    // authChecked: tells us whether we've finished checking if the user is already logged in
    const [authChecked, setAuthChecked] = useState(false)

    const [userID, setUserID] = useState("")

    // A function to log the user in using email and password
    async function login(email, password) {
        try {
            // Try to log in with the email and password
            await account.createEmailPasswordSession(email, password)

            // If login is successful, get the user's details from Appwrite
            const response = await account.get()

            // Save the user's info in our state so we can use it in the app
            setUser(response)
            setUserID(response.$id)
        } catch (error) {
            // If there's a problem, show an error
            throw Error(error.message)
        }
    }

    // A function to register a new user
    async function register(email, password, name) {
        // Create a special ID for the new user
        try {
            // Create a new user account in Appwrite
            setUserID(userUniqueID)
            await account.create(userUniqueID, email, password, name)

            // Save additional user info into the database (like name and email)
            await databases.createDocument(
                DatabaseID,          // which database
                userCollectionID,    // which collection
                userUniqueID,        // document ID (same as the user ID)
                {
                    userID: userUniqueID,
                    name: name,
                    email: email, 
                }
            )

            // After registering, log the user in right away
            await login(email, password)
        } catch (error) {
            // If there's a problem, throw an error
            throw Error(error.message)
        }
    }

    // A function to log the user out
    async function logout() {
        // Tell Appwrite to delete the session (log the user out)
        await account.deleteSession('current')

        // Clear the user info from our state
        setUser(null)
    }

    // A function to check if a user is already logged in when the app starts
    async function getInitialUserValue() {
        try {
            // Try to get the current user info from Appwrite
            const response = await account.get()

            // If successful, store it in our state
            setUser(response)
        } catch (error) {
            // If it fails (no one is logged in), clear the user info
            setUser(null)
        } finally {
            // Mark that we've finished checking
            setAuthChecked(true)
        }
    }

    // When the app first loads, check if a user is already logged in
    useEffect(() => {
        getInitialUserValue()
    }, [])

    // This gives all components in the app access to the user data and actions
    return (
        <UserContext.Provider value={{user, login, register, logout, authChecked, userID}}>
            {children}
        </UserContext.Provider>
    )
}
