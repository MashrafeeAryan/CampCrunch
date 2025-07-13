export function calculateCalories() {
    //📐 Imperial Mifflin-St Jeor Formula:
    if (gender == 'male'){
        const bmr = 66 + 6.23 * weight_lbs + 12.7 * heightInches - 6.8 * age
    } else{
        const bmr = 655 + 4.35 * weightLbs + 4.7 * heightInches - 4.7 * age;

    }
    const activityMultiplier = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9,
    }[activityLevel];
 
    const maintenance = bmr * activityMultiplier
    //Goals should be numbers +0.5lbs or -1lbs
    return maintenance + ((goal * 3500)/7)
}