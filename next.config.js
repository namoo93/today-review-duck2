/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	reactStrictMode: true,
	images: {
		domains: ['mylittlereviewduck.site'], // 허용할 도메인 목록을 지정
		formats: ["image/avif", "image/webp"],  // 최신이미지 포멧 지원
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**", // 모든 경로 허용
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/proxy/:path*",
				destination: "http://180.224.28.66/:path*",
			},
		];
	},
	async headers() {
		return [
			{
				source: "/proxy/:path*",
				headers: [
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{ key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
					{ key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-CSRF-Token" },
					{ key: "Access-Control-Allow-Credentials", value: "true" },
				],
			},
		];
	},
};

module.exports = nextConfig;