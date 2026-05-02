const BASE_URL = "https://kowope-backend-service.onrender.com"

export const registerDriver = async (payload) => {
	const res = await fetch(
		`${BASE_URL}/api/v1/auth/driver/signup`,
		{
            method: "POST",
            body: payload,
		}
	);

	const data = await res.json();

	if (!res.ok) {
		// Attach backend response to error
		const error = new Error(data.message || "Registration failed");
		error.response = { data };
		throw error;
	}

	return data;
};

export const loginDriver = async (payload) => {
    const res = await fetch(
        `${BASE_URL}/api/v1/auth/driver/login`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message || "Login failed");
        error.response = { data };
        throw error;
    }

    return data;
};

export const verifyOtp = async (payload) => {
    const res = await fetch(
        `${BASE_URL}/api/v1/auth/driver/verify-otp`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
    );

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message || "OTP verification failed");
        error.response = { data };
        throw error;
    }

    return data;
};

export const resendOtp = async (payload) => {
    const response = await fetch(
        `${BASE_URL}/api/v1/auth/driver/resend-otp`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.message || "Failed to resend OTP");
        error.response = { data };
        throw error;
    }

    return data;
};

const fetchDriverProfile = async () => {
	const res = await fetch(
		`${BASE_URL}/api/v1/auth/driver/me`,
		{
			method: "GET",
			credentials: "include",
		}
	);

	if (!res.ok) {
		throw new Error("Failed to fetch profile");
	}

	return res.json();
};