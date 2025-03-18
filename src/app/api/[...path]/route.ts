import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL; // ✅ 환경변수에서 백엔드 URL 불러오기

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest("GET", req, params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest("POST", req, params);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest("PUT", req, params);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest("DELETE", req, params);
}

// ✅ 공통 API 요청 처리 함수
async function handleRequest(
  method: string,
  req: NextRequest,
  params: { path: string[] }
) {
  const apiPath = params.path.join("/");
  const apiUrl = `${BACKEND_URL}/${apiPath}`; // ✅ Next.js API Router에서 백엔드로 변환
  console.log(`🔄 Forwarding ${method} Request to:`, apiUrl);

  try {
    let response;
    if (method === "GET") {
      response = await axios.get(apiUrl, {
        headers: { Authorization: req.headers.get("Authorization") || "" },
      });
    } else {
      const body = await req.json();
      response = await axios({
        method,
        url: apiUrl,
        data: body,
        headers: { Authorization: req.headers.get("Authorization") || "" },
      });
    }

    console.log("✅ API Response:", response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("❌ API Proxy Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "API Proxy Error" },
      { status: error.response?.status || 500 }
    );
  }
}
