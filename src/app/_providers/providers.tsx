"use client";

import { RecoilRoot } from "recoil";
import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { postRefreshToken } from "../api/auth";
import { handleApiError } from "../api/axios";

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: false,
        },
        mutations: {
          onError: (error: unknown) => handleApiError(error),
        },
      },
    })
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        {children}

        <ReactQueryDevtools
          initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
        />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
