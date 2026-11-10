import Axios from "axios";

// Shared Axios instance for calls from the browser to this site's API routes.
// Every request sends JSON, and paths like "/api/send" are resolved against NEXT_PUBLIC_API_URL.
const axios = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: { "Content-Type": "application/json" },
});

export default axios;
