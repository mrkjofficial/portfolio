"use client";
import { QueryClient, QueryClientProvider, type QueryClientProviderProps } from "@tanstack/react-query";

const client = new QueryClient();

const QueryProvider = ({ children, ...props }: Omit<QueryClientProviderProps, "client">) => {
	return (
		<QueryClientProvider client={client} {...props}>
			{children}
		</QueryClientProvider>
	);
};

export default QueryProvider;
