import { useUserHealthStore } from "@/components/zustandStore/UserHealthStore";

export function calculateCalories() {
    const gender = useUserHealthStore((s)=>s.gender)
    const weight_lbs = useUserHealthStore((s)=>s.weight_lbs)
    const weight_KG = useUserHealthStore((s)=>s.weight_KG)
    const ageYears = useUserHealthStore((s)=>s.ageYears)
    const heightInches = useUserHealthStore((s)=>s.heightInches)
    const goals = useUserHealthStore((s)=> s.goals)
    const bmr = useUserHealthStore((s)=> s.bmr)
    const maintenance = useUserHealthStore((s)=> s.maintenance)
    const setMaintenance = useUserHealthStore((s)=> s.setMaintenance)
    const setBMR = useUserHealthStore((s)=> s.setBMR)


    //📐 Imperial Mifflin-St Jeor Formula:
    if (gender == 'male'){
        const bmr = 66 + 6.23 * weight_lbs + 12.7 * heightInches - 6.8 * ageYears
    } else{
        const bmr = 655 + 4.35 * weight_lbs + 4.7 * heightInches - 4.7 * ageYears;

    }
    
    const activityMultiplier = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9,
    }[activityLevel];
 
    setMaintenance(bmr * activityMultiplier)
    
    //Goals should be numbers +0.5lbs or -1lbs
    return maintenance + ((goals * 3500)/7)
}