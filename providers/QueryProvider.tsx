// "use client" is needed because TanStack Query uses React context and runs in the browser.
"use client";
import { QueryClient, QueryClientProvider, type QueryClientProviderProps } from "@tanstack/react-query";

// One QueryClient for the whole app, created once at module load so it survives re-renders.
const client = new QueryClient();

// Makes TanStack Query available to every component (the contact form uses it to send messages).
// Accepts every QueryClientProvider prop except "client", which is fixed above.
const QueryProvider = ({ children, ...props }: Omit<QueryClientProviderProps, "client">) => {
	return (
		<QueryClientProvider client={client} {...props}>
			{children}
		</QueryClientProvider>
	);
};

export default QueryProvider;
