"use client";

import { RecoilRoot } from "recoil";
import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { handleApiError } from "../api/axios";
import AppInitializer from "./AppInitializer";
import { postRefreshToken } from "../api/auth";

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: 1,
        },
        mutations: {
          onError: async (error, _variables, _context) => {
            if ((error as any)?.response?.status === 401) {
              try {
                await postRefreshToken();
              } catch (refreshError) {
                console.error("🔒 자동 로그인 갱신 실패:", refreshError);
                // 필요 시 자동 로그아웃 처리
              }
            }

            handleApiError(error);
          },
        },
      },
    })
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <AppInitializer />
        {children}

        <ReactQueryDevtools
          initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
        />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
