import { account, DatabaseID, databases, userCollectionID } from "@/appwriteConfig";
import { ID } from "appwrite"; // Make sure you're using the correct SDK
import { useUserAuthStore } from "../zustandStore/AuthStore";

const userID = useUserAuthStore((s) => s.userID);
const setUserID = useUserAuthStore((s) => s.setUserID);

export async function handleSignUP(email, password, name) {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    const userID = user.$id;

    await databases.createDocument(
      DatabaseID,
      userCollectionID,
      userID,
      {
        userID,
        name,
        email,
      }
    );

    await account.createEmailPasswordSession(email, password);

    setUserID(userID);
  } catch (error) {
    console.error("Signup Error:", error); // helpful during development
    throw new Error(error.message || "Signup failed");
  }
}
