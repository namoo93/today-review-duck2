import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const interval = setInterval(() => {
    const message = JSON.stringify({
      type: "test",
      content: "테스트 알림",
      createdAt: new Date().toISOString(),
    });
    res.write(`data: ${message}\n\n`);
  }, 3000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
}
