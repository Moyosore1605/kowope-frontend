const BASE_URL = "https://kowope-backend-service.onrender.com"

export const registerDriver = async (payload) => {
	const res = await fetch(
		`${BASE_URL}/api/v1/auth/driver/signup`,
		{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: payload,
            // credentials: "include"
		}
	);

    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
        throw new Error("Invalid server response");
    }

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