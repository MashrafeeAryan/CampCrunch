import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { DatabaseID, databases, userHealthInfoCollectionID } from '@/appwriteConfig'
import { useUserHealthStore } from '../zustandStore/UserHealthStore'
import { useUserAuthStore } from '../zustandStore/AuthStore'

const updateHealthInfo = async () => {

    //Get this from zustand:
    const userID = useUserAuthStore((s) => s.userID)
    const weight_KG = useUserHealthStore((s) => s.weight_KG)
    const weight_lbs = useUserHealthStore((s) => s.weight_lbs)
    const heightInches = useUserHealthStore((s) => s.heightInches)
    const heightCM = useUserHealthStore((s) => s.heightCM)
    const ageYears = useUserHealthStore((s) => s.ageYears)
    const gender = useUserHealthStore((s) => s.gender)
    const activityLevel = useUserHealthStore((s) => s.activityLevel)

    await databases.createDocument(
            DatabaseID,
            userHealthInfoCollectionID,
            userID, 
            {
                userID: userID,
                weightlbs: weight_lbs,
                weightKG: weight_KG,
                heightInch: heightInches,
                age: ageYears, 
                gender: gender, 
                activityLevel: activityLevel,
                heightCM: heightCM
            }


        )
}


export default updateHealthInfo