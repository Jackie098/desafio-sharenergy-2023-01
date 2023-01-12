import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 10 * 1000,
      staleTime: 1 * 1000 * 60, // in minutes
      retry: 3,
    },
  },
});
