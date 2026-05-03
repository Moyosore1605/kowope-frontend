import { useQuery } from "@tanstack/react-query";
import { fetchDriverProfile } from "../services/auth";

export const useAuth = () => {
	const query = useQuery({
		queryKey: ["authUser"],
		queryFn: fetchDriverProfile,
		retry: false,
	});

	return {
		user: query.data,
		isLoading: query.isLoading,
		isAuthenticated: !!query.data && !query.isError,
	};
};