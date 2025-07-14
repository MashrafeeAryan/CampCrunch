import { Client, Account, Databases } from "react-native-appwrite";


export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6840b89300167e8bd538')
    .setPlatform('com.alex.jiggle')


 
 
export const account = new Account(client)
export const databases = new Databases(client)
 
export const DatabaseID = "68507c4d00369d1cc8a9"
// export const userHealthInfoCollectionID = "68682bbd00146c8e71f8"
// export const userCollectionID = "6865b340003474dd7214"
 
 