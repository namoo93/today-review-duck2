"use client";

import { RecoilRoot, useSetRecoilState } from "recoil";
import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { handleApiError } from "../_api/axios";
import AppInitializer from "./AppInitializer";
import { postRefreshToken } from "../_api/postRefreshToken";
import { userIdxState } from "../_recoil";
import { forceLogout } from "../_utils/forceLogout";

export default function Providers({ children }: { children: ReactNode }) {
  const setUserIdx = useSetRecoilState(userIdxState);
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
                // 초기화
                forceLogout();
                setUserIdx(null);
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
