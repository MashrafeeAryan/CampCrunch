import { useRouter } from "expo-router"
import { useUser } from "../../hooks/useUser"
import { useEffect } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"



const GuestOnly = ({ children }) => {
	const { user, authChecked } = useUser()
	const router = useRouter()

	useEffect(() => {
		if (authChecked && user !== null) {
			router.replace('/')
		}
	}, [user, authChecked])

	if (!authChecked || user) {

		return (
			<LoadScreen/>
		);
	}

	return children
}

export default GuestOnly

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0A0A23', // dark background for a modern vibe
	},
	text: {
		marginTop: 16,
		fontSize: 16,
		color: '#E0E0E0',
		letterSpacing: 1,
	},
});

