import { useRouter } from "expo-router"
import { useUser } from "../../hooks/useUser"
import { useEffect } from "react"

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
